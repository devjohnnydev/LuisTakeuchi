export type Question = {
  id: number;
  text: string;
  dimension: string;
  type: "IMCO" | "FDAC";
};

export const questions: Question[] = [
  // IMCO - Motivação (Sample)
  { id: 1, text: "Sinto-me motivado a realizar minhas tarefas diárias com excelência.", dimension: "Motivação", type: "IMCO" },
  { id: 2, text: "A organização oferece incentivos que estimulam meu desempenho.", dimension: "Motivação", type: "IMCO" },
  { id: 3, text: "Percebo que meu esforço é reconhecido pelos meus superiores.", dimension: "Motivação", type: "IMCO" },
  { id: 4, text: "O ambiente de trabalho contribui para minha satisfação pessoal.", dimension: "Motivação", type: "IMCO" },
  { id: 5, text: "Tenho autonomia suficiente para realizar meu trabalho.", dimension: "Motivação", type: "IMCO" },
  
  // IMCO - Liderança (Sample)
  { id: 6, text: "Meu líder imediato oferece feedback construtivo regularmente.", dimension: "Liderança", type: "IMCO" },
  { id: 7, text: "Confio nas decisões tomadas pela liderança da organização.", dimension: "Liderança", type: "IMCO" },
  { id: 8, text: "Os líderes demonstram preocupação com o bem-estar da equipe.", dimension: "Liderança", type: "IMCO" },
  { id: 9, text: "A comunicação entre líderes e liderados é clara e eficiente.", dimension: "Liderança", type: "IMCO" },
  { id: 10, text: "Sinto-me à vontade para expressar minhas ideias ao meu gestor.", dimension: "Liderança", type: "IMCO" },

  // IMCO - Filosofia de Gestão (Sample)
  { id: 11, text: "Os valores da empresa são praticados no dia a dia.", dimension: "Filosofia de Gestão", type: "IMCO" },
  { id: 12, text: "A organização possui uma visão clara de futuro.", dimension: "Filosofia de Gestão", type: "IMCO" },
  { id: 13, text: "As regras e normas são aplicadas de forma justa para todos.", dimension: "Filosofia de Gestão", type: "IMCO" },
  { id: 14, text: "Existe coerência entre o discurso e a prática na gestão.", dimension: "Filosofia de Gestão", type: "IMCO" },
  { id: 15, text: "A empresa incentiva a inovação e a melhoria contínua.", dimension: "Filosofia de Gestão", type: "IMCO" },

  // Filling up to 88 IMCO questions with generic placeholders for prototype
  ...Array.from({ length: 73 }, (_, i) => ({
    id: 16 + i,
    text: `Questão IMCO de teste número ${16 + i} para validação do layout e fluxo.`,
    dimension: ["Gestão de Pessoas", "Natureza do Trabalho", "Motivação", "Liderança"][i % 4],
    type: "IMCO" as const
  })),

  // FDAC - Fairness (Sample)
  { id: 89, text: "A organização trata todos os colaboradores com imparcialidade.", dimension: "Fairness", type: "FDAC" },
  { id: 90, text: "As oportunidades de crescimento são distribuídas de forma justa.", dimension: "Fairness", type: "FDAC" },
  { id: 91, text: "Sinto que não há favoritismos nas decisões de promoção.", dimension: "Fairness", type: "FDAC" },

  // FDAC - Disclosure (Sample)
  { id: 92, text: "A empresa é transparente sobre seus resultados financeiros.", dimension: "Disclosure", type: "FDAC" },
  { id: 93, text: "As informações importantes são compartilhadas com todos.", dimension: "Disclosure", type: "FDAC" },
  { id: 94, text: "Não sinto que informações relevantes sejam ocultadas da equipe.", dimension: "Disclosure", type: "FDAC" },

  // FDAC - Accountability (Sample)
  { id: 95, text: "Os gestores assumem a responsabilidade por suas decisões.", dimension: "Accountability", type: "FDAC" },
  { id: 96, text: "Existe clareza sobre quem é responsável pelo que na organização.", dimension: "Accountability", type: "FDAC" },
  { id: 97, text: "Erros são tratados como oportunidades de aprendizado, não punição.", dimension: "Accountability", type: "FDAC" },

  // FDAC - Compliance (Sample)
  { id: 98, text: "A empresa segue rigorosamente as leis e regulamentos aplicáveis.", dimension: "Compliance", type: "FDAC" },
  { id: 99, text: "Existem canais seguros para denúncia de condutas antiéticas.", dimension: "Compliance", type: "FDAC" },
  { id: 100, text: "A ética é priorizada em todas as negociações da empresa.", dimension: "Compliance", type: "FDAC" },
];
