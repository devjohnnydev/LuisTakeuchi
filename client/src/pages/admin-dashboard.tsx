import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LayoutDashboard, Users, FileText, LogOut, ShieldCheck, Briefcase, TrendingUp, AlertTriangle, HeartPulse, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const riskData = [
  { name: "Baixo Risco", value: 65, fill: "#10B981" },
  { name: "Moderado", value: 25, fill: "#F59E0B" },
  { name: "Alto Risco", value: 10, fill: "#EF4444" },
];

const blockScores = [
  { subject: "Exaustão", A: 3.2, fullMark: 5 },
  { subject: "Liderança", A: 4.1, fullMark: 5 },
  { subject: "Clima", A: 3.8, fullMark: 5 },
  { subject: "Sentido", A: 4.5, fullMark: 5 },
  { subject: "Assédio", A: 4.8, fullMark: 5 },
  { subject: "Equilíbrio", A: 2.9, fullMark: 5 },
];

const sectorData = [
  { name: "TI", risk: 3.8 }, // Higher score = Better health in this viz? Let's assume normalized
  { name: "Vendas", risk: 2.4 },
  { name: "Produção", risk: 3.1 },
  { name: "RH", risk: 4.0 },
];

const evolutionData = [
  { month: 'Jan', score: 3.2 },
  { month: 'Fev', score: 3.3 },
  { month: 'Mar', score: 3.1 }, // Dip
  { month: 'Abr', score: 3.4 },
  { month: 'Mai', score: 3.5 },
];

export default function AdminDashboard() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-emerald-900 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Activity className="h-6 w-6 text-emerald-400" />
            <span>SIMSaM - Painel Gestor</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-emerald-100">admin@empresa.com.br</span>
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-emerald-300 hover:text-white hover:bg-emerald-800">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
           <h1 className="text-2xl font-bold text-slate-800">Visão Geral - Campanha Q1 2026</h1>
           <Button className="bg-emerald-600 hover:bg-emerald-700">
             <FileText className="mr-2 h-4 w-4" /> Gerar Laudo PGR
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Adesão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">82%</div>
              <p className="text-xs text-muted-foreground mt-1">142/173 Colaboradores</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Índice Geral de Saúde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-emerald-600">3.6</div>
                <HeartPulse className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Risco Baixo (Zona Verde)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ponto de Atenção</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-red-500">Vendas</div>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Exaustão Elevada</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Graves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">2</div>
              <p className="text-xs text-muted-foreground mt-1">Protocolos de Assédio</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="overview" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Visão Geral</TabsTrigger>
            <TabsTrigger value="sectors" className="gap-2"><Briefcase className="h-4 w-4" /> Setores</TabsTrigger>
            <TabsTrigger value="evolution" className="gap-2"><TrendingUp className="h-4 w-4" /> Evolução</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Risco Psicossocial</CardTitle>
                  <CardDescription>Distribuição da população por nível de risco</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diagnóstico por Fatores (Radar)</CardTitle>
                  <CardDescription>Média da empresa por bloco temático</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={blockScores}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Empresa" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-4">
             <Card>
                <CardHeader>
                   <CardTitle>Saúde Mental por Centro de Custo</CardTitle>
                   <CardDescription>Comparativo de índice geral (Maior é melhor)</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sectorData} layout="vertical" margin={{left: 40}}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis type="number" domain={[0, 5]} />
                         <YAxis type="category" dataKey="name" width={100} />
                         <Tooltip />
                         <Bar dataKey="risk" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Índice de Saúde">
                           {sectorData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.risk < 2.5 ? "#EF4444" : entry.risk < 3.5 ? "#F59E0B" : "#10B981"} />
                           ))}
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="evolution">
             <Card>
                <CardHeader>
                   <CardTitle>Evolução Histórica</CardTitle>
                   <CardDescription>Acompanhamento do índice geral nas últimas campanhas</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={evolutionData}>
                         <XAxis dataKey="month" />
                         <YAxis domain={[0, 5]} />
                         <CartesianGrid strokeDasharray="3 3" />
                         <Tooltip />
                         <Area type="monotone" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                      </AreaChart>
                   </ResponsiveContainer>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
