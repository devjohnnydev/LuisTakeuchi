import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSurvey } from "@/lib/survey-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { questions } from "@/lib/questions";
import { ChevronLeft, ChevronRight, Send, BrainCircuit } from "lucide-react";

const QUESTIONS_PER_PAGE = 6; // Show one block per page roughly

const RATING_LABELS = {
  1: "Discordo Totalmente",
  2: "Discordo Parcialmente",
  3: "Neutro",
  4: "Concordo Parcialmente",
  5: "Concordo Totalmente"
};

export default function FormPage() {
  const { data, updateAnswer, questions } = useSurvey();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNext = () => {
    const missingQuestions = currentQuestions.filter(q => !data.answers[q.id]);
    if (missingQuestions.length > 0) {
      toast({
        title: "Questões Pendentes",
        description: "Por favor, responda todas as questões antes de avançar.",
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setLocation("/results");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b shadow-sm px-6 py-4">
        <div className="container mx-auto max-w-3xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-emerald-600" />
              <span>Monitoramento de Saúde Mental</span>
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-emerald-800">
            {currentQuestions[0]?.block || "Avaliação"}
          </h2>
          <p className="text-muted-foreground text-sm">
            Responda com sinceridade sobre sua percepção nas últimas semanas.
          </p>
        </div>

        <div className="space-y-8">
          {currentQuestions.map((q) => (
            <div key={q.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                <p className="text-lg font-medium text-slate-800 leading-relaxed">
                  {q.text}
                </p>
                
                <RadioGroup
                  value={data.answers[q.id]?.toString()}
                  onValueChange={(val) => updateAnswer(q.id, parseInt(val))}
                  className="flex flex-col sm:flex-row justify-between gap-2"
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <div key={val} className="flex-1">
                      <RadioGroupItem 
                        value={val.toString()} 
                        id={`q${q.id}-${val}`} 
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`q${q.id}-${val}`}
                        className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 peer-data-[state=checked]:text-emerald-700 cursor-pointer transition-all h-full text-center"
                      >
                        <span className="text-lg font-bold mb-1">{val}</span>
                        <span className="text-[10px] text-muted-foreground uppercase leading-tight">
                          {RATING_LABELS[val as keyof typeof RATING_LABELS]}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
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
            className="gap-2 min-w-[140px] shadow-lg shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 text-white"
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
