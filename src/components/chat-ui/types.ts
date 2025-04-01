export interface Message {
  role: "user" | "system" | "error";
  content: string;
}

export interface ExampleMessage {
  heading: string;
  subheading: string;
  message: string;
}

export interface ChatLayoutProps {
  portfolioData: any; // TODO: Define proper portfolio type
}

export interface IconProps extends React.ComponentProps<"svg"> {
  className?: string;
} 