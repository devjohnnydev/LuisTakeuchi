import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Send } from "lucide-react";

const QUESTIONS_PER_PAGE = 10;

export default function FormPage() {
  const { data, updateAnswer, questions } = useSurvey(); // Use questions from context
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if identity is missing (guard)
  useEffect(() => {
    if (!data.identity.email) {
      setLocation("/identify");
    }
  }, [data.identity.email, setLocation]);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const progress = (Object.keys(data.answers).length / questions.length) * 100;
  const isLastPage = currentPage === totalPages - 1;

  const showFDACNote = currentQuestions.some(q => q.type === "FDAC");

  const handleNext = () => {
    // Validate current page answers
    const missingQuestions = currentQuestions.filter(q => !data.answers[q.id]);
    if (missingQuestions.length > 0) {
      toast({
        title: "Questões Pendentes",
        description: `Por favor, responda todas as questões desta página antes de prosseguir. (Faltam: ${missingQuestions.map(q => q.id).join(", ")})`,
        variant: "destructive",
      });
      return;
    }

    if (isLastPage) {
      handleSubmit();
    } else {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setLocation("/results");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b shadow-sm px-6 py-4">
        <div className="container mx-auto max-w-4xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Diagnóstico Organizacional</h1>
          <p className="text-muted-foreground">
            Página {currentPage + 1} de {totalPages}
          </p>
        </div>

        {showFDACNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-amber-900 animate-in fade-in">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Atenção: Questões FDAC</h4>
              <p className="text-sm mt-1">
                As perguntas a seguir (Q89 a Q100) referem-se aos pilares de Cultura (Fairness, Disclosure, Accountability, Compliance) e estão em fase de validação teórica.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {currentQuestions.map((q) => (
            <Card key={q.id} className="overflow-hidden border-l-4 border-l-primary/50">
              <CardHeader className="bg-slate-50/50 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-bold text-muted-foreground bg-white px-2 py-1 rounded border">
                    Q{q.id} • {q.dimension}
                  </span>
                </div>
                <CardTitle className="text-lg font-medium leading-relaxed pt-2">
                  {q.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup
                  value={data.answers[q.id]?.toString()}
                  onValueChange={(val) => updateAnswer(q.id, parseInt(val))}
                  className="flex flex-col sm:flex-row justify-between gap-4"
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <div key={val} className="flex items-center space-x-2 flex-1">
                      <RadioGroupItem 
                        value={val.toString()} 
                        id={`q${q.id}-${val}`} 
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`q${q.id}-${val}`}
                        className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 border-muted bg-white hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                      >
                        <span className="text-xl font-bold mb-1 text-slate-700 peer-data-[state=checked]:text-primary">{val}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">
                          {val === 1 ? "Discordo Totalmente" : val === 5 ? "Concordo Totalmente" : " "}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className="gap-2 min-w-[140px] shadow-lg shadow-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Enviando..."
            ) : isLastPage ? (
              <>Finalizar <Send className="h-4 w-4" /></>
            ) : (
              <>Próximo <ChevronRight className="h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
