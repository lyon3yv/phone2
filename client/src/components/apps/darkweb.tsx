import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Hash, Users, Shield, Eye, Send, Plus, Lock } from "lucide-react";
import type { DarkwebUser, DarkwebChannel } from "@shared/schema";

interface DarkwebProps {
  onBack: () => void;
}

export default function Darkweb({ onBack }: DarkwebProps) {
  const [currentUser, setCurrentUser] = useState<DarkwebUser | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [messageInput, setMessageInput] = useState("");
  const { toast } = useToast();

  const { data: channels } = useQuery({
    queryKey: ["/api/darkweb/channels"],
    enabled: !!currentUser,
  });

  const { data: messages } = useQuery({
    queryKey: ["/api/darkweb/channels", selectedChannel?.id, "messages"],
    enabled: !!selectedChannel,
    refetchInterval: 2000, // Refresh every 2 seconds for real-time feel
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/darkweb/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "Acceso concedido", description: "Conectado a la red anónima" });
      queryClient.invalidateQueries({ queryKey: ["/api/darkweb/channels"] });
    },
    onError: (error: any) => {
      toast({ title: "Acceso denegado", description: error.message, variant: "destructive" });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: any) => {
      const response = await apiRequest("POST", "/api/darkweb/login", loginData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "Reconectado", description: `Bienvenido de vuelta, ${data.user.handle}` });
      queryClient.invalidateQueries({ queryKey: ["/api/darkweb/channels"] });
    },
    onError: (error: any) => {
      toast({ title: "Acceso denegado", description: error.message, variant: "destructive" });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await apiRequest("POST", `/api/darkweb/channels/${selectedChannel.id}/messages`, messageData);
      return response.json();
    },
    onSuccess: () => {
      setMessageInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/darkweb/channels", selectedChannel?.id, "messages"] });
    },
  });

  const createChannelMutation = useMutation({
    mutationFn: async (channelData: any) => {
      const response = await apiRequest("POST", "/api/darkweb/channels", channelData);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Canal creado", description: "El nuevo canal está listo" });
      queryClient.invalidateQueries({ queryKey: ["/api/darkweb/channels"] });
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    registerMutation.mutate({
      handle: formData.get("handle"),
      passwordHash: formData.get("password"), // Will be hashed on server
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      handle: formData.get("handle"),
      password: formData.get("password"),
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentUser) return;
    
    sendMessageMutation.mutate({
      senderId: currentUser.id,
      content: messageInput,
      messageType: "text",
      isEncrypted: false,
    });
  };

  const handleCreateChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createChannelMutation.mutate({
      name: formData.get("name"),
      description: formData.get("description"),
      isPrivate: formData.get("isPrivate") === "on",
      accessCode: formData.get("accessCode") || null,
      createdBy: currentUser!.id,
    });
  };

  // Simulate updating online status
  useEffect(() => {
    if (currentUser) {
      const interval = setInterval(() => {
        apiRequest("POST", `/api/darkweb/users/${currentUser.id}/status`, { isOnline: true });
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="h-full flex flex-col bg-black text-green-400">
        <div className="bg-gray-900 border-b border-green-500/30 flex items-center justify-between p-4">
          <ArrowLeft 
            data-testid="button-back"
            className="cursor-pointer hover:text-green-300" 
            onClick={onBack} 
          />
          <h2 className="text-lg font-mono font-bold text-green-400">
            DARK WEB
          </h2>
          <Shield className="text-green-400" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black">
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 shadow-2xl w-full max-w-sm">
            <div className="text-center mb-6">
              <Shield className="mx-auto text-green-400 mb-4" size={48} />
              <h3 className="text-xl font-mono font-bold mb-2 text-green-400">
                {showRegister ? "CREAR ACCESO" : "AUTENTICACIÓN"}
              </h3>
              <p className="text-green-300/70 text-sm font-mono">
                {showRegister 
                  ? "Regístrate para acceder a la red anónima"
                  : "Ingresa tus credenciales de acceso"
                }
              </p>
            </div>

            {showRegister ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <Input 
                  name="handle" 
                  placeholder="Handle anónimo (ej: Shadow_User)" 
                  required 
                  className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
                  data-testid="input-handle"
                />
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="Contraseña segura" 
                  required 
                  className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
                  data-testid="input-password"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-mono font-bold" 
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? "CONECTANDO..." : "CREAR ACCESO"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                  name="handle" 
                  placeholder="Handle anónimo" 
                  required 
                  className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
                  data-testid="input-login-handle"
                />
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="Contraseña" 
                  required 
                  className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
                  data-testid="input-login-password"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-mono font-bold" 
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "AUTENTICANDO..." : "CONECTAR"}
                </Button>
              </form>
            )}

            <p className="text-center mt-4 text-sm font-mono text-green-300/70">
              {showRegister ? "¿Ya tienes acceso?" : "¿Necesitas acceso?"}{" "}
              <button
                type="button"
                className="text-green-400 hover:text-green-300 underline"
                onClick={() => setShowRegister(!showRegister)}
                data-testid="button-toggle-auth"
              >
                {showRegister ? "Conectar" : "Crear acceso"}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Channel View
  if (selectedChannel) {
    return (
      <div className="h-full flex flex-col bg-black text-green-400">
        <div className="bg-gray-900 border-b border-green-500/30 flex items-center justify-between p-4">
          <ArrowLeft 
            className="cursor-pointer hover:text-green-300" 
            onClick={() => setSelectedChannel(null)}
          />
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <span className="font-mono font-bold">{selectedChannel.name}</span>
            {selectedChannel.isPrivate && <Lock className="h-4 w-4 text-red-400" />}
          </div>
          <Users className="h-4 w-4" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
          {messages && Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message: any) => (
              <div key={message.id} className="border-l-2 border-green-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-green-400">
                    {message.senderHandle}
                  </span>
                  <span className="text-green-600 text-xs font-mono">
                    {new Date(message.sentAt).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                  {message.isEncrypted && (
                    <Shield className="h-3 w-3 text-yellow-400" />
                  )}
                </div>
                <div className="text-green-300 font-mono text-sm">
                  {message.content}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-green-600 py-8 font-mono">
              Canal vacío. Sé el primero en enviar un mensaje.
            </div>
          )}
        </div>

        <div className="border-t border-green-500/30 p-4 bg-gray-900">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Escribe un mensaje anónimo..."
              className="flex-1 bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
              data-testid="input-message"
            />
            <Button 
              type="submit" 
              disabled={!messageInput.trim() || sendMessageMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-black font-mono"
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black text-green-400">
      <div className="bg-gray-900 border-b border-green-500/30 flex items-center justify-between p-4">
        <ArrowLeft 
          data-testid="button-back-main"
          className="cursor-pointer hover:text-green-300" 
          onClick={onBack} 
        />
        <div className="text-center">
          <h2 className="text-lg font-mono font-bold text-green-400">DARK WEB</h2>
          <span className="text-xs font-mono text-green-600">
            {currentUser.handle} • REP: {currentUser.reputation}
          </span>
        </div>
        <Shield className="text-green-400" />
      </div>

      <div className="flex-1 overflow-y-auto bg-black">
        <div className="p-4">
          <div className="mb-4 text-center">
            <p className="text-green-300 font-mono text-sm mb-2">
              CANALES DISPONIBLES
            </p>
            <div className="h-px bg-green-500/30"></div>
          </div>

          {channels && Array.isArray(channels) && channels.length > 0 ? (
            <div className="space-y-3">
              {channels.map((channel: any) => (
                <div 
                  key={channel.id} 
                  className="bg-gray-900 border border-green-500/30 rounded p-3 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => setSelectedChannel(channel)}
                  data-testid={`channel-${channel.id}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-green-400" />
                    <span className="font-mono font-bold text-green-400">
                      {channel.name}
                    </span>
                    {channel.isPrivate && <Lock className="h-4 w-4 text-red-400" />}
                  </div>
                  {channel.description && (
                    <p className="text-green-300/70 text-sm font-mono">
                      {channel.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-green-600 py-8 font-mono">
              No hay canales disponibles
            </div>
          )}
        </div>
      </div>

      {/* Create Channel Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-black shadow-lg"
            data-testid="button-create-channel"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border-green-500/30 text-green-400">
          <DialogHeader>
            <DialogTitle className="font-mono text-green-400">CREAR CANAL</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateChannel} className="space-y-4">
            <Input 
              name="name" 
              placeholder="Nombre del canal" 
              required 
              className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
              data-testid="input-channel-name"
            />
            <Textarea 
              name="description" 
              placeholder="Descripción del canal" 
              className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
              data-testid="input-channel-description"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPrivate"
                id="isPrivate"
                className="rounded border-green-500/50"
              />
              <label htmlFor="isPrivate" className="text-sm font-mono text-green-300">
                Canal privado
              </label>
            </div>
            <Input 
              name="accessCode" 
              placeholder="Código de acceso (opcional)" 
              className="bg-black border-green-500/50 text-green-400 placeholder:text-green-600 font-mono"
              data-testid="input-access-code"
            />
            <Button 
              type="submit" 
              disabled={createChannelMutation.isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-black font-mono font-bold"
              data-testid="button-submit-channel"
            >
              {createChannelMutation.isPending ? "CREANDO..." : "CREAR CANAL"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-gray-900 border-t border-green-500/30 p-2 text-center">
        <p className="text-green-600 text-xs font-mono">
          CONEXIÓN SEGURA • TOR ACTIVO • IP OCULTA
        </p>
      </div>
    </div>
  );
}