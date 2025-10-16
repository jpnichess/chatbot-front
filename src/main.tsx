import React from "react"; // Importa o React
import ReactDOM from "react-dom/client"; // Importa o ReactDOM para renderizar a aplicação
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Importa funções do React Router para roteamento
import App from "./App"; // Componente principal da aplicação
import ChatPage from "./Components/Pages/ChatPage"; // Página específica de chat
import "./styles/global.scss"; // Importa estilos globais da aplicação

// Configuração das rotas da aplicação usando createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/", // Caminho raiz
    element: <App />, // Componente que será renderizado na rota "/"
  },
  {
    path: "/chat", // Caminho "/chat"
    element: <ChatPage />, // Componente que será renderizado na rota "/chat"
  },
]);

// Ponto de entrada da aplicação
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* React.StrictMode ativa verificações adicionais de desenvolvimento */}
    <RouterProvider router={router} /> 
    {/* RouterProvider fornece o roteamento definido pelo createBrowserRouter para a aplicação */}
  </React.StrictMode>
);
