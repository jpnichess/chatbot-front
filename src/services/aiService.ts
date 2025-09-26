// import express from "express";
// import fetch from "node-fetch";
// import { GoogleAuth } from "google-auth-library";
// import cors from "cors";

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post("/api/chat", async (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ error: "Mensagem vazia" });

//   try {
//     const auth = new GoogleAuth({
//       keyFile: "./service-account.json",
//       scopes: "https://www.googleapis.com/auth/cloud-platform",
//     });
//     const client = await auth.getClient();
//     const token = await client.getAccessToken();

//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token.token}`,
//         },
//         body: JSON.stringify({
//           prompt: { text: message },
//           temperature: 0.7,
//           maxOutputTokens: 100,
//         }),
//       }
//     );

//     const data = await response.json();
//     const botReply = data?.results?.[0]?.content?.[0]?.text || "Erro ao gerar resposta";

//     res.json({ reply: botReply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erro no servidor" });
//   }
// });

// app.listen(3001, () => console.log("Server rodando na porta 3001"));


// //NPM INSTALL 