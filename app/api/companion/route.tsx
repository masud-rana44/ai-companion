import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";
// import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !src ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // const isPro = await checkSubscription();

    // if (!isPro) {
    //   return new NextResponse("Pro subscription required", { status: 403 });
    // }

    const companion = await db.companion.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
        categoryId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("COMPANION_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
