"use client";

import { useUIState } from "ai/rsc";
import { useEffect, useRef, useState } from "react";

export interface ChatMessages {
  // messages: UIState;
  isShared?: boolean;
}

export function ChatMessages({ isShared }: ChatMessages) {
  // const [messages] = useUIState<any>();
  const [messages] = useState<any>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.length
        ? messages.map((message) => (
            <div key={message.id} className="text-white/80 gap-2">
              {message.spinner}
              {message.display}
              {message.attachments}
            </div>
          ))
        : null}
      {!isShared && <div ref={messagesEndRef} />}
    </>
  );
}