export type Question = {
  id: number;
  text: string;
  block: string;
  type: "LIKERT";
};

export const blocks = [
  "Exaustão e Carga de Trabalho",
  "Suporte da Liderança",
  "Clima de Equipe e Relações Interpessoais",
  "Sentido do Trabalho e Reconhecimento",
  "Assédio, Respeito e Segurança Psicológica",
  "Equilíbrio Trabalho–Vida Pessoal"
] as const;

export const questions: Question[] = [
  // Bloco 1: Exaustão e Carga de Trabalho
  { id: 1, text: "Sinto-me emocionalmente esgotado(a) ao final de um dia de trabalho.", block: "Exaustão e Carga de Trabalho", type: "LIKERT" },
  { id: 2, text: "Considero que a quantidade de trabalho que recebo é excessiva para o tempo disponível.", block: "Exaustão e Carga de Trabalho", type: "LIKERT" },
  { id: 3, text: "Frequentemente preciso trabalhar além do horário para cumprir minhas metas.", block: "Exaustão e Carga de Trabalho", type: "LIKERT" },
  { id: 4, text: "Sinto cansaço físico ou mental antes mesmo de chegar ao trabalho.", block: "Exaustão e Carga de Trabalho", type: "LIKERT" },

  // Bloco 2: Suporte da Liderança
  { id: 5, text: "Meu gestor imediato demonstra preocupação com meu bem-estar.", block: "Suporte da Liderança", type: "LIKERT" },
  { id: 6, text: "Recebo feedback claro e construtivo sobre meu desempenho.", block: "Suporte da Liderança", type: "LIKERT" },
  { id: 7, text: "Sinto-me confortável para pedir ajuda ao meu gestor quando tenho dificuldades.", block: "Suporte da Liderança", type: "LIKERT" },
  { id: 8, text: "Minha liderança trata a equipe com respeito e imparcialidade.", block: "Suporte da Liderança", type: "LIKERT" },

  // Bloco 3: Clima de Equipe e Relações Interpessoais
  { id: 9, text: "O ambiente de trabalho na minha equipe é amigável e colaborativo.", block: "Clima de Equipe e Relações Interpessoais", type: "LIKERT" },
  { id: 10, text: "Sinto que posso confiar nos meus colegas de trabalho.", block: "Clima de Equipe e Relações Interpessoais", type: "LIKERT" },
  { id: 11, text: "Conflitos na equipe são resolvidos de forma respeitosa e eficiente.", block: "Clima de Equipe e Relações Interpessoais", type: "LIKERT" },
  { id: 12, text: "Existe cooperação entre os membros da equipe para atingir objetivos comuns.", block: "Clima de Equipe e Relações Interpessoais", type: "LIKERT" },

  // Bloco 4: Sentido do Trabalho e Reconhecimento
  { id: 13, text: "Percebo que meu trabalho é importante para os objetivos da empresa.", block: "Sentido do Trabalho e Reconhecimento", type: "LIKERT" },
  { id: 14, text: "Sinto-me valorizado(a) e reconhecido(a) pelas minhas contribuições.", block: "Sentido do Trabalho e Reconhecimento", type: "LIKERT" },
  { id: 15, text: "Tenho clareza sobre o propósito das minhas atividades diárias.", block: "Sentido do Trabalho e Reconhecimento", type: "LIKERT" },
  { id: 16, text: "A empresa oferece oportunidades de crescimento e desenvolvimento.", block: "Sentido do Trabalho e Reconhecimento", type: "LIKERT" },

  // Bloco 5: Assédio, Respeito e Segurança Psicológica
  { id: 17, text: "No meu ambiente de trabalho, não sou exposto(a) a situações de humilhação ou constrangimento.", block: "Assédio, Respeito e Segurança Psicológica", type: "LIKERT" },
  { id: 18, text: "Sinto segurança para expressar minhas opiniões sem medo de represálias.", block: "Assédio, Respeito e Segurança Psicológica", type: "LIKERT" },
  { id: 19, text: "A empresa combate ativamente comportamentos de assédio moral ou sexual.", block: "Assédio, Respeito e Segurança Psicológica", type: "LIKERT" },
  { id: 20, text: "Sou tratado(a) com dignidade e respeito por todos na organização.", block: "Assédio, Respeito e Segurança Psicológica", type: "LIKERT" },

  // Bloco 6: Equilíbrio Trabalho–Vida Pessoal
  { id: 21, text: "Consigo conciliar satisfatoriamente minha vida profissional e pessoal.", block: "Equilíbrio Trabalho–Vida Pessoal", type: "LIKERT" },
  { id: 22, text: "A empresa respeita meus horários de descanso e folgas.", block: "Equilíbrio Trabalho–Vida Pessoal", type: "LIKERT" },
  { id: 23, text: "Raramente preciso levar trabalho para casa ou atender demandas fora do expediente.", block: "Equilíbrio Trabalho–Vida Pessoal", type: "LIKERT" },
  { id: 24, text: "Sinto que tenho tempo suficiente para cuidar da minha saúde e bem-estar fora do trabalho.", block: "Equilíbrio Trabalho–Vida Pessoal", type: "LIKERT" }
];
