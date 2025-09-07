import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Phone, Users, MessageCircle, MoreVertical } from "lucide-react";
import type { WhatsappUser, WhatsappChat, WhatsappMessage } from "@shared/schema";

interface WhatsAppProps {
  onBack: () => void;
}

export default function WhatsApp({ onBack }: WhatsAppProps) {
  const [currentUser, setCurrentUser] = useState<WhatsappUser | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const [selectedChat, setSelectedChat] = useState<WhatsappUser | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const { toast } = useToast();

  const { data: users } = useQuery({
    queryKey: ["/api/whatsapp/users"],
    enabled: !!currentUser,
  });

  const { data: chats } = useQuery({
    queryKey: ["/api/whatsapp/chats", currentUser?.phone],
    enabled: !!currentUser,
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ["/api/whatsapp/messages", currentChatId],
    enabled: !!currentChatId,
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/whatsapp/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Número verificado exitosamente!" });
      queryClient.invalidateQueries({ queryKey: ["/api/whatsapp/users"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: any) => {
      const response = await apiRequest("POST", "/api/whatsapp/login", loginData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({ title: "¡Bienvenido de vuelta!" });
      queryClient.invalidateQueries({ queryKey: ["/api/whatsapp/users"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    registerMutation.mutate({
      name: formData.get("name"),
      phone: formData.get("phone"),
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      phone: formData.get("phone"),
    });
  };

  const createChatMutation = useMutation({
    mutationFn: async (participants: string[]) => {
      const response = await apiRequest("POST", "/api/whatsapp/chats/get-or-create", { participants });
      return response.json();
    },
    onSuccess: (chat) => {
      setCurrentChatId(chat.id);
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await apiRequest("POST", "/api/whatsapp/messages", messageData);
      return response.json();
    },
    onSuccess: () => {
      setMessageInput("");
      refetchMessages();
      queryClient.invalidateQueries({ queryKey: ["/api/whatsapp/chats"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: "No se pudo enviar el mensaje", variant: "destructive" });
    },
  });

  const handleSelectChat = async (user: WhatsappUser) => {
    if (currentUser) {
      setSelectedChat(user);
      createChatMutation.mutate([currentUser.phone, user.phone]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && currentChatId && currentUser) {
      sendMessageMutation.mutate({
        chatId: currentChatId,
        senderPhone: currentUser.phone,
        content: messageInput,
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-green-700 text-white flex items-center justify-between p-4">
          <ArrowLeft 
            data-testid="button-back"
            className="cursor-pointer text-white" 
            onClick={onBack} 
          />
          <h2 className="text-lg font-semibold">WhatsApp</h2>
          <MoreVertical className="cursor-pointer" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-sm">
            <div className="text-center mb-6">
              <i className="fab fa-whatsapp text-4xl text-green-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {showRegister ? "Verificar número" : "Iniciar Sesión"}
              </h3>
              <p className="text-gray-600 text-sm">
                {showRegister 
                  ? "Ingresa tu número de teléfono para verificar tu cuenta"
                  : "Ingresa tu número registrado"
                }
              </p>
            </div>

            {showRegister ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <Input 
                  name="name" 
                  placeholder="Nombre" 
                  required 
                  data-testid="input-name"
                />
                <Input 
                  name="phone" 
                  type="tel" 
                  placeholder="+34 123 456 789" 
                  required 
                  data-testid="input-phone"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  disabled={registerMutation.isPending}
                  data-testid="button-register"
                >
                  {registerMutation.isPending ? "Verificando..." : "Verificar"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                  name="phone" 
                  type="tel" 
                  placeholder="+34 123 456 789" 
                  required 
                  data-testid="input-login-phone"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Verificando..." : "Verificar"}
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

  if (selectedChat) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-green-700 text-white flex items-center gap-3 p-4">
          <ArrowLeft 
            data-testid="button-back-to-chats"
            className="cursor-pointer" 
            onClick={() => setSelectedChat(null)} 
          />
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
            {selectedChat.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="font-semibold" data-testid={`text-chat-name-${selectedChat.id}`}>
              {selectedChat.name}
            </div>
            <div className="text-xs opacity-80">
              en línea
            </div>
          </div>
          <MoreVertical className="cursor-pointer" />
        </div>

        <div 
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="chat-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cpath d="M0 0h100v100H0z" fill="%23e5ddd5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23chat-bg)"/%3E%3C/svg%3E")',
            backgroundColor: '#e5ddd5'
          }}
        >
          {messages && messages.length > 0 ? (
            messages.map((message: any) => {
              const isFromCurrentUser = message.senderPhone === currentUser?.phone;
              return (
                <div 
                  key={message.id} 
                  className={`message p-3 max-w-xs rounded-lg shadow-sm ${
                    isFromCurrentUser 
                      ? 'bg-green-100 ml-auto' 
                      : 'bg-white mr-auto'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    isFromCurrentUser ? 'text-right' : 'text-left'
                  }`}>
                    {new Date(message.sentAt).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <div className="text-xs text-gray-500 bg-white/70 rounded-full px-3 py-1 inline-block">
                Chat con {selectedChat.name} - {selectedChat.phone}
              </div>
              <div className="text-sm text-gray-600 mt-4">
                No hay mensajes aún. ¡Envía el primero!
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4 flex gap-3 items-center">
          <Input 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-full"
            data-testid="input-message"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full bg-green-600 hover:bg-green-700"
            disabled={sendMessageMutation.isPending || !messageInput.trim()}
            data-testid="button-send-message"
          >
            {sendMessageMutation.isPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-green-700 text-white flex items-center justify-between p-4">
        <ArrowLeft 
          data-testid="button-back-chats"
          className="cursor-pointer text-white" 
          onClick={onBack} 
        />
        <h2 className="text-lg font-semibold">WhatsApp</h2>
        <MoreVertical className="cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {users && users.filter((user: WhatsappUser) => user.id !== currentUser.id).length > 0 ? (
          <div>
            {users
              .filter((user: WhatsappUser) => user.id !== currentUser.id)
              .map((user: WhatsappUser) => (
                <div 
                  key={user.id}
                  className="flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectChat(user)}
                  data-testid={`chat-${user.id}`}
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold" data-testid={`text-user-name-${user.id}`}>
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500" data-testid={`text-user-phone-${user.id}`}>
                      {user.phone}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    12:30
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <i className="fab fa-whatsapp text-4xl mb-4"></i>
            <p>No hay otros usuarios registrados aún</p>
            <p className="text-sm">Invita a tus amigos a unirse</p>
          </div>
        )}
      </div>

      <div className="bg-green-700 flex items-center justify-around py-3">
        <div className="flex flex-col items-center text-white">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center text-green-300">
          <Users className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center text-green-300">
          <Phone className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
