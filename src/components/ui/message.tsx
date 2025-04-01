import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

import { Markdown } from "./markdown";

export type MessageProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

const Message = ({ children, className, ...props }: MessageProps) => (
  <div className={cn("flex gap-3", className)} {...props}>
    {children}
  </div>
);

export type MessageAvatarProps = {
  src: string;
  alt: string;
  fallback?: string;
  delayMs?: number;
  className?: string;
};

const MessageAvatar = ({ src, alt, fallback, delayMs, className }: MessageAvatarProps) => (
  <Avatar className={cn("h-8 w-8 shrink-0", className)}>
    <AvatarImage src={src} alt={alt} />
    {fallback && <AvatarFallback delayMs={delayMs}>{fallback}</AvatarFallback>}
  </Avatar>
);

export type MessageContentProps = {
  children: React.ReactNode;
  markdown?: boolean;
  className?: string;
} & React.ComponentProps<typeof Markdown> &
  React.HTMLProps<HTMLDivElement>;

const MessageContent = ({
  children,
  markdown = false,
  className,
  ...props
}: MessageContentProps) => {
  const classNames = cn(
    "rounded-lg p-2 text-foreground bg-secondary prose break-words whitespace-normal",
    className
  );

  return markdown ? (
    <Markdown className={classNames} {...props}>
      {children as string}
    </Markdown>
  ) : (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export type MessageActionsProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

const MessageActions = ({ children, className, ...props }: MessageActionsProps) => (
  <div className={cn("flex items-center gap-2 text-muted-foreground", className)} {...props}>
    {children}
  </div>
);

export type MessageActionProps = {
  className?: string;
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
} & React.ComponentProps<typeof Tooltip>;

const MessageAction = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}: MessageActionProps) => (
  <TooltipProvider>
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export { Message, MessageAvatar, MessageContent, MessageActions, MessageAction };
