import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edge, Node } from "@xyflow/react";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) throw new Error("Unauthorized");

    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        {
          error: "Workflow not found",
        },
        { status: 404 },
      );
    }

    const flowObject = JSON.parse(workflow.flowObject);

    return NextResponse.json({
      success: true,
      data: {
        id: workflow.id,
        name: workflow.name,
        flowObject,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch workflow" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { nodes, edges } = (await req.json()) as {
      nodes: Node[];
      edges: Edge[];
    };

    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) throw new Error("Unauthorized");

    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        {
          error: "Workflow not found",
        },
        { status: 404 },
      );
    }

    const updatedWorkflow = await prisma.workflow.update({
      where: {
        id,
      },
      data: {
        flowObject: JSON.stringify({ nodes, edges }),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updatedWorkflow.id,
        name: updatedWorkflow.name,
        flowObject: JSON.parse(updatedWorkflow.flowObject),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update workflow" },
      { status: 500 },
    );
  }
}
