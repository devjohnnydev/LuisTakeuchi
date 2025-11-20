import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSurvey } from "@/lib/survey-context";
import { Link } from "wouter";
import { CheckCircle, Home, FileCheck } from "lucide-react";

export default function Results() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full text-center py-12 shadow-xl border-t-4 border-t-emerald-500">
        <CardContent className="space-y-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-100 p-6 animate-in zoom-in duration-500">
              <CheckCircle className="h-16 w-16 text-emerald-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-emerald-900">Avaliação Concluída!</h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Sua participação é fundamental para o Programa de Gerenciamento de Riscos (PGR) da sua empresa.
            </p>
          </div>

          <div className="bg-slate-100 p-6 rounded-lg max-w-md mx-auto text-left space-y-3">
            <div className="flex items-start gap-3">
               <FileCheck className="h-5 w-5 text-emerald-600 mt-1" />
               <div>
                 <p className="font-semibold text-slate-800">Registro de Evidência</p>
                 <p className="text-sm text-slate-600 mt-1">
                   Suas respostas foram processadas e anonimizadas. Elas comporão os indicadores de saúde mental do setor.
                 </p>
               </div>
            </div>
            <div className="pt-4 border-t border-slate-200">
               <p className="text-xs text-muted-foreground font-mono bg-white p-2 rounded border text-center">
                 Protocolo: {Math.random().toString(36).substr(2, 9).toUpperCase()}
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
