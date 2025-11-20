import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { ArrowLeft, Building2, User, Mail, Briefcase } from "lucide-react";
import { Link } from "wouter";

// Schema for validation
const identitySchema = z.object({
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido"),
  email: z.string().email("E-mail inválido"),
  department: z.string().min(2, "Departamento é obrigatório"),
});

type IdentityFormValues = z.infer<typeof identitySchema>;

export default function Identify() {
  const { updateIdentity } = useSurvey();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      cpf: "",
      cnpj: "",
      email: "",
      department: "",
    },
  });

  const onSubmit = async (values: IdentityFormValues) => {
    // Simulate API lookup delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, we would validate CPF/CNPJ against an API here
    // and check for uniqueness.
    
    updateIdentity({
      ...values,
      name: "Usuário Teste", // Mocked
      companyName: "Empresa Exemplo LTDA", // Mocked
    });

    toast({
      title: "Identificação Validada",
      description: `Bem-vindo, Usuário Teste. Empresa: Empresa Exemplo LTDA.`,
    });

    setLocation("/form");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-2 pb-6 border-b">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
             <Link href="/consent">
               <Button variant="ghost" size="sm" className="-ml-2 h-8 gap-1">
                 <ArrowLeft className="h-4 w-4" /> Voltar
               </Button>
             </Link>
          </div>
          <CardTitle className="text-2xl text-primary">Identificação</CardTitle>
          <CardDescription>
            Seus dados são utilizados apenas para validar sua participação e gerar os relatórios.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" /> CPF
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" /> CNPJ da Organização
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0000-00" {...field} />
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
                      <Input placeholder="seu.nome@empresa.com.br" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" /> Departamento
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Recursos Humanos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full font-semibold shadow-lg shadow-primary/20"
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
