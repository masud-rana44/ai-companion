"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ProModal = () => {
  const { toast } = useToast();
  const { isOpen, onClose } = useProModal();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="space-y-2 text-center">
            Create <span className="font-medium text-sky-500">Custom AI</span>{" "}
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium">
            $9<span className="text-sm font-normal">.99 / mo</span>
          </p>
          <Button onClick={onSubscribe} disabled={isLoading} variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
