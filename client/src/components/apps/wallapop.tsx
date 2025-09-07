import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Search, MessageCircle, Home, User, Camera, Eye, Send } from "lucide-react";
import { validateImageFile, compressImage } from "@/lib/fileUtils";
import type { WallapopUser, WallapopProduct } from "@shared/schema";

interface WallapopProps {
  onBack: () => void;
}

export default function Wallapop({ onBack }: WallapopProps) {
  const [currentUser, setCurrentUser] = useState<WallapopUser | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/wallapop/products"],
    enabled: !!currentUser,
  });

  const { data: chats } = useQuery({
    queryKey: ["/api/wallapop/chats", currentUser?.id],
    enabled: !!currentUser && showChat,
  });

  const { data: messages } = useQuery({
    queryKey: ["/api/wallapop/chats", currentChatId, "messages"],
    enabled: !!currentChatId,
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/wallapop/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Cuenta creada exitosamente!" });
      queryClient.invalidateQueries({ queryKey: ["/api/wallapop/products"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: any) => {
      const response = await apiRequest("POST", "/api/wallapop/login", loginData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Bienvenido de vuelta!" });
      queryClient.invalidateQueries({ queryKey: ["/api/wallapop/products"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const response = await apiRequest("POST", "/api/wallapop/products", productData);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "¡Producto publicado exitosamente!" });
      queryClient.invalidateQueries({ queryKey: ["/api/wallapop/products"] });
      setSelectedImages([]);
    },
  });

  const createChatMutation = useMutation({
    mutationFn: async (chatData: any) => {
      const response = await apiRequest("POST", "/api/wallapop/chats", chatData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentChatId(data.id);
      setShowChat(true);
      toast({ title: "Chat iniciado" });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await apiRequest("POST", `/api/wallapop/chats/${currentChatId}/messages`, messageData);
      return response.json();
    },
    onSuccess: () => {
      setMessageInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/wallapop/chats", currentChatId, "messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/wallapop/chats", currentUser?.id] });
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImages(true);
    const newImages: string[] = [];
    
    try {
      for (let i = 0; i < Math.min(files.length, 6 - selectedImages.length); i++) {
        const file = files[i];
        validateImageFile(file);
        const compressedImage = await compressImage(file);
        newImages.push(compressedImage);
      }
      
      setSelectedImages(prev => [...prev, ...newImages]);
      toast({ title: `${newImages.length} imagen(es) añadida(s) exitosamente` });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploadingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    registerMutation.mutate({
      name: formData.get("name"),
      email: formData.get("email"),
      location: formData.get("location"),
      registrationCode: formData.get("registrationCode"),
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      email: formData.get("email"),
    });
  };

  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedImages.length === 0) {
      toast({ title: "Error", description: "Debes subir al menos una imagen", variant: "destructive" });
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const priceInCents = Math.round(parseFloat(formData.get("price") as string) * 100);
    
    createProductMutation.mutate({
      sellerId: currentUser!.id,
      title: formData.get("title"),
      description: formData.get("description"),
      price: priceInCents,
      category: formData.get("category") || "General",
      condition: formData.get("condition") || "Usado",
      location: formData.get("location"),
      images: selectedImages,
    });
  };

  const handleProductClick = async (product: any) => {
    try {
      const response = await apiRequest("GET", `/api/wallapop/products/${product.id}`);
      const productDetails = await response.json();
      setSelectedProduct(productDetails);
    } catch (error) {
      toast({ title: "Error", description: "No se pudo cargar el producto", variant: "destructive" });
    }
  };

  const handleContactSeller = () => {
    if (!selectedProduct || !currentUser) return;
    
    createChatMutation.mutate({
      productId: selectedProduct.id,
      buyerId: currentUser.id,
      sellerId: selectedProduct.sellerId
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentUser) return;
    
    sendMessageMutation.mutate({
      senderId: currentUser.id,
      content: messageInput,
    });
  };

  if (!currentUser) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <ArrowLeft 
            data-testid="button-back"
            className="cursor-pointer" 
            onClick={onBack} 
          />
          <h2 className="text-lg font-semibold text-green-600">Wallapop</h2>
          <Search className="cursor-pointer" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-sm">
            <div className="text-center mb-6">
              <i className="fas fa-shopping-bag text-4xl text-green-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {showRegister ? "Compra y vende" : "Iniciar Sesión"}
              </h3>
              <p className="text-gray-600 text-sm">
                {showRegister 
                  ? "Regístrate para publicar productos"
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
                  name="name" 
                  placeholder="Nombre" 
                  required 
                  data-testid="input-name"
                />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  data-testid="input-email"
                />
                <Input 
                  name="location" 
                  placeholder="Ubicación (Ciudad, País)" 
                  required 
                  data-testid="input-location"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? "Registrando..." : "Registrarse"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  data-testid="input-login-email"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700" 
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
                className="text-green-600 hover:underline"
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

  // Product Detail Modal
  if (selectedProduct) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <ArrowLeft 
            className="cursor-pointer" 
            onClick={() => setSelectedProduct(null)}
          />
          <h2 className="text-lg font-semibold">Detalles del producto</h2>
          <div></div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="aspect-square bg-gray-100">
            <img 
              src={selectedProduct.images?.[0] || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
              alt={selectedProduct.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-green-600">
                {(selectedProduct.price / 100).toFixed(2)}€
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                {selectedProduct.views || 0} vistas
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{selectedProduct.title}</h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>{selectedProduct.condition}</span>
              <span>•</span>
              <span>{selectedProduct.category}</span>
              {selectedProduct.location && (
                <>
                  <span>•</span>
                  <span>{selectedProduct.location}</span>
                </>
              )}
            </div>
            
            {selectedProduct.description && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Descripción</h4>
                <p className="text-gray-700">{selectedProduct.description}</p>
              </div>
            )}
            
            <div className="border-t pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">
                    {selectedProduct.sellerName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{selectedProduct.sellerName}</div>
                  <div className="text-sm text-gray-500">Vendedor</div>
                </div>
              </div>
              
              {selectedProduct.sellerId !== currentUser.id && (
                <Button 
                  onClick={handleContactSeller}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={createChatMutation.isPending}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {createChatMutation.isPending ? "Contactando..." : "Contactar"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat View
  if (showChat && currentChatId) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <ArrowLeft 
            className="cursor-pointer" 
            onClick={() => { setShowChat(false); setCurrentChatId(null); }}
          />
          <h2 className="text-lg font-semibold">Chat</h2>
          <div></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages && Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message: any) => (
              <div 
                key={message.id}
                className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.senderId === currentUser.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.senderId === currentUser.id ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.createdAt).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              Inicia la conversación
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!messageInput.trim() || sendMessageMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Chat List View
  if (showChat) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <ArrowLeft 
            className="cursor-pointer" 
            onClick={() => setShowChat(false)}
          />
          <h2 className="text-lg font-semibold">Mis chats</h2>
          <div></div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats && Array.isArray(chats) && chats.length > 0 ? (
            <div className="space-y-1">
              {chats.map((chat: any) => (
                <div 
                  key={chat.id}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => setCurrentChatId(chat.id)}
                >
                  <div className="flex gap-3">
                    <img 
                      src={chat.productImage || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
                      alt={chat.productTitle}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{chat.otherUserName}</div>
                      <div className="text-xs text-gray-600 mb-1">{chat.productTitle}</div>
                      {chat.lastMessage && (
                        <div className="text-sm text-gray-500">{chat.lastMessage}</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(chat.lastMessageAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageCircle className="h-12 w-12 mb-4" />
              <p>No tienes chats aún</p>
              <p className="text-sm">Contacta con vendedores para iniciar conversaciones</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <ArrowLeft 
          data-testid="button-back-marketplace"
          className="cursor-pointer" 
          onClick={onBack} 
        />
        <h2 className="text-lg font-semibold text-green-600">Wallapop</h2>
        <Search className="cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : products && Array.isArray(products) && products.length > 0 ? (
          <div className="p-4 space-y-3">
            {products.map((product: any) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg p-3 shadow-sm flex gap-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product)}
                data-testid={`product-${product.id}`}
              >
                <img 
                  src={product.images?.[0] || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
                  alt={product.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1" data-testid={`text-product-title-${product.id}`}>
                    {product.title}
                  </h4>
                  <div className="text-lg font-bold text-green-600 mb-1" data-testid={`text-product-price-${product.id}`}>
                    {(product.price / 100).toFixed(2)}€
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {product.location || product.sellerLocation}
                  </div>
                  {product.description && (
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <i className="fas fa-box-open text-4xl mb-4"></i>
            <p>No hay productos disponibles</p>
            <p className="text-sm">¡Sé el primero en vender!</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
            data-testid="button-add-product"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Publicar Producto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <Input 
              name="title" 
              placeholder="Título del producto" 
              required 
              data-testid="input-product-title"
            />
            <Input 
              name="price" 
              type="number" 
              step="0.01" 
              placeholder="Precio (€)" 
              required 
              data-testid="input-product-price"
            />
            <Textarea 
              name="description" 
              placeholder="Descripción del producto" 
              data-testid="input-product-description"
            />
            <Input 
              name="category" 
              placeholder="Categoría" 
              data-testid="input-product-category"
            />
            <Input 
              name="condition" 
              placeholder="Estado (Nuevo, Usado, etc.)" 
              data-testid="input-product-condition"
            />
            <Input 
              name="location" 
              placeholder="Ubicación" 
              data-testid="input-product-location"
            />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImages || selectedImages.length >= 6}
                  data-testid="button-upload-images"
                >
                  {uploadingImages ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                  Subir imágenes ({selectedImages.length}/6)
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-16 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={createProductMutation.isPending || selectedImages.length === 0}
              data-testid="button-submit-product"
            >
              {createProductMutation.isPending ? "Publicando..." : "Publicar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-white border-t border-gray-200 flex items-center justify-around py-3">
        <div className="flex flex-col items-center text-green-600">
          <Home className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Plus className="w-5 h-5" />
        </div>
        <div 
          className="flex flex-col items-center text-gray-400 cursor-pointer"
          onClick={() => setShowChat(true)}
        >
          <MessageCircle className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <User className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}