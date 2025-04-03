import { Button } from "components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "components/ui/hover-card";
import { cn } from "utils";
import { Undo2 } from "lucide-react";
import { MessageContent } from "@/components/ui/message";
import { Message } from "../types";

interface ChatMessageProps {
  message: Message;
  onUndo?: () => void;
}

const ChatMessage = ({ message, onUndo }: ChatMessageProps) => {
  const getMessageStyles = (role: Message["role"]) => {
    switch (role) {
      case "user":
        return "bg-primary text-primary-foreground justify-end";
      case "assistant":
        return "bg-muted justify-start";
      case "error":
        return "bg-destructive text-destructive-foreground justify-start";
      default:
        return "bg-muted";
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "group relative flex items-start gap-2 rounded-lg px-3 py-2 text-sm",
            getMessageStyles(message.role),
            "bg-transparent"
          )}
        >
          <div className="space-y-2">
            {/* <div className="prose prose-sm dark:prose-invert">
              <p className="text-sm">{message.content}</p>
            </div> */}
            <MessageContent
              className={cn(
                "prose prose-sm dark:prose-invert flex w-fit",
                getMessageStyles(message.role)
              )}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {message.content}
            </MessageContent>
            {message.usage && (
              <div className="mt-2 flex items-center gap-2 px-2 text-xs text-muted-foreground">
                <span>Tokens: {message.usage.total_tokens.toLocaleString()}</span>
                <span>•</span>
                <span>Prompt: {message.usage.prompt_tokens.toLocaleString()}</span>
                <span>•</span>
                <span>Completion: {message.usage.completion_tokens.toLocaleString()}</span>
              </div>
            )}
          </div>
          {onUndo && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={onUndo}
            >
              <Undo2 className="h-4 w-4" />
              <span className="sr-only">Undo message</span>
            </Button>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Message Details</h4>
            <p className="text-sm text-muted-foreground">{message.timestamp?.toLocaleString()}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChatMessage;
