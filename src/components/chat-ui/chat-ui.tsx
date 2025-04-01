"use client";

/* eslint-disable @next/next/no-img-element */

import { StreamableValue } from "ai/rsc";
// import { IconCloudflare, IconGemini, IconUser } from "./ui/icons";
import { useStreamableText } from "hooks/use-streamable-text";
import { cn } from "@/utils/index";
import { spinner } from "../loading/spinner";

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative ml-1 flex items-start md:-ml-11">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg shadow-sm">
        {/* <IconUser /> */}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">{children}</div>
    </div>
  );
}

export function BotMessage({
  content,
  className
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <div className="bg-tranparent flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md shadow-sm">
        {/* <IconCloudflare className="text-orange-600 h-6 w-6" /> */}
      </div>
      <div className="ml-4 flex-1 rounded-2xl border-gray-500 bg-[#30302d] p-4 px-4 shadow-sm backdrop-blur-lg">
        {text}
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "bg-tranparent flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md shadow-sm",
          !showAvatar && "invisible"
        )}
      >
        {/* <IconCloudflare className="text-orange-600 h-6 w-6" /> */}
      </div>
      <div className="ml-4 flex-1 rounded-2xl border-gray-500 bg-[#30302d] p-4 px-4 shadow-sm backdrop-blur-lg">
        {children}
      </div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
      <div className="max-w-[600px] flex-initial p-2">{children}</div>
    </div>
  );
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border bg-background shadow-sm">
        <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
      </div>
      <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}
