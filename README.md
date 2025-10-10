# 🌈 Flexa AI — Frontend

Interface web para o chatbot **Flexa**, construído com **React**, **TypeScript** e **Vite**.  
Este projeto consome o backend da Flexa AI para prover uma experiência de chat com streaming de respostas da IA baseada na API Gemini (Google).

---

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) – para chamadas HTTP
- [ESLint](https://eslint.org/) – com suporte a TypeScript + React

---

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/jpnichess/Front-gpt.git
cd Front-gpt/

# Instalar dependências
npm install

Crie um arquivo .env.local na raiz do projeto com as variáveis:

VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

🌐 Integração com o Backend

A aplicação se conecta a um backend que expõe os seguintes endpoints:

POST /stream-chat → Envia mensagem e recebe resposta da IA via streaming

GET /history/:sessionId → Retorna histórico de interações agrupadas

GET /history-detail/:conversationId → Exibe detalhes de uma conversa específica

