// // src/components/Chat.tsx
// import { useState } from "react";
// import ChatInput from "./ChatInput";
// // import { sendToAI } from "../../services/aiService";

// import './chat.scss';

// export default function Chat() {
//   const [messages, setMessages] = useState<{ text: string; from: string }[]>([]);

//   const handleSend = async (msg: string) => {
//   setMessages(prev => [...prev, { text: msg, from: "user" }]);
//   const botReply = await sendToAI(msg); 
//   setMessages(prev => [...prev, { text: botReply, from: "bot" }]);
// };


//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((m, i) => (
//           <div key={i} className={m.from}>
//             {m.text}
//           </div>
//         ))}
//       </div>
//       <ChatInput onSend={handleSend} />
//     </div>
//   );
// }
