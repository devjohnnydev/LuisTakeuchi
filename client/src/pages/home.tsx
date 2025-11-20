import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { HeartPulse, ShieldCheck, FileText, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-emerald-700">
            <Activity className="h-6 w-6" />
            <span>SIMSaM NR-01</span>
          </div>
          <div className="text-sm text-muted-foreground hidden md:block">
            Sistema Informatizado de Monitoramento da Saúde Mental Ocupacional
          </div>
          <nav>
            <Link href="/admin">
              <Button variant="ghost" size="sm">Acesso Gestor</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in slide-in-from-left-5 duration-500">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Em conformidade com NR-01 • GRO • PGR
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Cuidando da <span className="text-emerald-600">Saúde Mental</span> no ambiente de trabalho.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            O SIMSaM ajuda sua empresa a monitorar riscos psicossociais, promovendo um ambiente mais seguro e saudável para todos.
            Participe da avaliação periódica.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/consent">
              <Button size="lg" className="text-lg px-8 h-14 shadow-lg shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 text-white">
                Iniciar Avaliação
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              Saiba mais sobre a NR-01
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t">
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-emerald-50 w-fit rounded-lg text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Sigilo Garantido</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-emerald-50 w-fit rounded-lg text-emerald-600">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Foco em Saúde</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-emerald-50 w-fit rounded-lg text-emerald-600">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Laudos PGR</span>
            </div>
          </div>
        </div>

        {/* Right side visual */}
        <div className="relative hidden md:block animate-in fade-in duration-700 delay-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full blur-3xl opacity-50 -z-10" />
          <Card className="border-none shadow-2xl bg-white/50 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="h-2 w-1/3 bg-slate-200 rounded animate-pulse" />
                <div className="h-2 w-2/3 bg-slate-200 rounded animate-pulse delay-75" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                      {i}
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 rounded overflow-hidden">
                      <div className="h-full bg-emerald-500 w-2/3 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-sm text-emerald-800 mt-4">
                "Este sistema não realiza diagnóstico médico. Seu objetivo é o monitoramento de riscos psicossociais ocupacionais."
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-8 bg-slate-50">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 SIMSaM NR-01. Todos os direitos reservados.</p>
          <p className="mt-2">Em conformidade com a LGPD e Normas Regulamentadoras (MTE).</p>
        </div>
      </footer>
    </div>
  );
}
