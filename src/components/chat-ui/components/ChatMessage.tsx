import { MessageContent } from "components/ui/message";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "components/ui/hover-card";
import { Button } from "components/ui/button";
import { Message } from "../types";
import { ResetIcon } from "../icons";

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const getMessageStyle = () => {
    if (message.role === "user") return "justify-end bg-primary";
    if (message.role === "error") return "bg-red-500 text-white";
    return "bg-secondary";
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          className={`flex items-start gap-3 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <MessageContent
            className={`rounded-xl px-3 py-2 ${getMessageStyle()} text-${
              message.role === "user" ? "primary" : "secondary"
            }-foreground`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {message.content}
          </MessageContent>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit p-1">
        <Button variant="ghost" size="icon">
          <ResetIcon className="h-4 w-4" />
          <span className="sr-only">undo</span>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChatMessage;
