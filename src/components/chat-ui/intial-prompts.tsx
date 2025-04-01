import { useActions, useUIState } from "ai/rsc";
import React, { useState } from "react";
import { generateId } from "ai";
import { cn } from "@/utils/index";
import { UserMessage } from "./chat-ui";

const examplePrompts = [
  {
    heading: "Number of companies founded over time. Area chart",
    subheading: "",
    message: `Number of companies founded over time. Area chart`
  },
  {
    heading: "Distribution of companies by status (e.g., active, acquired).? Donut chart",
    subheading: "",
    message: "Show me Distribution of companies by status (e.g., active, acquired).? Donut chart"
  },
  {
    heading: "Give me Trend of team sizes over years as line chart",
    subheading: "",
    message: "Give me Trend of team sizes over years as line chart"
  },
  {
    heading: "Distribution of companies by status (e.g., active, acquired).? Donut chart",
    subheading: "",
    message: "Show me Team size of each company, listed as 'barlist' chart !"
  }
];

export default function InitialPrompts() {
  // const [messages, setMessages] = useUIState<any>();
  const [messages, setMessages] = useState<any>([]);
  // const { submitUserMessage } = useActions();

  return (
    <div className="mb-4 mt-4 grid gap-2 rounded-lg px-4 text-[#D4D4D4] sm:gap-4 sm:px-0 md:grid-cols-1">
      <h2 className="text-center text-lg font-medium text-[#D4D4D4]">Examples</h2>
      {messages.length === 0 &&
        examplePrompts.map((example, index) => (
          <div
            key={example.heading}
            className={cn(
              "cursor-pointer rounded-2xl border border-gray-600 bg-[#30302d] p-4 text-sm text-[#D4D4D4] transition-colors hover:bg-white/25 sm:p-4",
              index > 1 && "hidden md:block"
            )}
            onClick={async () => {
              setMessages(currentMessages => [
                ...currentMessages,
                {
                  id: generateId(),
                  display: <UserMessage>{example.message}</UserMessage>
                }
              ]);

              try {
                const responseMessage = undefined;
                // const responseMessage = await submitUserMessage(
                //   example.message
                // );

                setMessages(currentMessages => [...currentMessages, responseMessage]);
              } catch {
                console.error("Failed to submit message");
              }
            }}
          >
            <div className="font-medium">{example.heading}</div>
          </div>
        ))}
      <h2 className="text-center text-lg font-medium text-[#D4D4D4]">Check an existing chat</h2>
      <div
        className={cn(
          "cursor-pointer rounded-2xl border border-gray-600 bg-[#30302d] p-4 text-sm text-[#D4D4D4] transition-colors hover:bg-white/25 sm:p-4"
        )}
        onClick={async () => {
          window.location.href = "/chat/NQFtTkt";
        }}
      >
        <div className="font-medium">Insights on YC companies</div>
      </div>
    </div>
  );
}
