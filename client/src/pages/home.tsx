import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ClipboardList, ShieldCheck, Lock, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-primary">
            <BarChart3 className="h-6 w-6" />
            <span>SIMDCCO</span>
          </div>
          <div className="text-sm text-muted-foreground hidden md:block">
            Sistema Informatizado de Medida de Dissonância de Cultura e Clima Organizacional
          </div>
          <nav>
            <Link href="/admin">
              <Button variant="ghost" size="sm">Área Administrativa</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in slide-in-from-left-5 duration-500">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            Diagnóstico Organizacional
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Sua voz molda o futuro da <span className="text-primary">nossa organização</span>.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Participe do diagnóstico de Clima (IMCO) e Cultura (FDAC). 
            Suas respostas são 100% confidenciais, anônimas e protegidas por criptografia e blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/consent">
              <Button size="lg" className="text-lg px-8 h-14 shadow-lg shadow-primary/25">
                Iniciar Questionário
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14">
              Saiba mais sobre o projeto
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t">
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-blue-50 w-fit rounded-lg text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">100% Seguro</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-blue-50 w-fit rounded-lg text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Anonimizado</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-blue-50 w-fit rounded-lg text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">~5 Minutos</span>
            </div>
          </div>
        </div>

        {/* Right side abstract visual */}
        <div className="relative hidden md:block animate-in fade-in duration-700 delay-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-50 -z-10" />
          <Card className="border-none shadow-2xl bg-white/50 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="h-2 w-1/3 bg-slate-200 rounded animate-pulse" />
                <div className="h-2 w-2/3 bg-slate-200 rounded animate-pulse delay-75" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs">
                      {i}
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 rounded overflow-hidden">
                      <div className="h-full bg-primary w-2/3 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800 mt-4">
                "A integridade das respostas é garantida via Blockchain Polygon (Mumbai)."
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-8 bg-slate-50">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ISMCBE. Todos os direitos reservados.</p>
          <p className="mt-2">Em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
        </div>
      </footer>
    </div>
  );
}
