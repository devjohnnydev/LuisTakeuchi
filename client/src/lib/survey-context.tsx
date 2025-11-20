import React, { createContext, useContext, useState, ReactNode } from "react";

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
  updateConsents: (consents: SurveyData["consents"]) => void;
  updateIdentity: (identity: SurveyData["identity"]) => void;
  updateAnswer: (questionId: number, value: number) => void;
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

  const resetSurvey = () => {
    setData(defaultData);
  };

  return (
    <SurveyContext.Provider
      value={{ data, updateConsents, updateIdentity, updateAnswer, resetSurvey }}
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
