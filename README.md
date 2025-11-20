# SIMSaM NR-01 - Sistema Informatizado de Monitoramento da Saúde Mental

O **SIMSaM NR-01** é uma plataforma especializada no monitoramento de riscos psicossociais, desenvolvida para apoiar empresas no cumprimento da **Norma Regulamentadora 01 (NR-01)**, integrando-se ao **Gerenciamento de Riscos Ocupacionais (GRO)** e ao **Programa de Gerenciamento de Riscos (PGR)**.

## 🎯 Objetivo do Sistema

Fornecer ferramentas para que empresas possam:
1.  **Monitorar** a saúde mental dos colaboradores de forma contínua e ética.
2.  **Identificar** riscos psicossociais (exaustão, assédio, falta de suporte).
3.  **Gerar Evidências** documentais para o PGR.
4.  **Atuar** preventivamente baseando-se em dados (Data-Driven HR).

> ⚠️ **Atenção**: Este sistema **NÃO** realiza diagnóstico médico clínico. Ele fornece indicadores ocupacionais para gestão organizacional.

## 🏗️ Estrutura e Funcionalidades

### 1. Módulo do Colaborador
*   **Consentimento Informado**: Termos claros sobre LGPD, sigilo e finalidade dos dados.
*   **Avaliação Psicossocial**: Questionário estruturado em 6 blocos temáticos:
    1.  Exaustão e Carga de Trabalho
    2.  Suporte da Liderança
    3.  Clima de Equipe
    4.  Sentido do Trabalho
    5.  Assédio e Respeito
    6.  Equilíbrio Trabalho-Vida
*   **Interface Segura**: Acesso via código/matrícula e e-mail corporativo.

### 2. Módulo do Gestor (Admin)
*   **Dashboard de Riscos**: Visão geral da saúde mental da organização.
*   **Mapa de Calor**: Identificação de setores críticos (ex: Vendas, Produção).
*   **Evolução Temporal**: Gráficos de tendência para acompanhar a eficácia das ações do PGR.
*   **Relatórios PGR**: Dados consolidados para anexar ao Programa de Gerenciamento de Riscos.

## 🛠️ Stack Tecnológica

*   **Frontend**: React + Vite + Tailwind CSS
*   **Visualização de Dados**: Recharts
*   **Segurança**: LGPD by Design (Minimização de dados)
*   **Roteamento**: Wouter

## 🚀 Como Usar

1.  **Instalação**:
    ```bash
    npm install
    ```
2.  **Execução**:
    ```bash
    npm run dev:client
    ```
3.  **Acessos**:
    *   **Colaborador**: `http://localhost:5000/`
    *   **Admin**: `http://localhost:5000/admin` (Login: `admin@empresa.com.br` / `Teste123!`)

## 🔒 Privacidade e Segurança

*   **Anonimização**: Relatórios por setor só são gerados se houver um número mínimo de respondentes para garantir o não-rastreio.
*   **Finalidade**: Dados usados exclusivamente para prevenção e promoção de saúde ocupacional.

---
Desenvolvido como protótipo para validação de requisitos NR-01.
