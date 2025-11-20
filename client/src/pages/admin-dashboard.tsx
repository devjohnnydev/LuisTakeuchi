import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LayoutDashboard, Users, FileText, LogOut, ShieldCheck } from "lucide-react";

const imcoData = [
  { name: "Motivação", value: 3.8, full: 5 },
  { name: "Liderança", value: 4.2, full: 5 },
  { name: "Filosofia", value: 3.5, full: 5 },
  { name: "Gestão Pessoas", value: 2.9, full: 5 },
  { name: "Natureza Trabalho", value: 4.5, full: 5 },
];

const fdacData = [
  { subject: "Fairness", A: 120, fullMark: 150 },
  { subject: "Disclosure", A: 98, fullMark: 150 },
  { subject: "Accountability", A: 86, fullMark: 150 },
  { subject: "Compliance", A: 99, fullMark: 150 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShieldCheck className="h-6 w-6 text-blue-400" />
            <span>Painel Administrativo SIMDCCO</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">admin@ismcbe.com.br</span>
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Respostas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">142</div>
              <p className="text-xs text-muted-foreground mt-1">+12% desde a última semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Organizações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">Ativas no momento</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risco de Dissonância</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">Médio</div>
              <p className="text-xs text-muted-foreground mt-1">Baseado na IA preditiva</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="imco" className="space-y-4">
          <TabsList>
            <TabsTrigger value="imco" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard IMCO</TabsTrigger>
            <TabsTrigger value="fdac" className="gap-2"><FileText className="h-4 w-4" /> Dashboard FDAC</TabsTrigger>
            <TabsTrigger value="respondents" className="gap-2"><Users className="h-4 w-4" /> Respondentes</TabsTrigger>
          </TabsList>

          <TabsContent value="imco" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Média por Vetor (IMCO)</CardTitle>
                  <CardDescription>Visão geral do clima organizacional</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={imcoData} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="hsl(221 83% 53%)" radius={[0, 4, 4, 0]} name="Média" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Distribuição por Departamento</CardTitle>
                  <CardDescription>Participação relativa</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  Gráfico de Pizza (Placeholder)
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fdac">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Cultura (FDAC)</CardTitle>
                <CardDescription>Fairness, Disclosure, Accountability, Compliance</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={fdacData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Organização A" dataKey="A" stroke="hsl(221 83% 53%)" fill="hsl(221 83% 53%)" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="respondents">
             <Card>
                <CardHeader>
                   <CardTitle>Lista de Respostas (Anonimizada)</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-2">
                      {[1,2,3,4,5].map(i => (
                         <div key={i} className="flex items-center justify-between p-3 bg-white border rounded shadow-sm">
                            <div className="flex flex-col">
                               <span className="font-mono text-xs text-slate-500">HASH: 8a7b...3c2d</span>
                               <span className="text-sm font-medium">RH • 100% Completado</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                               {new Date().toLocaleDateString()}
                            </div>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
