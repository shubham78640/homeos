// "use client";
// import React, { useState, useRef } from "react";
// import { Bot, User, Send, } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import ChatShimmer from "../../components/shimmerui/ChatShimmer";
// import ProtectedLayout from "../../components/ProtectedLayout";
// import { toast, Toaster } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import MessageLoading from "../../components/shimmerui/MessageLoading"
// export default function ConciergeChatPage() {
//  const apiUrl =  "https://pinch-lifestyle-manager-213643327387.us-central1.run.app/chat"

// const [messages, setMessages] = useState([]);
// const [inputMessage, setInputMessage] = useState("");
// const [isLoading, setIsLoading] = useState(false);
// const endRef = useRef(null);

// const {
//   currentUser,
//   loading: authLoading,
//   patronDetails,
//   patronDataLoading,
//   patronDataError,
// } = useAuth();

// // ✅ Get the Patron ID once outside the handler
// const displayedPatronId =
//   patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";
// const handleSendMessage = async (e) => {
//   e.preventDefault();
//   if (!inputMessage.trim()) return;

//   const userMsg = {
//     text: inputMessage,
//     isFromUser: true,
//   };

//   setMessages((prev) => [...prev, userMsg]);
//   setInputMessage("");
//   setIsLoading(true);

//   try {
//     const aiResponse = await callAIAPI(inputMessage, displayedPatronId);

//     const aiMsg = {
//       text: aiResponse.text,
//       isFromUser: false,
//       search_results: aiResponse.search_results || [],
//     };

//     setMessages((prev) => [...prev, aiMsg]);

//     setTimeout(() => {
//       endRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   } catch (err) {
//     console.error("❌ Error:", err);
//     toast.error("Failed to get AI response.");
//   } finally {
//     setIsLoading(false);
//   }
// };

// // const callAIAPI = async (userMessage, patronId) => {
// //   const response = await fetch(apiUrl, {
// //     method: "POST",
// //     headers: {
// //       accept: "application/json",
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       message: userMessage,
// //       checkpoint_id: patronId,
// //     }),
// //   });

// //   const data = await response.json();
// //   console.log("✅ API Raw Response:", data);

// //   return {
// //     text: data?.content || "I couldn’t understand that.",
// //     search_results: Array.isArray(data?.search_results)
// //       ? data.search_results
// //       : typeof data?.search_results === "string"
// //       ? data.search_results.split(",").map((url) => url.trim())
// //       : [],
// //   };
// // };

// const callAIAPI = async (userMessage, patronId) => {
//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: userMessage,
//       checkpoint_id: patronId,
//     }),
//   });

//   const data = await response.json();
//   console.log("✅ Full API Response:", data);

//   return {
//     text: data?.content || "I couldn’t understand that.",
//     search_results: Array.isArray(data?.search_results)
//       ? data.search_results
//       : typeof data?.search_results === "string"
//         ? data.search_results.split(",").map((url) => url.trim())
//         : [],
//     booking_activities: data?.booking_activities || {},
//     tools_used: data?.tools_used || [],
//     currentTime: data?.currentTime || "",
//   };
// };


//   return (
//     <ProtectedLayout>
//       <Toaster position="top-right" />
//       <div className="flex flex-col h-screen bg-background">
//         {/* Header */}
//         {/* <div className="border-b px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
//               <Bot className="w-5 h-5 text-muted-foreground" />
//             </div>
//             <div>
//               <h1 className="text-lg font-semibold text-foreground">Concierge Chat</h1>
//               <p className="text-sm text-muted-foreground">Powered by Pinch</p>
//             </div>
//           </div>
//         </div> */}
//          <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-muted-foreground" />
//               </div>
//               <div>
//                 <h1 className="text-lg font-semibold text-foreground">
//                   Concierge Chat
//                 </h1>
//                 <p className="text-sm text-muted-foreground">
//                  Powered by Pinch
//                 </p>
//               </div>
//             </div>
//             <Badge
//               variant="secondary"
//               className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//             >
//               Online
//             </Badge>
//           </div>
//         </div>

//         {/* Chat Body */}
//         <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
//           {/* {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex items-start space-x-3 ${
//                 msg.isFromUser ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!msg.isFromUser && (
//                 <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
//                   <Bot className="w-4 h-4 text-muted-foreground" />
//                 </div>
//               )}
//               <div
//                 className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${
//                   msg.isFromUser
//                     ? "bg-[#075E54] text-white rounded-br-md"
//                     : "bg-[#273443] text-white rounded-bl-md"
//                 }`}
//               >
//                 {msg.text}
//     {!msg.isFromUser && msg.search_results && msg.search_results.length > 0 && (
//   <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
//     <h4 className="text-sm font-semibold mb-2">🔍 Relevant Links:</h4>
//     <ul className="space-y-1 list-disc list-inside">
//       {msg.search_results.map((url, index) => (
//         <li key={index}>
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline break-all text-xs"
//           >
//             {url}
//           </a>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}
//               </div>
//               {msg.isFromUser && (
//                 <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//                   <User className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>
//           ))} */}

//           {messages.map((msg, index) => (
//   <div
//     key={index}
//     className={`flex items-start space-x-3 ${
//       msg.isFromUser ? "justify-end" : "justify-start"
//     }`}
//   >
//     {!msg.isFromUser && (
//       <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
//         <Bot className="w-4 h-4 text-muted-foreground" />
//       </div>
//     )}
//     <div
//       className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${
//         msg.isFromUser
//           ? "bg-[#075E54] text-white rounded-br-md"
//           : "bg-[#273443] text-white rounded-bl-md"
//       }`}
//     >
//       {/* TEXT MESSAGE */}
//       {msg.text && <div>{msg.text}</div>}

//       {/* RELEVANT LINKS */}
//       {!msg.isFromUser && msg.search_results?.length > 0 && (
//         <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
//           <h4 className="text-sm font-semibold mb-2">🔗 Relevant Links:</h4>
//           <ul className="space-y-1 list-disc list-inside text-xs">
//             {msg.search_results.map((url, index) => (
//               <li key={index}>
//                 <a
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline break-all"
//                 >
//                   {url}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* BOOKING ACTIVITIES */}
//       {!msg.isFromUser && msg.booking_activities && (
//         <>
//           {/* Hotel Results */}
//           {msg.booking_activities.hotel_results && (
//             <div className="mt-4 p-3 bg-green-100 text-black rounded-md border border-green-300 text-xs whitespace-pre-wrap">
//               <h4 className="font-semibold text-sm text-green-800 mb-2">
//                 🏨 Hotel Results
//               </h4>
//               {msg.booking_activities.hotel_results}
//             </div>
//           )}

//           {/* Flight Results */}
//           {msg.booking_activities.flight_results && (
//             <div className="mt-4 p-3 bg-blue-100 text-black rounded-md border border-blue-300 text-xs whitespace-pre-wrap">
//               <h4 className="font-semibold text-sm text-blue-800 mb-2">
//                 ✈️ Flight Results
//               </h4>
//               {msg.booking_activities.flight_results}
//             </div>
//           )}

//           {/* Add More Like Reminders / Weather */}
//           {msg.booking_activities.weather_report && (
//             <div className="mt-4 p-3 bg-yellow-100 text-black rounded-md border border-yellow-300 text-xs whitespace-pre-wrap">
//               <h4 className="font-semibold text-sm text-yellow-800 mb-2">
//                 🌦️ Weather Report
//               </h4>
//               {msg.booking_activities.weather_report}
//             </div>
//           )}

//           {msg.booking_activities.reminder_details && (
//             <div className="mt-4 p-3 bg-purple-100 text-black rounded-md border border-purple-300 text-xs whitespace-pre-wrap">
//               <h4 className="font-semibold text-sm text-purple-800 mb-2">
//                 ⏰ Reminder
//               </h4>
//               {msg.booking_activities.reminder_details}
//             </div>
//           )}
//         </>
//       )}

//       {/* TOOLS USED */}
//       {!msg.isFromUser && msg.tools_used?.length > 0 && (
//         <div className="mt-3 text-[10px] text-gray-400 italic">
//           Tools Used: {msg.tools_used.join(", ")}
//         </div>
//       )}

//       {/* TIMESTAMP */}
//       {!msg.isFromUser && msg.currentTime && (
//         <div className="mt-1 text-[10px] text-gray-400 text-right">
//           {msg.currentTime}
//         </div>
//       )}
//     </div>

//     {msg.isFromUser && (
//       <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
//         <User className="w-4 h-4 text-white" />
//       </div>
//     )}
//   </div>
// ))}

//           {isLoading && 
//        <MessageLoading/>
//           }
//           <div ref={endRef}></div>
//         </div>

//         {/* Input Area */}
//         <div className="border-t py-4 bg-background">
//           <form onSubmit={handleSendMessage} className="px-4 flex items-center space-x-2 mb-12 sm:mb-0">
//             <Input
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//               disabled={isLoading}
//             />
//             <Button
//               type="submit"
//               disabled={!inputMessage.trim() || isLoading}
//               className="rounded-full w-10 h-10 p-0"
//             >
//               <Send className="w-4 h-4" />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </ProtectedLayout>
//   );
// }


//"use client";

// import React, { useState, useRef } from "react";
// import { Bot, User, Send } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import ChatShimmer from "../../components/shimmerui/ChatShimmer";
// import ProtectedLayout from "../../components/ProtectedLayout";
// import { toast, Toaster } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import MessageLoading from "../../components/shimmerui/MessageLoading";

// export default function ConciergeChatPage() {
//   //const apiUrl = "URL"; 
//  const apiUrl =  "https://pinchmanager-213643327387.us-central1.run.app/chat"
//  //"https://pinch-lifestyle-manager-213643327387.us-central1.run.app/chat"
                 

//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const endRef = useRef(null);

//   const {
//     currentUser,
//     loading: authLoading,
//     patronDetails,
//     patronDataLoading,
//     patronDataError,
//   } = useAuth();

//   const displayedPatronId =
//     patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     const userMsg = {
//       text: inputMessage,
//       isFromUser: true,
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInputMessage("");
//     setIsLoading(true);

//     try {
//       const aiResponse = await callAIAPI(inputMessage, displayedPatronId);

//       const aiMsg = {
//         text: aiResponse.text,
//         isFromUser: false,
//         search_results: aiResponse.search_results || [],
//         booking_activities: aiResponse.booking_activities || {},
//         tools_used: aiResponse.tools_used || [],
//         currentTime: aiResponse.currentTime || "",
//       };

//       setMessages((prev) => [...prev, aiMsg]);

//       setTimeout(() => {
//         endRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } catch (err) {
//       console.error("❌ Error:", err);
//       toast.error("Failed to get AI response.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const callAIAPI = async (userMessage, patronId) => {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: userMessage,
//         checkpoint_id: patronId,
//       }),
//     });

//     const data = await response.json();
//     console.log("✅ Full API Response:", data);

//     return {
//       text: data?.content || "I couldn’t understand that.",
//       search_results: Array.isArray(data?.search_results)
//         ? data.search_results
//         : typeof data?.search_results === "string"
//         ? data.search_results.split(",").map((url) => url.trim())
//         : [],
//       booking_activities: data?.booking_activities || {},
//       tools_used: data?.tools_used || [],
//       currentTime: data?.currentTime || "",
//     };
//   };

//   return (
//     <ProtectedLayout>
//       <Toaster position="top-right" />
//       <div className="flex flex-col h-screen bg-background">
//         {/* Header */}
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

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex items-start space-x-3 ${msg.isFromUser ? "justify-end" : "justify-start"}`}>
//               {!msg.isFromUser && (
//                 <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
//                   <Bot className="w-4 h-4 text-muted-foreground" />
//                 </div>
//               )}
//               <div className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${msg.isFromUser ? "bg-[#075E54] text-white rounded-br-md" : "bg-[#273443] text-white rounded-bl-md"}`}>
//                 {msg.text && <div>{msg.text}</div>}

//                 {!msg.isFromUser && msg.search_results?.length > 0 && (
//                   <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
//                     <h4 className="text-sm font-semibold mb-2">🔗 Relevant Links:</h4>
//                     <ul className="space-y-1 list-disc list-inside text-xs">
//                       {msg.search_results.map((url, idx) => (
//                         <li key={idx}>
//                           <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
//                             {url}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Flight Results */}
//                 {msg.booking_activities?.flight_results && (
//                   <div className="mt-4 p-3 bg-blue-100 text-black rounded-md border border-blue-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-blue-800 mb-2">✈️ Flight Results</h4>
//                     {msg.booking_activities.flight_results}
//                   </div>
//                 )}

//                 {/* Hotel Results */}
//                 {msg.booking_activities?.hotel_results && (
//                   <div className="mt-4 p-3 bg-green-100 text-black rounded-md border border-green-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-green-800 mb-2">🏨 Hotel Results</h4>
//                     {msg.booking_activities.hotel_results}
//                   </div>
//                 )}

//                 {/* Reminder */}
//                 {msg.tools_used?.includes("create_reminder") && (
//                   <div className="mt-4 p-3 bg-purple-100 text-black rounded-md border border-purple-300 text-xs whitespace-pre-wrap">
//                     <h4 className="font-semibold text-sm text-purple-800 mb-2">⏰ Reminder Created</h4>
//                     {msg.text}
//                   </div>
//                 )}

//                 {/* Time */}
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

//         {/* Input */}
//         <div className="border-t py-4 bg-background">
//           <form onSubmit={handleSendMessage} className="px-4 flex items-center space-x-2 mb-12 sm:mb-0">
//             <Input
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//               disabled={isLoading}
//             />
//             <Button
//               type="submit"
//               disabled={!inputMessage.trim() || isLoading}
//               className="rounded-full w-10 h-10 p-0"
//             >
//               <Send className="w-4 h-4" />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </ProtectedLayout>
//   );
// }

// "use client";

// import React, { useState, useRef } from "react";
// import { Bot, User, Send } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import ProtectedLayout from "../../components/ProtectedLayout";
// import { toast, Toaster } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import MessageLoading from "../../components/shimmerui/MessageLoading";

// export default function ConciergeChatPage() {
// //  const apiUrl = "URL";
//    const apiUrl =  "https://pinchmanager-213643327387.us-central1.run.app/chat"
 

//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [expandedMessages, setExpandedMessages] = useState({});
//   const endRef = useRef(null);

//   const {
//     currentUser,
//     loading: authLoading,
//     patronDetails,
//     patronDataLoading,
//     patronDataError,
//   } = useAuth();

//   const displayedPatronId =
//     patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     const userMsg = {
//       text: inputMessage,
//       isFromUser: true,
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInputMessage("");
//     setIsLoading(true);

//     try {
//       const aiResponse = await callAIAPI(inputMessage, displayedPatronId);

//       const aiMsg = {
//         text: aiResponse.text,
//         isFromUser: false,
//         search_results: aiResponse.search_results || [],
//         booking_activities: aiResponse.booking_activities || {},
//         tools_used: aiResponse.tools_used || [],
//         currentTime: aiResponse.currentTime || "",
//       };

//       setMessages((prev) => [...prev, aiMsg]);

//       setTimeout(() => {
//         endRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     } catch (err) {
//       console.error("❌ Error:", err);
//       toast.error("Failed to get AI response.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const callAIAPI = async (userMessage, patronId) => {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: userMessage,
//         checkpoint_id: patronId,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("API call failed");
//     }

//     const data = await response.json();
//     console.log("✅ Full API Response:", data);

//     return {
//       text: data?.content || "I couldn’t understand that.",
//       search_results: Array.isArray(data?.search_results)
//         ? data.search_results
//         : typeof data?.search_results === "string"
//         ? data.search_results.split(",").map((url) => url.trim())
//         : [],
//       booking_activities: data?.booking_activities || {},
//       tools_used: data?.tools_used || [],
//       currentTime: data?.currentTime || "",
//     };
//   };

//   const renderFormattedText = (text, index) => {
//     const isExpanded = expandedMessages[index];
//     const formatted = text
//       .split("\n")
//       .map((line, i) => {
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
//                 {!msg.isFromUser && msg.text.split("\n").length > 4 && (
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
//                       {msg.search_results.map((url, idx) => (
//                         <li key={idx}>
//                           <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
//                             {url}
//                           </a>
//                         </li>
//                       ))}
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
//           <form onSubmit={handleSendMessage} className="px-4 flex items-center space-x-2 mb-12 sm:mb-0">
//             <Input
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//               disabled={isLoading}
//             />
//             <Button
//               type="submit"
//               disabled={!inputMessage.trim() || isLoading}
//               className="rounded-full w-10 h-10 p-0"
//             >
//               <Send className="w-4 h-4" />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </ProtectedLayout>
//   );
// }


"use client";

import React, { useState, useRef } from "react";
import { Bot, User, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProtectedLayout from "../../components/ProtectedLayout";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import MessageLoading from "../../components/shimmerui/MessageLoading";

export default function ConciergeChatPage() {
  const apiUrl =  "https://pinchmanager-213643327387.us-central1.run.app/chat"
 

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState({});
  const endRef = useRef(null);

  const {
    currentUser,
    loading: authLoading,
    patronDetails,
    patronDataLoading,
    patronDataError,
  } = useAuth();

  const displayedPatronId =
    patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      text: inputMessage,
      isFromUser: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await callAIAPI(inputMessage, displayedPatronId);

      const aiMsg = {
        text: aiResponse.text,
        isFromUser: false,
        search_results: aiResponse.search_results || [],
        booking_activities: aiResponse.booking_activities || {},
        tools_used: aiResponse.tools_used || [],
        currentTime: aiResponse.currentTime || "",
      };

      setMessages((prev) => [...prev, aiMsg]);

      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Failed to get AI response.");
    } finally {
      setIsLoading(false);
    }
  };

  const callAIAPI = async (userMessage, patronId) => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        checkpoint_id: patronId,
      }),
    });

    if (!response.ok) {
      throw new Error("API call failed");
    }

    const data = await response.json();
    console.log("✅ Full API Response:", data);

    return {
      text: data?.content || "I couldn’t understand that.",
      search_results: Array.isArray(data?.search_results)
        ? data.search_results.map((r) => (typeof r === "string" ? r : r.url))
        : typeof data?.search_results === "string"
        ? data.search_results.split(",").map((url) => url.trim())
        : [],
      booking_activities: data?.booking_activities || {},
      tools_used: data?.tools_used || [],
      currentTime: data?.currentTime || "",
    };
  };

  const renderFormattedText = (text, index) => {
    const isExpanded = expandedMessages[index];
    const formatted = text
      .split("\n")
      .map((line, i) => {
        const bolded = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return `<p>${bolded}</p>`;
      })
      .join("");

    const short = formatted.split("</p>").slice(0, 4).join("</p>") + "</p>";

    return (
      <div
        className="text-white text-sm"
        dangerouslySetInnerHTML={{ __html: isExpanded ? formatted : short }}
      />
    );
  };

  return (
    <ProtectedLayout>
      <Toaster position="top-right" />
      <div className="flex flex-col h-screen bg-background">
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

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start space-x-3 ${msg.isFromUser ? "justify-end" : "justify-start"}`}>
              {!msg.isFromUser && (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <div className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${msg.isFromUser ? "bg-[#075E54] text-white rounded-br-md" : "bg-[#273443] text-white rounded-bl-md"}`}>
                {msg.text && renderFormattedText(msg.text, index)}
                {!msg.isFromUser && msg.text.split("\n").length > 4 && (
                  <button
                    className="text-xs mt-2 underline text-gray-300"
                    onClick={() =>
                      setExpandedMessages((prev) => ({ ...prev, [index]: !prev[index] }))
                    }
                  >
                    {expandedMessages[index] ? "Read less" : "Read more"}
                  </button>
                )}

                {msg.search_results?.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
                    <h4 className="text-sm font-semibold mb-2">🔗 Relevant Links:</h4>
                    <ul className="space-y-1 list-disc list-inside text-xs">
                      {msg.search_results.map((url, idx) => (
                        <li key={idx}>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {msg.booking_activities?.flight_results && (
                  <div className="mt-4 p-3 bg-blue-100 text-black rounded-md border border-blue-300 text-xs whitespace-pre-wrap">
                    <h4 className="font-semibold text-sm text-blue-800 mb-2">✈️ Flight Results</h4>
                    {msg.booking_activities.flight_results}
                  </div>
                )}

                {msg.booking_activities?.hotel_results && (
                  <div className="mt-4 p-3 bg-green-100 text-black rounded-md border border-green-300 text-xs whitespace-pre-wrap">
                    <h4 className="font-semibold text-sm text-green-800 mb-2">🏨 Hotel Results</h4>
                    {msg.booking_activities.hotel_results}
                  </div>
                )}

                {msg.booking_activities?.weather_report && (
                  <div className="mt-4 p-3 bg-yellow-100 text-black rounded-md border border-yellow-300 text-xs whitespace-pre-wrap">
                    <h4 className="font-semibold text-sm text-yellow-800 mb-2">🌦️ Weather Report</h4>
                    {msg.booking_activities.weather_report}
                  </div>
                )}

                {msg.booking_activities?.reminder_details && (
                  <div className="mt-4 p-3 bg-purple-100 text-black rounded-md border border-purple-300 text-xs whitespace-pre-wrap">
                    <h4 className="font-semibold text-sm text-purple-800 mb-2">⏰ Reminder</h4>
                    {msg.booking_activities.reminder_details}
                  </div>
                )}

                {msg.currentTime && (
                  <div className="mt-1 text-[10px] text-gray-400 text-right">
                    {msg.currentTime}
                  </div>
                )}
              </div>
              {msg.isFromUser && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && <MessageLoading />}
          <div ref={endRef}></div>
        </div>

        <div className="border-t py-4 bg-background">
          <form onSubmit={handleSendMessage} className="px-4 flex items-center space-x-2 mb-12 sm:mb-0">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="rounded-full w-10 h-10 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </ProtectedLayout>
  );
}