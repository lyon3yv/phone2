import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, X, Heart, Settings, Upload, Camera } from "lucide-react";
import { validateImageFile, compressImage } from "@/lib/fileUtils";
import type { TinderUser } from "@shared/schema";

interface TinderProps {
  onBack: () => void;
}

export default function Tinder({ onBack }: TinderProps) {
  const [currentUser, setCurrentUser] = useState<TinderUser | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: potentialMatches, isLoading } = useQuery({
    queryKey: ["/api/tinder/potential-matches", currentUser?.id],
    enabled: !!currentUser,
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/tinder/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Perfil creado exitosamente!" });
      queryClient.invalidateQueries({ queryKey: ["/api/tinder/potential-matches"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: any) => {
      const response = await apiRequest("POST", "/api/tinder/login", loginData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Bienvenido de vuelta!" });
      queryClient.invalidateQueries({ queryKey: ["/api/tinder/potential-matches"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const swipeMutation = useMutation({
    mutationFn: async ({ userId, targetUserId, isLike }: { userId: string; targetUserId: string; isLike: boolean }) => {
      const response = await apiRequest("POST", "/api/tinder/swipe", {
        user1Id: userId,
        user2Id: targetUserId,
        isMatch: isLike,
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      if (variables.isLike) {
        toast({ title: "¡Es un Match! 💕" });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/tinder/potential-matches"] });
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingPhotos(true);
    const newPhotos: string[] = [];
    
    try {
      for (let i = 0; i < Math.min(files.length, 6 - selectedPhotos.length); i++) {
        const file = files[i];
        validateImageFile(file);
        const compressedPhoto = await compressImage(file);
        newPhotos.push(compressedPhoto);
      }
      
      setSelectedPhotos(prev => [...prev, ...newPhotos]);
      toast({ title: `${newPhotos.length} foto(s) añadida(s) exitosamente` });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploadingPhotos(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedPhotos.length === 0) {
      toast({ title: "Error", description: "Debes subir al menos una foto", variant: "destructive" });
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    registerMutation.mutate({
      name: formData.get("name"),
      age: parseInt(formData.get("age") as string),
      bio: formData.get("bio"),
      photos: selectedPhotos,
      interests: (formData.get("interests") as string)?.split(',').map(i => i.trim()).filter(Boolean) || [],
      location: formData.get("location"),
      registrationCode: formData.get("registrationCode"),
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      name: formData.get("name"),
    });
  };

  const handleSwipe = (targetUserId: string, isLike: boolean) => {
    if (currentUser) {
      swipeMutation.mutate({
        userId: currentUser.id,
        targetUserId,
        isLike,
      });
    }
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
          <h2 className="text-lg font-semibold text-pink-500">Tinder</h2>
          <Settings className="cursor-pointer" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-sm">
            <div className="text-center mb-6">
              <i className="fas fa-fire text-4xl text-pink-500 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {showRegister ? "Conoce gente nueva" : "Iniciar Sesión"}
              </h3>
              <p className="text-gray-600 text-sm">
                {showRegister 
                  ? "Regístrate para comenzar a hacer match"
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
                  name="age" 
                  type="number" 
                  placeholder="Edad" 
                  min="18" 
                  max="99" 
                  required 
                  data-testid="input-age"
                />
                <Textarea 
                  name="bio" 
                  placeholder="Cuéntanos sobre ti..." 
                  data-testid="input-bio"
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingPhotos || selectedPhotos.length >= 6}
                      data-testid="button-upload-photos"
                    >
                      {uploadingPhotos ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                      Subir fotos ({selectedPhotos.length}/6)
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                  
                  {selectedPhotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedPhotos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={photo} 
                            alt={`Foto ${index + 1}`}
                            className="w-full h-16 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
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
                  name="interests" 
                  placeholder="Intereses (separados por comas)" 
                  data-testid="input-interests"
                />
                <Input 
                  name="location" 
                  placeholder="Ubicación" 
                  data-testid="input-location"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-pink-500 hover:bg-pink-600" 
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? "Creando perfil..." : "Crear perfil"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                  name="name" 
                  placeholder="Nombre" 
                  required 
                  data-testid="input-login-name"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-pink-500 hover:bg-pink-600" 
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Ingresando..." : "Ingresar"}
                </Button>
              </form>
            )}

            <p className="text-center mt-4 text-sm">
              {showRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button
                type="button"
                className="text-pink-600 hover:underline"
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

  const currentMatch = potentialMatches && potentialMatches.length > 0 ? potentialMatches[0] : null;

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <ArrowLeft 
          data-testid="button-back-cards"
          className="cursor-pointer" 
          onClick={onBack} 
        />
        <h2 className="text-lg font-semibold text-pink-500">Tinder</h2>
        <Settings className="cursor-pointer" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        ) : currentMatch ? (
          <div className="tinder-card bg-white rounded-xl max-w-sm w-full h-96 shadow-lg overflow-hidden relative">
            <img 
              src={currentMatch.photos[0] || "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400"}
              alt={currentMatch.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{currentMatch.name}, {currentMatch.age}</h3>
              <p className="text-gray-600 text-sm mt-1">{currentMatch.bio}</p>
              {currentMatch.location && (
                <p className="text-gray-500 text-xs mt-2">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {currentMatch.location}
                </p>
              )}
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-5">
              <button
                onClick={() => handleSwipe(currentMatch.id, false)}
                className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                disabled={swipeMutation.isPending}
                data-testid="button-pass"
              >
                <X size={24} />
              </button>
              <button
                onClick={() => handleSwipe(currentMatch.id, true)}
                className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                disabled={swipeMutation.isPending}
                data-testid="button-like"
              >
                <Heart size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <i className="fas fa-heart text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No hay más perfiles por ahora</p>
            <p className="text-gray-500 text-sm">¡Vuelve más tarde!</p>
          </div>
        )}
      </div>
    </div>
  );
}
