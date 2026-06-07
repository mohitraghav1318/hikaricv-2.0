import { auth } from "@/server/auth/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(resumes);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const { title, targetRole } = body;

  const resume = await prisma.resume.create({
  data: {
    title,
    targetRole,
    userId: session.user.id!,
  },

  
}
)
if (!title || !targetRole) {
  return NextResponse.json(
    { error: "Title and target role are required" },
    { status: 400 }
  );
}
;

return NextResponse.json(resume);
}