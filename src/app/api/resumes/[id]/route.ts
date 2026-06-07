import { auth } from "@/server/auth/auth";
import { prisma } from "@/server/db/prisma";
import { NextResponse } from "next/server";


//  Get resume
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
const session = await auth();

if (!session?.user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const { id } = await params;

const resume = await prisma.resume.findUnique({
  where: {
    id,
  },
});

if (!resume) {
  return NextResponse.json(
    { error: "Resume not found" },
    { status: 404 }
  );
}

if (resume.userId !== session.user.id) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}

return NextResponse.json(resume);

}

// Upadte resume
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
const session = await auth();

if (!session?.user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const { id } = await params;

const resume = await prisma.resume.findUnique({
  where: {
    id,
  },
});

if (!resume) {
  return NextResponse.json(
    { error: "Resume not found" },
    { status: 404 }
  );
}

if (resume.userId !== session.user.id) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}

const body = await request.json();

const { title, targetRole, summary } = body;

const updatedResume = await prisma.resume.update({
  where: {
    id,
  },
  data: {
    title,
    targetRole,
    summary,
  },
});

return NextResponse.json(updatedResume);

}

// delete resume 
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

const session = await auth();

if (!session?.user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const { id } = await params;

const resume = await prisma.resume.findUnique({
  where: {
    id,
  },
});

if (!resume) {
  return NextResponse.json(
    { error: "Resume not found" },
    { status: 404 }
  );
}

if (resume.userId !== session.user.id) {
  return NextResponse.json(
    { error: "Forbidden" },
    { status: 403 }
  );
}

await prisma.resume.delete({
  where: {
    id,
  },
});

return NextResponse.json({
  message: "Resume deleted successfully",
});

}