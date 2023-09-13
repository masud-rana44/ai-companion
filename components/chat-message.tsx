"use client";

import { Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";

import { BotAvatar } from "@/components/bot-avater";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export const ChatMessage = ({
  content,
  role,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  // const [ isCopied, setIsCopied ] = useState(false);

  const onCopy = () => {
    if (!content) return;

    // setIsCopied(true);
    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard.",
      duration: 3000,
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full items-start gap-x-3 py-4",
        role === "user" && "justify-end",
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div
        className={cn(
          "max-w-sm rounded-md bg-primary/10 px-4 py-2 text-sm",
          role === "user" && "bg-[#cbd5e1] dark:bg-[#006AFF]",
        )}
      >
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : content ? (
          content
        ) : (
          "Ohh! I can't understand you properly"
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 transition group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
