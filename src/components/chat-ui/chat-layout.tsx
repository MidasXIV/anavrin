import { Button } from "components/ui/button";
import { ArrowUp, Square } from "lucide-react";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea
} from "components/ui/prompt-input";
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import useChat from "./hooks/useChat";
import { exampleMessages } from "./constants";
import { ChatLayoutProps } from "./types";
import { ChatContainer } from "../ui/chat-container";
import { RiskConfig } from "./components/RiskConfigFlyout";

const ChatLayout = ({ portfolioData }: ChatLayoutProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [riskConfig, setRiskConfig] = useState<RiskConfig>({
    riskTolerance: 5,
    investmentHorizon: "medium",
    investmentGoals: ["Growth"],
    preferredAssetTypes: ["Stocks", "Cryptocurrencies"]
  });

  const { messages, isLoading, messagesEndRef, handleSendMessage, totalTokens } = useChat(
    portfolioData,
    riskConfig
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      containerRef.current.style.maxHeight = `${height}px`;
    }
  }, []);

  const handleDownloadClick = () => {
    const text = messages.map(a => JSON.stringify(a)).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat.txt";
    link.click();
  };

  const handleSettingsClick = () => {
    setIsFlyoutOpen(true);
  };

  const handleConfigChange = (newConfig: RiskConfig) => {
    setRiskConfig(newConfig);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center font-chakra text-foreground">
      <div
        ref={containerRef}
        className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-muted shadow-lg"
      >
        <div className="flex h-full w-full flex-col bg-card">
          <div className="flex-none p-4">
            <ChatHeader
              totalTokens={totalTokens}
              onDownload={handleDownloadClick}
              onSettingsClick={handleSettingsClick}
              riskConfig={riskConfig}
              handleConfigChange={handleConfigChange}
            />
          </div>

          <ChatContainer className="flex-1 overflow-y-auto p-4">
            <div className="sm:max-w-2xl">
              <div className="mb-4 grid grid-cols-2 gap-2">
                {messages.length === 0 &&
                  exampleMessages.map((example, index) => (
                    <button
                      type="button"
                      key={`example-${example.heading}`}
                      className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                        index > 1 && "hidden md:block"
                      }`}
                      value={example.message}
                      onClick={() => handleSendMessage(example.message)}
                    >
                      <div className="text-sm font-semibold">{example.heading}</div>
                      <div className="text-sm text-zinc-600">{example.subheading}</div>
                    </button>
                  ))}
              </div>
            </div>
            <div className="grid gap-4 pr-3">
              {messages.map(message => (
                <ChatMessage
                  key={`message-${message.role}-${message.content.substring(0, 10)}`}
                  message={message}
                  index={messages.indexOf(message)}
                />
              ))}
              {isLoading ? (
                <div className="flex items-start justify-center gap-3">
                  <div className="animate-pulse rounded-xl bg-secondary px-3 py-2 text-secondary-foreground">
                    Thinking
                    <span className="ml-1 animate-pulse">.</span>
                    <span className="ml-1 animate-pulse">.</span>
                    <span className="ml-1 animate-pulse">.</span>
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>
          </ChatContainer>

          <div className="flex-none p-4">
            <PromptInput
              value={newMessage}
              onValueChange={setNewMessage}
              isLoading={isLoading}
              onSubmit={() => handleSendMessage(newMessage)}
              className="max-w-(--breakpoint-md) w-full"
            >
              <PromptInputTextarea placeholder="Ask me anything..." />
              <PromptInputActions className="justify-end pt-2">
                <PromptInputAction tooltip={isLoading ? "Stop generation" : "Send message"}>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleSendMessage(newMessage)}
                  >
                    {isLoading ? (
                      <Square className="size-5 fill-current" />
                    ) : (
                      <ArrowUp className="size-5" />
                    )}
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
