import { Client } from "@upstash/workflow";
import { NextResponse } from "next/server";

const client = new Client({
  token: process.env.QSTASH_TOKEN!,
  baseUrl: process.env.QSTASH__BASE_URL!,
});

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export async function POST(request: Request) {
  const { workflowId, messages } = await request.json();
  try {
    const { workflowRunId } = await client.trigger({
      url: `${BASE_URL}/api/workflow/chat`,
      retries: 3,
      headers: {
        "x-vercel-protection-bypass":
          process.env.VERCEL_PROTECTION_BYPASS_TOKEN!,
      },
      body: {
        workflowId,
        messages,
      },
    });

    return NextResponse.json({ success: true, workflowRunId });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to trigger workflow",
      },
      { status: 500 },
    );
  }
}
