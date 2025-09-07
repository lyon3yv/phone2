import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Key, Plus, Copy, Trash2, Users, Calendar } from "lucide-react";

interface AdminProps {
  onBack: () => void;
}

interface Admin {
  id: string;
  username: string;
  isOneTimeUse: boolean;
  isUsed: boolean;
  createdAt: string;
}

interface RegistrationCode {
  id: string;
  code: string;
  isUsed: boolean;
  usedBy?: string;
  appType: string;
  createdAt: string;
  usedAt?: string;
  expiresAt?: string;
}

export default function Admin({ onBack }: AdminProps) {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [codeForm, setCodeForm] = useState({ 
    appType: "", 
    count: 1, 
    expiresAt: "" 
  });
  const { toast } = useToast();

  const { data: codesResponse, refetch: refetchCodes } = useQuery({
    queryKey: ["/api/admin/codes", currentAdmin?.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/admin/codes?adminId=${currentAdmin!.id}`);
      return response.json();
    },
    enabled: !!currentAdmin,
  });

  const codes = codesResponse?.codes || [];

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/admin/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentAdmin(data.admin);
      toast({ title: "Acceso concedido", description: "Bienvenido al panel de administración" });
    },
    onError: (error: any) => {
      toast({ title: "Acceso denegado", description: error.message, variant: "destructive" });
    },
  });

  const generateCodesMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/codes/generate", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({ 
        title: "Códigos generados", 
        description: `Se generaron ${data.codes.length} código(s) exitosamente` 
      });
      refetchCodes();
      setCodeForm({ appType: "", count: 1, expiresAt: "" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleGenerateCodes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeForm.appType) {
      toast({ title: "Error", description: "Selecciona una aplicación", variant: "destructive" });
      return;
    }

    const data: any = {
      appType: codeForm.appType,
      adminId: currentAdmin!.id,
      count: codeForm.count,
    };

    if (codeForm.expiresAt) {
      data.expiresAt = new Date(codeForm.expiresAt).toISOString();
    }

    generateCodesMutation.mutate(data);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado", description: "Código copiado al portapapeles" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAppDisplayName = (appType: string) => {
    const names: Record<string, string> = {
      instagram: "Instagram",
      tinder: "Tinder",
      wallapop: "Wallapop",
      whatsapp: "WhatsApp",
      darkweb: "Dark Web"
    };
    return names[appType] || appType;
  };

  const getAppColor = (appType: string) => {
    const colors: Record<string, string> = {
      instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
      tinder: "bg-gradient-to-r from-pink-500 to-red-500",
      wallapop: "bg-gradient-to-r from-green-500 to-teal-500",
      whatsapp: "bg-gradient-to-r from-green-600 to-green-700",
      darkweb: "bg-gradient-to-r from-gray-800 to-black"
    };
    return colors[appType] || "bg-gray-500";
  };

  if (!currentAdmin) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-gray-900 border-b border-gray-700 flex items-center justify-between p-4">
          <ArrowLeft 
            data-testid="button-back"
            className="cursor-pointer text-white" 
            onClick={onBack} 
          />
          <h2 className="text-lg font-semibold text-white">Panel Admin</h2>
          <Shield className="text-blue-400" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <Shield className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <CardTitle>Acceso Administrativo</CardTitle>
              <CardDescription>
                Ingresa tus credenciales de administrador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  placeholder="Usuario"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  required
                  data-testid="input-username"
                />
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                  data-testid="input-password"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Verificando..." : "Acceder"}
                </Button>
              </form>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-xs text-blue-700">
                  <strong>Credenciales por defecto:</strong><br />
                  Usuario: admin<br />
                  Contraseña: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gray-900 border-b border-gray-700 flex items-center justify-between p-4">
        <ArrowLeft 
          data-testid="button-back-main"
          className="cursor-pointer text-white" 
          onClick={onBack} 
        />
        <h2 className="text-lg font-semibold text-white">Panel Admin</h2>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-green-400" />
          <span className="text-green-400 text-sm">{currentAdmin.username}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Generate Codes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Generar Códigos de Registro
            </CardTitle>
            <CardDescription>
              Crea nuevos códigos de registro para las aplicaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateCodes} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Select 
                  value={codeForm.appType} 
                  onValueChange={(value) => setCodeForm(prev => ({ ...prev, appType: value }))}
                >
                  <SelectTrigger data-testid="select-app-type">
                    <SelectValue placeholder="Seleccionar aplicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tinder">Tinder</SelectItem>
                    <SelectItem value="wallapop">Wallapop</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="darkweb">Dark Web</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  type="number"
                  placeholder="Cantidad"
                  min="1"
                  max="10"
                  value={codeForm.count}
                  onChange={(e) => setCodeForm(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
                  data-testid="input-count"
                />
              </div>
              
              <Input
                type="datetime-local"
                placeholder="Fecha de expiración (opcional)"
                value={codeForm.expiresAt}
                onChange={(e) => setCodeForm(prev => ({ ...prev, expiresAt: e.target.value }))}
                data-testid="input-expires"
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={generateCodesMutation.isPending}
                data-testid="button-generate"
              >
                {generateCodesMutation.isPending ? "Generando..." : "Generar Códigos"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Active Codes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Códigos Activos
            </CardTitle>
            <CardDescription>
              Gestiona los códigos de registro existentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {codes && Array.isArray(codes) && codes.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {codes.map((code: RegistrationCode) => (
                  <div 
                    key={code.id} 
                    className={`p-3 rounded-lg border ${
                      code.isUsed 
                        ? 'bg-gray-100 border-gray-300' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 rounded text-white text-xs font-bold ${getAppColor(code.appType)}`}>
                          {getAppDisplayName(code.appType)}
                        </div>
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                          {code.code}
                        </code>
                        {code.isUsed ? (
                          <Badge variant="secondary">Usado</Badge>
                        ) : (
                          <Badge variant="default" className="bg-green-500">Activo</Badge>
                        )}
                      </div>
                      
                      {!code.isUsed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(code.code)}
                          data-testid="button-copy-code"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Creado: {formatDate(code.createdAt)}
                      </div>
                      {code.expiresAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Expira: {formatDate(code.expiresAt)}
                        </div>
                      )}
                      {code.isUsed && code.usedBy && (
                        <div className="text-gray-600">
                          Usado por: {code.usedBy} el {code.usedAt ? formatDate(code.usedAt) : 'N/A'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Key className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay códigos generados aún</p>
                <p className="text-sm">Genera códigos usando el formulario de arriba</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}