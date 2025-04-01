"use client";

import { Message, generateId } from "ai";
import { useActions, useUIState } from "ai/rsc";
// import { SendHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useEnterSubmit } from "hooks/use-enter-submit";
import { useLocalStorage } from "hooks/use-local-storage";
import { cn } from "@/utils/index";
import { Button } from "../ui/button";
import { ChatMessages } from "./chat-messages";
import { UserMessage } from "./chat-ui";
import InitialPrompts from "./intial-prompts";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  isShared?: boolean;
}

export function ChatBar({ id, isShared }: ChatProps) {
  const [input, setInput] = useState("");
  // const { submitUserMessage } = useActions();
  // const [messages, setMessages] = useUIState<any>();
  const [messages, setMessages] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { formRef, onKeyDown } = useEnterSubmit();
  const [_, setNewChatId] = useLocalStorage("newChatId", id);
  const path = usePathname();
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    if (!path.includes("chat") && messages.length === 1) {
      window.history.replaceState({}, "", `/chat/${id}`);
    }
  }, [id, path, messages]);

  useEffect(() => {
    setNewChatId(id);
  });

  useEffect(() => {
    if (path.includes("chat") && messages.length >= 14) {
      setIsInputDisabled(true);
      // Show a toast message
      toast("You have reached the maximum message length of 12.", {
        description: "Please start a new chat to continue.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo")
        }
      });
    }
  }, [id, path, messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        if (e.target && ["INPUT", "TEXTAREA"].includes((e.target as any).nodeName)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mx-auto flex max-w-3xl flex-col space-y-3 overflow-y-auto px-8 pb-32 pt-20 md:space-y-6 md:px-12 md:pb-40 md:pt-16">
          <ChatMessages isShared={isShared} />
          {!isShared && (
            <div
              className={cn(
                messages.length === 0
                  ? "fixed bottom-1 left-0 right-0 top-10 mx-auto flex h-screen flex-col items-center justify-center"
                  : "fixed bottom-10 left-0 right-0 z-10 mx-auto flex w-full items-center justify-center bg-[#2b2b27] pt-2 md:bottom-12"
              )}
            >
              <form
                ref={formRef}
                onSubmit={async e => {
                  e.preventDefault();
                  const value = input.trim();
                  setInput("");
                  if (!value) return;
                  // setMessages((currentMessages) => [
                  //   ...currentMessages,
                  //   {
                  //     id: generateId(),
                  //     display: <UserMessage>{value}</UserMessage>,
                  //   },
                  // ]);
                  try {
                    // const responseMessage = await submitUserMessage(value);
                    const responseMessage = undefined;

                    // setMessages((currentMessages) => [
                    //   ...currentMessages,
                    //   responseMessage,
                    // ]);
                  } catch (error) {
                    console.error(error);
                  }
                }}
                className="w-full max-w-2xl px-2"
              >
                <div className="relative flex w-full items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    name="input"
                    autoComplete="off"
                    autoCorrect="off"
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        formRef.current?.requestSubmit();
                      }
                    }}
                    placeholder="Ask a question..."
                    autoFocus={!isShared}
                    value={input}
                    className="h-14 w-full rounded-full border-none bg-[#393937] pl-6 pr-10 text-[#D4D4D4] shadow-lg outline-none backdrop-blur-lg focus-within:outline-none focus:ring-0"
                    onChange={e => {
                      setInput(e.target.value);
                    }}
                    disabled={isInputDisabled || isShared}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    variant="default"
                    className={cn(
                      `absolute right-5 top-1/2 flex h-8 w-20 -translate-y-1/2 transform items-center justify-center rounded-xl bg-[#ae5630] text-white outline-0 ring-0 hover:bg-white/25 focus:bg-white/25  dark:text-black`,
                      input ? "w-10 px-0" : "px-4"
                    )}
                    disabled={input.length === 0 || isInputDisabled || isShared}
                  >
                    {!input ? <span className="mr-1 text-sm">Chat</span> : null}
                    <div>{/* <SendHorizontal className="text-white h-3 w-3" /> */}</div>
                  </Button>
                </div>
              </form>
              {messages.length === 0 && (
                <div className="mt-4 w-full max-w-xl px-2">
                  {" "}
                  <InitialPrompts />
                </div>
              )}
            </div>
          )}
        </div>
      </Suspense>
    </>
  );
}
