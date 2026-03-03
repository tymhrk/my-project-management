import { apiClient } from "@/lib/apiClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectId, tasks } = await req.json();

    const data = await apiClient(`/projects/${projectId}/tasks/bulk_create`, {
      method: "POST",
      body: JSON.stringify({ tasks }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Bulk Create BFF Error:", error);
    return NextResponse.json(
      { error: "一括登録に失敗しました" },
      { status: 500 },
    );
  }
}
