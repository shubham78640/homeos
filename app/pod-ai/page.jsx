"use client";
import React, { useState, useRef } from "react";
import { Bot, User, Send, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatShimmer from "../../components/shimmerui/ChatShimmer";
import ProtectedLayout from "../../components/ProtectedLayout";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import MessageLoading from "../../components/shimmerui/MessageLoading"
export default function ConciergeChatPage() {
 const apiUrl =  "https://pinch-lifestyle-manager-213643327387.us-central1.run.app/chat"

const [messages, setMessages] = useState([]);
const [inputMessage, setInputMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);
const endRef = useRef(null);

const {
  currentUser,
  loading: authLoading,
  patronDetails,
  patronDataLoading,
  patronDataError,
} = useAuth();

// ✅ Get the Patron ID once outside the handler
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

  const data = await response.json();
  console.log("✅ API Raw Response:", data);

  return {
    text: data?.content || "I couldn’t understand that.",
    search_results: Array.isArray(data?.search_results)
      ? data.search_results
      : typeof data?.search_results === "string"
      ? data.search_results.split(",").map((url) => url.trim())
      : [],
  };
};


  return (
    <ProtectedLayout>
      <Toaster position="top-right" />
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        {/* <div className="border-b px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Concierge Chat</h1>
              <p className="text-sm text-muted-foreground">Powered by Pinch</p>
            </div>
          </div>
        </div> */}
         <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Concierge Chat
                </h1>
                <p className="text-sm text-muted-foreground">
                 Powered by Pinch
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              Online
            </Badge>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                msg.isFromUser ? "justify-end" : "justify-start"
              }`}
            >
              {!msg.isFromUser && (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <div
                className={`max-w-md px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap break-words ${
                  msg.isFromUser
                    ? "bg-[#075E54] text-white rounded-br-md"
                    : "bg-[#273443] text-white rounded-bl-md"
                }`}
              >
                {msg.text}
    {!msg.isFromUser && msg.search_results && msg.search_results.length > 0 && (
  <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl shadow border border-blue-200">
    <h4 className="text-sm font-semibold mb-2">🔍 Relevant Links:</h4>
    <ul className="space-y-1 list-disc list-inside">
      {msg.search_results.map((url, index) => (
        <li key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all text-xs"
          >
            {url}
          </a>
        </li>
      ))}
    </ul>
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
          {isLoading && 
       <MessageLoading/>
          }
          <div ref={endRef}></div>
        </div>

        {/* Input Area */}
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
