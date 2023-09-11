import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      companionId: string;
    };
  },
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse("Companion ID required", { status: 400 });
    }

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

    const companion = await db.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
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
    console.log("[COMPANION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { companionId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await db.companion.delete({
      where: {
        id: params.companionId,
        userId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
