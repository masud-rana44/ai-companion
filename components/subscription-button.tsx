"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscriptions" : "Upgrade"}
      {!isPro && <Sparkles className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
};
