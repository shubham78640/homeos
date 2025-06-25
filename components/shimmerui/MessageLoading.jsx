// components/MessageLoading.jsx
import { Bot } from "lucide-react";

export default function MessageLoading() {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div className="bg-muted text-foreground max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
