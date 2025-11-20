# SIMDCCO - Sistema Informatizado de Medida de Dissonância de Cultura e Clima Organizacional

## 📋 Sobre o Projeto

O **SIMDCCO** é uma plataforma web completa para diagnóstico de **Clima (IMCO)** e **Cultura (FDAC)** organizacional. O sistema foi projetado para coletar respostas de colaboradores de forma confidencial, segura e anonimizada, gerando relatórios analíticos para gestores de RH e lideranças.

Este projeto é um protótipo funcional de alta fidelidade, focado na experiência do usuário (UX/UI), segurança simulada e visualização de dados.

---

## 🚀 Funcionalidades Principais

### 1. Coleta de Dados (Frontend)
*   **Questionário IMCO (88 questões)**: Avalia vetores como Motivação, Liderança, Filosofia de Gestão, Gestão de Pessoas e Natureza do Trabalho.
*   **Questionário FDAC (12 questões)**: Avalia os pilares de Cultura: Fairness, Disclosure, Accountability e Compliance.
*   **Escala Likert Visual**: Interface amigável com emojis para facilitar a resposta (1 a 5).
*   **Validação em Tempo Real**: Garante que todas as perguntas sejam respondidas antes do envio.

### 2. Segurança e LGPD
*   **Consentimento Expresso**: Fluxo de aceitação de termos de sigilo e privacidade (LGPD).
*   **Anonimização**: O sistema simula a anonimização de dados sensíveis (CPF, E-mail) utilizando hashes.
*   **Simulação de Blockchain**: As respostas são "seladas" (simbolicamente) na rede Polygon (Mumbai) para garantir integridade e imutabilidade.

### 3. Painel Administrativo (Dashboard)
*   **Gestão de Perguntas**: Interface para editar o texto das 100 questões em tempo real.
*   **Analytics Avançado**:
    *   Métricas de Clima (IMCO) por vetor.
    *   Radar Chart de Cultura (FDAC).
    *   eNPS (Employee Net Promoter Score) simulado.
    *   Índice de Engajamento e Risco de Turnover.
    *   Comparativo entre empresas e departamentos.
*   **Gestão de Respondentes**: Acompanhamento de status de preenchimento por empresa.

---

## 🛠️ Stack Tecnológica

Este projeto utiliza uma arquitetura moderna e performática:

*   **Frontend**: React 18 + Vite
*   **Linguagem**: TypeScript
*   **Estilização**: Tailwind CSS v4 + Shadcn/UI (Componentes)
*   **Gráficos**: Recharts
*   **Roteamento**: Wouter
*   **Gerenciamento de Estado**: React Context API

---

## 🏁 Como Rodar o Projeto

1.  **Instalação de Dependências**:
    O ambiente Replit já gerencia os pacotes, mas caso precise instalar manualmente:
    ```bash
    npm install
    ```

2.  **Executar Aplicação**:
    ```bash
    npm run dev:client
    ```

3.  **Acessar**:
    *   **Página Pública**: `http://localhost:5000/`
    *   **Painel Admin**: `http://localhost:5000/admin`

---

## 🔑 Credenciais de Acesso (Admin)

Para acessar o painel administrativo e testar todas as funcionalidades:

*   **E-mail**: `administrador@ismcbe.com.br` ou `admin@ismcbe.com.br`
*   **Senha**: `Teste123!`

> **Dica**: Na tela de login, utilize o botão "Preencher Credenciais (Demo)" para acesso rápido.

---

## 📊 Estrutura dos Questionários

### IMCO (Instrumento de Medida de Clima Organizacional)
Foca na percepção dos colaboradores sobre o ambiente de trabalho.
*   **Motivação**: Impulso interno para realizar o trabalho.
*   **Liderança**: Qualidade da gestão imediata e superior.
*   **Filosofia de Gestão**: Coerência entre valores e práticas.
*   **Natureza do Trabalho**: Satisfação com as tarefas em si.

### FDAC (Fairness, Disclosure, Accountability, Compliance)
Foca na cultura ética e transparência.
*   **Fairness**: Senso de justiça e imparcialidade.
*   **Disclosure**: Transparência nas informações.
*   **Accountability**: Responsabilização por atos e decisões.
*   **Compliance**: Conformidade com leis e normas.

---

## 🛡️ Disclaimer

Este é um software de **prototipagem**.
*   Não há backend real conectado a um banco de dados persistente.
*   As integrações com Blockchain e IA são simuladas no frontend para fins de demonstração de fluxo.
*   Os dados são resetados ao recarregar a aplicação (in-memory state).

---

Desenvolvido para **ISMCBE**.
