import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Lock, KeyRound } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - Accept both 'admin' and 'administrador' for usability
    setTimeout(() => {
      setIsLoading(false);
      const validEmails = ["administrador@ismcbe.com.br", "admin@ismcbe.com.br"];
      
      if (validEmails.includes(email) && password === "Teste123!") {
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

  const fillCredentials = () => {
    setEmail("administrador@ismcbe.com.br");
    setPassword("Teste123!");
    toast({
      title: "Credenciais Preenchidas",
      description: "Credenciais de teste inseridas para facilitação.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-slate-800 bg-slate-950 text-slate-50 shadow-2xl shadow-blue-900/20">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/20 rounded-full ring-1 ring-blue-500/50">
              <Lock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Acesso Administrativo</CardTitle>
          <CardDescription className="text-slate-400">
            Entre com suas credenciais para acessar o painel SIMDCCO.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="administrador@ismcbe.com.br" 
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Senha</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-3 pt-2">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium h-11"
                disabled={isLoading}
              >
                {isLoading ? "Autenticando..." : "Acessar Painel"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300 h-9 text-xs"
                onClick={fillCredentials}
              >
                <KeyRound className="mr-2 h-3 w-3" />
                Preencher Credenciais (Demo)
              </Button>
            </div>
            
            <div className="text-center text-xs text-slate-600 mt-6 border-t border-slate-900 pt-4">
              Acesso restrito e monitorado. IP registrado para auditoria.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
