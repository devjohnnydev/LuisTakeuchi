import React, { createContext, useContext, useState, ReactNode } from "react";
import { questions as initialQuestions, Question, blocks } from "./questions";

type SurveyData = {
  consents: {
    lgpd: boolean;
    medicalDisclaimer: boolean;
    confidentiality: boolean;
  };
  identity: {
    code: string; // Matrícula/Código Interno
    email: string;
    name?: string;
    sector?: string; // Centro de Custo/Setor
  };
  answers: Record<number, number>;
};

type SurveyContextType = {
  data: SurveyData;
  questions: Question[];
  updateConsents: (consents: SurveyData["consents"]) => void;
  updateIdentity: (identity: SurveyData["identity"]) => void;
  updateAnswer: (questionId: number, value: number) => void;
  updateQuestion: (id: number, text: string) => void;
  resetSurvey: () => void;
  calculateScores: () => { blockScores: Record<string, number>; riskLevel: "BAIXO" | "MODERADO" | "ALTO"; totalScore: number };
};

const defaultData: SurveyData = {
  consents: {
    lgpd: false,
    medicalDisclaimer: false,
    confidentiality: false,
  },
  identity: {
    code: "",
    email: "",
  },
  answers: {},
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SurveyData>(defaultData);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const updateConsents = (consents: SurveyData["consents"]) => {
    setData((prev) => ({ ...prev, consents }));
  };

  const updateIdentity = (identity: SurveyData["identity"]) => {
    setData((prev) => ({ ...prev, identity }));
  };

  const updateAnswer = (questionId: number, value: number) => {
    setData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }));
  };

  const updateQuestion = (id: number, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const resetSurvey = () => {
    setData(defaultData);
  };

  const calculateScores = () => {
    const blockScores: Record<string, number> = {};
    let totalSum = 0;
    let totalCount = 0;

    blocks.forEach((block) => {
      const blockQuestions = questions.filter((q) => q.block === block);
      const blockSum = blockQuestions.reduce((sum, q) => sum + (data.answers[q.id] || 0), 0);
      const blockAvg = blockQuestions.length > 0 ? blockSum / blockQuestions.length : 0;
      blockScores[block] = blockAvg;
      
      totalSum += blockSum;
      totalCount += blockQuestions.length;
    });

    const totalAvg = totalCount > 0 ? totalSum / totalCount : 0;

    // Risk Logic (Inverted logic: 1 is Bad, 5 is Good in Likert typically, 
    // BUT for "Exhaustion" high score might mean high exhaustion depending on phrasing.
    // Let's assume the questions are phrased positively or negatively?
    // Looking at questions:
    // Q1: "Sinto-me emocionalmente esgotado" -> 5 is BAD (High Risk)
    // Q5: "Meu gestor demonstra preocupação" -> 5 is GOOD (Low Risk)
    // This requires normalization. For simplicity in this prototype, 
    // let's assume we want HIGH score = GOOD HEALTH (Low Risk).
    // So we need to invert Negative questions.
    
    // Negative Blocks: "Exaustão e Carga de Trabalho"
    // Questions 1, 2, 3, 4 are negative. 5=High Risk.
    // We should invert them for the general score: 6 - value.
    
    // Let's re-calculate with normalization
    let normalizedTotalSum = 0;
    
    blocks.forEach(block => {
        const blockQuestions = questions.filter(q => q.block === block);
        let blockSum = 0;
        
        blockQuestions.forEach(q => {
            let val = data.answers[q.id] || 3; // default neutral if missing (shouldn't happen)
            if (block === "Exaustão e Carga de Trabalho") {
                val = 6 - val; // Invert: 5->1 (Bad), 1->5 (Good)
            }
            blockSum += val;
        });
        
        blockScores[block] = blockSum / blockQuestions.length;
        normalizedTotalSum += blockSum;
    });

    const normalizedAvg = normalizedTotalSum / questions.length;

    let riskLevel: "BAIXO" | "MODERADO" | "ALTO" = "MODERADO";
    if (normalizedAvg >= 3.5) riskLevel = "BAIXO"; // Good health
    else if (normalizedAvg >= 2.5) riskLevel = "MODERADO";
    else riskLevel = "ALTO"; // Poor health

    return { blockScores, riskLevel, totalScore: normalizedAvg };
  };

  return (
    <SurveyContext.Provider
      value={{ 
        data, 
        questions,
        updateConsents, 
        updateIdentity, 
        updateAnswer, 
        updateQuestion,
        resetSurvey,
        calculateScores
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
}
