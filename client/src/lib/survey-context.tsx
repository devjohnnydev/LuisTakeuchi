import React, { createContext, useContext, useState, ReactNode } from "react";
import { questions as initialQuestions, Question } from "./questions";

type SurveyData = {
  consents: {
    confidentiality: boolean;
    lgpd: boolean;
    sincerity: boolean;
  };
  identity: {
    cpf: string;
    cnpj: string;
    email: string;
    department: string;
    name?: string;
    companyName?: string;
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
};

const defaultData: SurveyData = {
  consents: {
    confidentiality: false,
    lgpd: false,
    sincerity: false,
  },
  identity: {
    cpf: "",
    cnpj: "",
    email: "",
    department: "",
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

  return (
    <SurveyContext.Provider
      value={{ 
        data, 
        questions,
        updateConsents, 
        updateIdentity, 
        updateAnswer, 
        updateQuestion,
        resetSurvey 
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
