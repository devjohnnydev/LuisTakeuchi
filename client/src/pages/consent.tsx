import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Shield, FileText, UserCheck, ArrowLeft } from "lucide-react";

export default function Consent() {
  const { data, updateConsents } = useSurvey();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleCheck = (key: keyof typeof data.consents) => (checked: boolean | string) => {
    updateConsents({
      ...data.consents,
      [key]: checked === true,
    });
  };

  const handleContinue = () => {
    if (Object.values(data.consents).every(Boolean)) {
      setLocation("/identify");
    } else {
      toast({
        title: "Ação Necessária",
        description: "Você deve concordar com todos os termos para prosseguir.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-4 pb-6 border-b">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
             <Link href="/">
               <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1">
                 <ArrowLeft className="h-4 w-4" /> Voltar
               </Button>
             </Link>
          </div>
          <CardTitle className="text-2xl md:text-3xl text-primary">Termo de Consentimento</CardTitle>
          <CardDescription className="text-base">
            Para garantir a segurança e a validade da pesquisa, precisamos do seu consentimento expresso em conformidade com a LGPD.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-8">
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900 leading-relaxed">
            <p className="font-semibold mb-2">Autorização para Aplicação do Questionário</p>
            O Instituto de Saúde Mental, Comportamental e Bem-Estar (ISMCBE) garante total sigilo e confidencialidade às suas respostas, que serão usadas exclusivamente para diagnosticar a cultura e o clima organizacional. Seus dados pessoais serão criptografados (AES-256) e anonimizados.
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-md hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => handleCheck('confidentiality')(!data.consents.confidentiality)}>
              <Checkbox 
                id="confidentiality" 
                checked={data.consents.confidentiality}
                onCheckedChange={handleCheck('confidentiality')}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="confidentiality" className="font-medium cursor-pointer flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Termo de Sigilo e Confidencialidade
                </Label>
                <p className="text-sm text-muted-foreground">
                  Li e concordo que minhas respostas são sigilosas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-md hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => handleCheck('lgpd')(!data.consents.lgpd)}>
              <Checkbox 
                id="lgpd" 
                checked={data.consents.lgpd}
                onCheckedChange={handleCheck('lgpd')}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="lgpd" className="font-medium cursor-pointer flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Tratamento de Dados (LGPD)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Concordo com a coleta e processamento dos meus dados conforme a Política de Privacidade.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-md hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => handleCheck('sincerity')(!data.consents.sincerity)}>
              <Checkbox 
                id="sincerity" 
                checked={data.consents.sincerity}
                onCheckedChange={handleCheck('sincerity')}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="sincerity" className="font-medium cursor-pointer flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  Compromisso de Sinceridade
                </Label>
                <p className="text-sm text-muted-foreground">
                  Entendo que não há respostas certas ou erradas e que minha sinceridade é essencial.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 p-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            Ao continuar, seu IP e data de consentimento serão registrados para auditoria.
          </span>
          <Button 
            size="lg" 
            onClick={handleContinue}
            className="w-full md:w-auto font-semibold shadow-lg shadow-primary/20"
            disabled={!Object.values(data.consents).every(Boolean)}
          >
            Concordo e Quero Prosseguir
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
