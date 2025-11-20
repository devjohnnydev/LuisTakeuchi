import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login
    setTimeout(() => {
      setIsLoading(false);
      if (email === "administrador@ismcbe.com.br" && password === "Teste123!") {
        setLocation("/admin/dashboard");
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao painel administrativo.",
        });
      } else {
        toast({
          title: "Erro de acesso",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-slate-800 bg-slate-950 text-slate-50">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/20 rounded-full">
              <Lock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
          <CardDescription className="text-slate-400">
            Entre com suas credenciais para acessar o painel SIMDCCO.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@ismcbe.com.br" 
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Acessar Painel"}
            </Button>
            
            <div className="text-center text-xs text-slate-500 mt-4">
              Acesso restrito a pessoal autorizado. Todas as ações são logadas.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
