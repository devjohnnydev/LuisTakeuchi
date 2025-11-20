import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { ArrowLeft, User, Mail, Hash, Building } from "lucide-react";
import { Link } from "wouter";

// Schema for validation
const identitySchema = z.object({
  code: z.string().min(2, "Matrícula/Código é obrigatório"),
  email: z.string().email("E-mail inválido"),
  name: z.string().min(3, "Nome é obrigatório"),
  sector: z.string().min(2, "Setor/Centro de Custo é obrigatório"),
});

type IdentityFormValues = z.infer<typeof identitySchema>;

export default function Identify() {
  const { updateIdentity } = useSurvey();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      code: "",
      email: "",
      name: "",
      sector: "",
    },
  });

  const onSubmit = async (values: IdentityFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    updateIdentity({
      ...values,
    });

    toast({
      title: "Acesso Liberado",
      description: `Bem-vindo, ${values.name}. Campanha: Avaliação Q1 2026.`,
    });

    setLocation("/form");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full shadow-xl border-t-4 border-t-emerald-600">
        <CardHeader className="space-y-2 pb-6 border-b">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
             <Link href="/consent">
               <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1">
                 <ArrowLeft className="h-4 w-4" /> Voltar
               </Button>
             </Link>
          </div>
          <CardTitle className="text-2xl text-emerald-700">Identificação do Colaborador</CardTitle>
          <CardDescription>
            Informe seus dados para vincular suas respostas ao Centro de Custo correto.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" /> Nome Completo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" /> E-mail Corporativo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@empresa.com.br" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" /> Matrícula / Código
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" /> Setor / CC
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Produção, TI..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full font-semibold shadow-lg shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Validando..." : "Iniciar Questionário"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
