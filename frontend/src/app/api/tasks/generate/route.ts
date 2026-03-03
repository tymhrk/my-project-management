import { apiClient } from "@/lib/apiClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectId, projectName } = await req.json();

    const data = await apiClient(`/ai/projects/${projectId}/task_generations`, {
      method: "POST",
      body: JSON.stringify({ project_name: projectName }),
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("BFF Error:", errorMessage);
    return NextResponse.json(
      { error: "AI生成に失敗しました" },
      { status: 500 },
    );
  }
}
