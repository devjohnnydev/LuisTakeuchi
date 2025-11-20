import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Shield, FileText, Stethoscope, ArrowLeft } from "lucide-react";

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
      <Card className="max-w-2xl w-full shadow-xl border-t-4 border-t-emerald-600">
        <CardHeader className="space-y-4 pb-6 border-b">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
             <Link href="/">
               <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1">
                 <ArrowLeft className="h-4 w-4" /> Voltar
               </Button>
             </Link>
          </div>
          <CardTitle className="text-2xl md:text-3xl text-emerald-700">Termo de Consentimento e Esclarecimento</CardTitle>
          <CardDescription className="text-base">
            Antes de iniciar, precisamos garantir que você entenda como seus dados serão utilizados no contexto do PGR/GRO.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-8">
          <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 text-sm text-emerald-900 leading-relaxed">
            <p className="font-semibold mb-2">Finalidade do Monitoramento</p>
            Este questionário visa identificar riscos psicossociais no ambiente de trabalho para subsidiar ações preventivas da empresa, conforme a NR-01. As informações serão tratadas de forma confidencial e estatística.
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-md hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => handleCheck('medicalDisclaimer')(!data.consents.medicalDisclaimer)}>
              <Checkbox 
                id="medicalDisclaimer" 
                checked={data.consents.medicalDisclaimer}
                onCheckedChange={handleCheck('medicalDisclaimer')}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="medicalDisclaimer" className="font-medium cursor-pointer flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-emerald-600" />
                  Não é Diagnóstico Médico
                </Label>
                <p className="text-sm text-muted-foreground">
                  Entendo que este sistema não realiza diagnóstico médico nem prescreve tratamento, servindo apenas para monitoramento ocupacional.
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
                  <FileText className="h-4 w-4 text-emerald-600" />
                  Tratamento de Dados (LGPD)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Concordo com o processamento dos meus dados para fins de cumprimento legal (NR-01) e melhoria do ambiente de trabalho.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-md hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => handleCheck('confidentiality')(!data.consents.confidentiality)}>
              <Checkbox 
                id="confidentiality" 
                checked={data.consents.confidentiality}
                onCheckedChange={handleCheck('confidentiality')}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="confidentiality" className="font-medium cursor-pointer flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  Sigilo e Confidencialidade
                </Label>
                <p className="text-sm text-muted-foreground">
                  Entendo que meus dados individuais serão protegidos e acessados apenas por profissionais autorizados.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 p-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            Ao continuar, seu aceite será registrado para fins de auditoria.
          </span>
          <Button 
            size="lg" 
            onClick={handleContinue}
            className="w-full md:w-auto font-semibold shadow-lg shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!Object.values(data.consents).every(Boolean)}
          >
            Concordo e Quero Prosseguir
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
