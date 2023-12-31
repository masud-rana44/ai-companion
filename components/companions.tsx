"use client";

import { Companion } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface CompanionsProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionsProps) => {
  const [companions, setCompanions] = useState(data);
  const searchParams = useSearchParams();
  const searchedText = searchParams.get("name");

  useEffect(() => {
    if (searchedText) {
      const searchedCompanions = data.filter(
        (comp) =>
          comp.name
            .toLocaleLowerCase()
            .includes(searchedText.toLocaleLowerCase()) ||
          comp.description
            .toLocaleLowerCase()
            .includes(searchedText.toLocaleLowerCase()),
      );
      setCompanions(searchedCompanions);
    } else {
      setCompanions(data);
    }
  }, [searchedText, data]);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 pt-10">
        <div className="relative h-60 w-60">
          <Image className="grayscale" fill src="/empty.png" alt="Empty" />
        </div>
        <p className="text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 border-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {companions.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer rounded-xl border-0 bg-primary/10 transition hover:opacity-75"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative h-32 w-32">
                <Image
                  fill
                  src={item.src}
                  alt="Character"
                  className="rounded-xl object-cover"
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{item.userName}</p>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-3 w-3" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
