// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { Bot, User, Send } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import ProtectedLayout from "../../components/ProtectedLayout";
// import { toast, Toaster } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import MessageLoading from "../../components/shimmerui/MessageLoading";
// import {db} from "../firebase/config"
// import { doc, getDoc } from "firebase/firestore";

// export default function ConciergeChatPage() {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [expandedMessages, setExpandedMessages] = useState({});
//   const endRef = useRef(null);

//   const {
//     patronDetails,
//   } = useAuth();

//   const displayedPatronId =
//     patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const docRef = doc(db, "conversations", displayedPatronId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           if (data.messages) {
//             setMessages(data.messages);
//           } else {
//             toast("No messages found.");
//           }
//         } else {
//           toast("No conversation found for this patron.");
//         }
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         toast.error("Failed to load chat history.");
//       }
//     };

//     if (displayedPatronId !== "N/A") {
//       fetchMessages();
//     }
//   }, [displayedPatronId]);
//   console.log("mess",messages)

//   const renderFormattedText = (text, index) => {
//     const isExpanded = expandedMessages[index];
//     const formatted = text
//       .split("\n")
//       .map((line) => {
//         const bolded = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
//         return `<p>${bolded}</p>`;
//       })
//       .join("");

//     const short = formatted.split("</p>").slice(0, 4).join("</p>") + "</p>";

//     return (
//       <div className="text-white text-sm" dangerouslySetInnerHTML={{ __html: isExpanded ? formatted : short }} />
//     );
//   };

//   return (
//     <ProtectedLayout>
//       <Toaster position="top-right" />
//       <div className="flex flex-col h-screen bg-background">
//         <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-muted-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-semibold text-foreground">Concierge Chat</h1>
//                 <p className="text-sm text-muted-foreground">Powered by Pinch</p>
//               </div>
//             </div>
//             <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//               Online
//             </Badge>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex items-start space-x-3 ${msg.isFromUser ? "justify-end" : "justify-start"}`}>
//               {!msg.isFromUser && (
//                 <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
//                   <Bot className="w-4 h-4 text-muted-foreground" />
//                 </div>
//               )}
//               <div className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${msg.isFromUser ? "bg-[#075E54] text-white rounded-br-md" : "bg-[#273443] text-white rounded-bl-md"}`}>
//                 {msg.text && renderFormattedText(msg.text, index)}
//                 {!msg.isFromUser && msg.text?.split("\n").length > 4 && (
//                   <button
//                     className="text-xs mt-2 underline text-gray-300"
//                     onClick={() =>
//                       setExpandedMessages((prev) => ({ ...prev, [index]: !prev[index] }))
//                     }
//                   >
//                     {expandedMessages[index] ? "Read less" : "Read more"}
//                   </button>
//                 )}

//                 {msg.search_results?.length > 0 && (
//                   <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
//                     <h4 className="text-sm font-semibold mb-2">🔗 Relevant Links:</h4>
//                     <ul className="space-y-1 list-disc list-inside text-xs">
//                       {msg.search_results.map((item, idx) => {
//                         const url = typeof item === "string" ? item : item.url;
//                         return (
//                           <li key={idx}>
//                             <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
//                               {url}
//                             </a>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 )}

//                 {msg.booking_activities?.flight_results && (
//                   <div className="mt-4 p-3 bg-blue-100 text-black rounded-md border border-blue-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-blue-800 mb-2">✈️ Flight Results</h4>
//                     {msg.booking_activities.flight_results}
//                   </div>
//                 )}

//                 {msg.booking_activities?.hotel_results && (
//                   <div className="mt-4 p-3 bg-green-100 text-black rounded-md border border-green-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-green-800 mb-2">🏨 Hotel Results</h4>
//                     {msg.booking_activities.hotel_results}
//                   </div>
//                 )}

//                 {msg.booking_activities?.weather_report && (
//                   <div className="mt-4 p-3 bg-yellow-100 text-black rounded-md border border-yellow-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-yellow-800 mb-2">🌦️ Weather Report</h4>
//                     {msg.booking_activities.weather_report}
//                   </div>
//                 )}

//                 {msg.booking_activities?.reminder_details && (
//                   <div className="mt-4 p-3 bg-purple-100 text-black rounded-md border border-purple-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-purple-800 mb-2">⏰ Reminder</h4>
//                     {msg.booking_activities.reminder_details}
//                   </div>
//                 )}

//                 {msg.currentTime && (
//                   <div className="mt-1 text-[10px] text-gray-400 text-right">
//                     {msg.currentTime}
//                   </div>
//                 )}
//               </div>
//               {msg.isFromUser && (
//                 <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//                   <User className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//           {isLoading && <MessageLoading />}
//           <div ref={endRef}></div>
//         </div>

//         <div className="border-t py-4 bg-background">
//           <form onSubmit={(e) => e.preventDefault()} className="px-4 flex items-center space-x-2 mb-12 sm:mb-0">
//             <Input
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//               disabled
//             />
//             <Button type="submit" disabled className="rounded-full w-10 h-10 p-0">
//               <Send className="w-4 h-4" />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </ProtectedLayout>
//   );
// }


"use client";

import React, { useEffect, useState, useRef } from "react";
import { Bot, User, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProtectedLayout from "../../components/ProtectedLayout";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import MessageLoading from "../../components/shimmerui/MessageLoading";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function ConciergeChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState({});
  const endRef = useRef(null);

  const { patronDetails } = useAuth();
  const displayedPatronId = patronDetails?.[0]?.id || "N/A";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const docRef = doc(db, "conversations", displayedPatronId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMessages(data.messages || []);
        } else {
          toast("No conversation found.");
        }
      } catch (err) {
        console.error("❌ Error fetching:", err);
        toast.error("Failed to fetch chat history.");
      }
    };

    if (displayedPatronId !== "N/A") fetchMessages();
  }, [displayedPatronId]);


  const renderFormattedText = (text, index) => {
    const isExpanded = expandedMessages[index];
    const lines = text?.split("\n") || [];
    const formattedLines = lines.map((line) =>
      `<p>${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`
    );
    const shortText = formattedLines.slice(0, 4).join("") + "</p>";
    const fullText = formattedLines.join("");

    return (
      <div
        className="text-white text-sm"
        dangerouslySetInnerHTML={{ __html: isExpanded ? fullText : shortText }}
      />
    );
  };

  return (
    <ProtectedLayout>
      <Toaster position="top-right" />
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Concierge Chat</h1>
                <p className="text-sm text-muted-foreground">Powered by Pinch</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Online
            </Badge>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col-reverse gap-6">
          {[...messages].reverse().map((msg, index) => {
            const isUser = msg.role === "user";
            const isLongText = msg.content?.split("\n").length > 4;

            return (
              <div key={index} className={`flex items-start space-x-3 ${isUser ? "justify-end" : "justify-start"}`}>
                {!isUser && (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                <div className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${isUser ? "bg-[#075E54] text-white rounded-br-md" : "bg-[#273443] text-white rounded-bl-md"}`}>
                  {msg.content && renderFormattedText(msg.content, index)}

                  {!isUser && isLongText && (
                    <button
                      className="text-xs mt-2 underline text-gray-300"
                      onClick={() =>
                        setExpandedMessages((prev) => ({ ...prev, [index]: !prev[index] }))
                      }
                    >
                      {expandedMessages[index] ? "Read less" : "Read more"}
                    </button>
                  )}

                  {/* 🔗 Links */}
                  {msg.search_results?.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
                      <h4 className="text-sm font-semibold mb-2">🔗 Relevant Links:</h4>
                      <ul className="space-y-1 list-disc list-inside text-xs">
                        {msg.search_results.map((item, idx) => {
                          const url = typeof item === "string" ? item : item.url;
                          return (
                            <li key={idx}>
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                {url}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* 🏨 Hotel */}
                  {msg.metadata?.booking_activities?.hotel_results && (
                    <div className="mt-4 p-3 bg-green-100 text-black rounded-md border border-green-300 text-xs whitespace-pre-wrap">
                      <h4 className="font-semibold text-sm text-green-800 mb-2">🏨 Hotel Results</h4>
                      {msg.metadata.booking_activities.hotel_results}
                    </div>
                  )}

                  {/* ✈️ Flights */}
                  {msg.metadata?.booking_activities?.flight_results && (
                    <div className="mt-4 p-3 bg-blue-100 text-black rounded-md border border-blue-300 text-xs whitespace-pre-wrap">
                      <h4 className="font-semibold text-sm text-blue-800 mb-2">✈️ Flight Results</h4>
                      {msg.metadata.booking_activities.flight_results}
                    </div>
                  )}

                  {/* 🌦️ Weather */}
                  {msg.metadata?.booking_activities?.weather_report && (
                    <div className="mt-4 p-3 bg-yellow-100 text-black rounded-md border border-yellow-300 text-xs whitespace-pre-wrap">
                      <h4 className="font-semibold text-sm text-yellow-800 mb-2">🌦️ Weather Report</h4>
                      {msg.metadata.booking_activities.weather_report}
                    </div>
                  )}

                  {/* ⏰ Reminder */}
                  {msg.metadata?.booking_activities?.reminder_details && (
                    <div className="mt-4 p-3 bg-purple-100 text-black rounded-md border border-purple-300 text-xs whitespace-pre-wrap">
                      <h4 className="font-semibold text-sm text-purple-800 mb-2">⏰ Reminder</h4>
                      {msg.metadata.booking_activities.reminder_details}
                    </div>
                  )}

                  {/* Time */}
                  {msg.timestamp && (
                    <div className="mt-1 text-[10px] text-gray-400 text-right">
                      {msg.timestamp}
                    </div>
                  )}
                </div>
                {isUser && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && <MessageLoading />}
        </div>
        

        {/* Input Bar (Disabled because it's read-only now) */}
        <div className="border-t py-4 bg-background">
          <form onSubmit={(e) => e.preventDefault()} className="px-4 flex items-center space-x-2 mb-12 sm:mb-0">
            <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type your message..." className="flex-1" disabled />
            <Button type="submit" disabled className="rounded-full w-10 h-10 p-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </ProtectedLayout>
  );
}
