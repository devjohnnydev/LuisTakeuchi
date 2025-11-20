import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSurvey } from "@/lib/survey-context";
import { Link } from "wouter";
import { CheckCircle, Home } from "lucide-react";

export default function Results() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full text-center py-12 shadow-xl border-t-4 border-t-green-500">
        <CardContent className="space-y-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-6 animate-in zoom-in duration-500">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Respostas Enviadas com Sucesso!</h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Obrigado por participar. Suas respostas foram criptografadas e registradas na blockchain Polygon (Mumbai) para garantir a integridade.
            </p>
          </div>

          <div className="bg-slate-100 p-6 rounded-lg max-w-md mx-auto text-left space-y-3">
            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500">Próximos Passos</p>
            <p className="text-sm">
              Seu relatório individual será processado pelo administrador e você será notificado em até 48 horas.
            </p>
            <div className="pt-2">
               <p className="text-xs text-muted-foreground break-all font-mono bg-white p-2 rounded border">
                 TxHash: 0x71c46a...9e2f (Simulado)
               </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" /> Voltar ao Início
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
