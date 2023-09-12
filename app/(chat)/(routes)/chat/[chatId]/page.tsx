import db from "@/lib/db";
import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import { ChatClient } from "./components/client";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await db.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
