import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Heart, MessageCircle, Send, Camera, Video, UserPlus, UserMinus } from "lucide-react";
import { validateImageFile, validateVideoFile, compressImage, convertFileToBase64 } from "@/lib/fileUtils";
import type { InstagramUser, InstagramPost } from "@shared/schema";

interface InstagramProps {
  onBack: () => void;
}

export default function Instagram({ onBack }: InstagramProps) {
  const [currentUser, setCurrentUser] = useState<InstagramUser | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [commentInput, setCommentInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/instagram/posts"],
    enabled: !!currentUser,
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/instagram/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Cuenta creada exitosamente!" });
      queryClient.invalidateQueries({ queryKey: ["/api/instagram/posts"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: any) => {
      const response = await apiRequest("POST", "/api/instagram/login", loginData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Bienvenido de vuelta!" });
      queryClient.invalidateQueries({ queryKey: ["/api/instagram/posts"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const response = await apiRequest("POST", "/api/instagram/posts", postData);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "¡Post creado exitosamente!" });
      queryClient.invalidateQueries({ queryKey: ["/api/instagram/posts"] });
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentData: any) => {
      const response = await apiRequest("POST", `/api/instagram/posts/${commentData.postId}/comments`, commentData);
      return response.json();
    },
    onSuccess: () => {
      setCommentInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/instagram/posts"] });
      if (selectedPost) {
        queryClient.invalidateQueries({ queryKey: ["/api/instagram/posts", selectedPost.id, "comments"] });
      }
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["/api/instagram/posts", selectedPost?.id, "comments"],
    enabled: !!selectedPost,
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiRequest("POST", `/api/instagram/posts/${postId}/like`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instagram/posts"] });
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    registerMutation.mutate({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      fullName: formData.get("fullName"),
      bio: formData.get("bio"),
      registrationCode: formData.get("registrationCode"),
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      username: formData.get("username"),
      password: formData.get("password"),
    });
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingMedia(true);
    const newMedia: string[] = [];
    
    try {
      for (let i = 0; i < Math.min(files.length, 10 - selectedMedia.length); i++) {
        const file = files[i];
        
        if (file.type.startsWith('image/')) {
          validateImageFile(file);
          const compressedImage = await compressImage(file);
          newMedia.push(compressedImage);
          setMediaType('image');
        } else if (file.type.startsWith('video/')) {
          validateVideoFile(file);
          const videoDataUrl = await convertFileToBase64(file);
          newMedia.push(videoDataUrl);
          setMediaType('video');
        }
      }
      
      setSelectedMedia(prev => [...prev, ...newMedia]);
      toast({ title: `${newMedia.length} archivo(s) añadido(s) exitosamente` });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploadingMedia(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedMedia.length === 0) {
      toast({ title: "Error", description: "Debes subir al menos una imagen o video", variant: "destructive" });
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    createPostMutation.mutate({
      userId: currentUser!.id,
      caption: formData.get("caption"),
      mediaUrls: selectedMedia,
      mediaType,
      location: formData.get("location") || null,
    });
    
    setSelectedMedia([]);
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() && selectedPost && currentUser) {
      createCommentMutation.mutate({
        postId: selectedPost.id,
        userId: currentUser.id,
        content: commentInput,
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="h-full flex flex-col">
        <div className="instagram-header bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <ArrowLeft 
            data-testid="button-back"
            className="cursor-pointer" 
            onClick={onBack} 
          />
          <h2 className="text-lg font-semibold">Instagram</h2>
          <div />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-sm">
            <div className="text-center mb-6">
              <i className="fab fa-instagram text-4xl text-pink-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {showRegister ? "Únete a Instagram" : "Iniciar Sesión"}
              </h3>
              <p className="text-gray-600 text-sm">
                {showRegister 
                  ? "Regístrate para ver fotos y videos de tus amigos"
                  : "Inicia sesión en tu cuenta"
                }
              </p>
            </div>

            {showRegister ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <Input 
                  name="registrationCode" 
                  placeholder="Código de registro (proporcionado por admin)" 
                  required 
                  data-testid="input-registration-code"
                  className="border-red-300 focus:border-red-500"
                />
                <Input 
                  name="username" 
                  placeholder="Nombre de usuario" 
                  required 
                  data-testid="input-username"
                />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  data-testid="input-email"
                />
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="Contraseña" 
                  required 
                  data-testid="input-password"
                />
                <Input 
                  name="fullName" 
                  placeholder="Nombre completo" 
                  data-testid="input-fullname"
                />
                <Textarea 
                  name="bio" 
                  placeholder="Biografía" 
                  data-testid="input-bio"
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? "Registrando..." : "Registrarse"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                  name="username" 
                  placeholder="Usuario o email" 
                  required 
                  data-testid="input-login-username"
                />
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="Contraseña" 
                  required 
                  data-testid="input-login-password"
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Ingresando..." : "Iniciar sesión"}
                </Button>
              </form>
            )}

            <p className="text-center mt-4 text-sm">
              {showRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowRegister(!showRegister)}
                data-testid="button-toggle-auth"
              >
                {showRegister ? "Iniciar sesión" : "Registrarse"}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="instagram-header bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <ArrowLeft 
          data-testid="button-back-feed"
          className="cursor-pointer" 
          onClick={onBack} 
        />
        <h2 className="text-lg font-semibold">Instagram</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Plus className="cursor-pointer" data-testid="button-create-post" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva Publicación</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <Textarea 
                name="caption" 
                placeholder="Escribe una descripción..." 
                data-testid="input-post-caption"
              />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingMedia || selectedMedia.length >= 10}
                    data-testid="button-upload-media"
                  >
                    {uploadingMedia ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        <Video className="h-4 w-4 mr-2" />
                      </>
                    )}
                    Subir archivos ({selectedMedia.length}/10)
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </div>
                
                {selectedMedia.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {selectedMedia.map((media, index) => (
                      <div key={index} className="relative">
                        {media.startsWith('data:image/') ? (
                          <img 
                            src={media} 
                            alt={`Media ${index + 1}`}
                            className="w-full h-20 object-cover rounded"
                          />
                        ) : (
                          <video 
                            src={media}
                            className="w-full h-20 object-cover rounded"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Input 
                name="location" 
                placeholder="Añadir ubicación" 
                data-testid="input-post-location"
              />
              <Button 
                type="submit" 
                disabled={createPostMutation.isPending}
                data-testid="button-submit-post"
              >
                {createPostMutation.isPending ? "Publicando..." : "Publicar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-white border border-gray-200">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                    {post.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{post.username}</div>
                    <div className="text-xs text-gray-500">Zona Cero RP</div>
                  </div>
                </div>
                <div className="w-full h-80 bg-gray-100 overflow-hidden">
                  {post.mediaUrls && post.mediaUrls.length > 0 && (
                    post.mediaType === 'video' ? (
                      <video 
                        src={post.mediaUrls[0]} 
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img 
                        src={post.mediaUrls[0]} 
                        alt="Post" 
                        className="w-full h-full object-cover"
                      />
                    )
                  )}
                  
                  {post.mediaUrls && post.mediaUrls.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      1/{post.mediaUrls.length}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex gap-4 mb-3">
                    <Heart 
                      className="cursor-pointer hover:text-red-500" 
                      onClick={() => likeMutation.mutate(post.id)}
                      data-testid={`button-like-${post.id}`}
                    />
                    <MessageCircle 
                      className="cursor-pointer hover:text-blue-500" 
                      onClick={() => setSelectedPost(post)}
                      data-testid={`button-comments-${post.id}`}
                    />
                    <Send className="cursor-pointer hover:text-green-500" />
                  </div>
                  <div className="font-semibold text-sm mb-2" data-testid={`text-likes-${post.id}`}>
                    {post.likes} Me gusta
                  </div>
                  {post.commentsCount > 0 && (
                    <div className="text-sm text-gray-500 mb-2 cursor-pointer" onClick={() => setSelectedPost(post)}>
                      Ver los {post.commentsCount} comentarios
                    </div>
                  )}
                  {post.caption && (
                    <div className="text-sm mb-2">
                      <span className="font-semibold">{post.username}</span>{" "}
                      {post.caption}
                    </div>
                  )}
                  {post.location && (
                    <div className="text-xs text-gray-500 mb-2">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {post.location}
                    </div>
                  )}
                  <div className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <i className="fas fa-camera text-4xl mb-4"></i>
            <p>No hay posts aún</p>
            <p className="text-sm">¡Sé el primero en publicar!</p>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 flex items-center justify-around py-3">
        <div className="flex flex-col items-center text-blue-600">
          <i className="fas fa-home text-lg"></i>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <i className="fas fa-search text-lg"></i>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <i className="fas fa-plus-square text-lg"></i>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <i className="fas fa-heart text-lg"></i>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <i className="fas fa-user text-lg"></i>
        </div>
      </div>
      
      {/* Comments Modal */}
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Comentarios</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Post preview */}
              <div className="border-b pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {selectedPost.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold">{selectedPost.username}</span>
                </div>
                {selectedPost.caption && (
                  <div className="text-sm text-gray-700">
                    {selectedPost.caption}
                  </div>
                )}
              </div>
              
              {/* Comments list */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments && comments.length > 0 ? (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {comment.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold">{comment.username}</span>{" "}
                          {comment.content}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('es-ES')}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Aún no hay comentarios. ¡Sé el primero en comentar!
                  </div>
                )}
              </div>
              
              {/* Add comment form */}
              <form onSubmit={handleCreateComment} className="border-t pt-4">
                <div className="flex gap-2">
                  <Input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="flex-1"
                    data-testid="input-comment"
                  />
                  <Button 
                    type="submit" 
                    disabled={!commentInput.trim() || createCommentMutation.isPending}
                    data-testid="button-submit-comment"
                  >
                    {createCommentMutation.isPending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
