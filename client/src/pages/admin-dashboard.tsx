import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { LayoutDashboard, Users, FileText, LogOut, ShieldCheck, Edit, Save, Search, Briefcase } from "lucide-react";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";

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

const companiesData = [
  { name: "TechCorp S.A.", employees: 45 },
  { name: "HealthPlus Ltda", employees: 32 },
  { name: "Educa Brasil", employees: 28 },
  { name: "FinanceGroup", employees: 15 },
  { name: "Retail & Co", employees: 22 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AdminDashboard() {
  const { questions, updateQuestion } = useSurvey();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.dimension.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveQuestion = (id: number) => {
    updateQuestion(id, editText);
    setEditingId(null);
    toast({
      title: "Questão Atualizada",
      description: `A questão ${id} foi modificada com sucesso.`,
    });
  };

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
              <CardTitle className="text-sm font-medium text-muted-foreground">Organizações Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">5 com relatórios pendentes</p>
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

        <Tabs defaultValue="companies" className="space-y-4">
          <TabsList>
            <TabsTrigger value="companies" className="gap-2"><Briefcase className="h-4 w-4" /> Empresas</TabsTrigger>
            <TabsTrigger value="imco" className="gap-2"><LayoutDashboard className="h-4 w-4" /> Dashboard IMCO</TabsTrigger>
            <TabsTrigger value="fdac" className="gap-2"><FileText className="h-4 w-4" /> Dashboard FDAC</TabsTrigger>
            <TabsTrigger value="respondents" className="gap-2"><Users className="h-4 w-4" /> Respondentes</TabsTrigger>
            <TabsTrigger value="questions" className="gap-2"><Edit className="h-4 w-4" /> Gerenciar Perguntas</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Participação por Empresa</CardTitle>
                  <CardDescription>Número de funcionários respondentes</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={companiesData} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Bar dataKey="employees" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Funcionários" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Distribuição Percentual</CardTitle>
                  <CardDescription>Fatia de participação por organização</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={companiesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="employees"
                      >
                        {companiesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                  <CardTitle>Análise de Dispersão</CardTitle>
                  <CardDescription>Variabilidade das respostas (Simulado)</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg bg-slate-50">
                  <span className="text-sm">Mapa de Calor (Em desenvolvimento)</span>
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
                      {[1,2,3,4,5,6,7,8].map(i => (
                         <div key={i} className="flex items-center justify-between p-3 bg-white border rounded shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col">
                               <span className="font-mono text-xs text-slate-500">HASH: {Math.random().toString(16).substr(2, 8)}...</span>
                               <span className="text-sm font-medium">
                                 {["RH", "TI", "Financeiro", "Vendas"][i % 4]} • TechCorp S.A.
                               </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">100%</span>
                              <span className="text-xs text-muted-foreground">
                                 {new Date().toLocaleDateString()}
                              </span>
                            </div>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Banco de Questões</CardTitle>
                <CardDescription>Edite o texto das 100 questões (IMCO + FDAC).</CardDescription>
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar questão..." 
                      className="pl-8" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredQuestions.slice(0, 50).map((q) => (
                    <div key={q.id} className="p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Q{q.id}</span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{q.dimension}</span>
                          </div>
                          
                          {editingId === q.id ? (
                            <div className="pt-2 space-y-2">
                              <Input 
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveQuestion(q.id)} className="gap-1">
                                  <Save className="h-3 w-3" /> Salvar
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm mt-1">{q.text}</p>
                          )}
                        </div>
                        
                        {editingId !== q.id && (
                          <Button variant="ghost" size="sm" onClick={() => startEditing(q.id, q.text)}>
                            <Edit className="h-4 w-4 text-slate-400 hover:text-blue-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredQuestions.length > 50 && (
                    <div className="text-center text-sm text-muted-foreground py-4">
                      Mostrando as primeiras 50 de {filteredQuestions.length} questões. Use a busca para encontrar outras.
                    </div>
                  )}
                  {filteredQuestions.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">Nenhuma questão encontrada.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
