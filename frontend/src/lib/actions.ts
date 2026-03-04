"use server";

import { apiClient } from "@/lib/apiClient";
import { revalidatePath } from "next/cache";

export type ActionResponse = {
  success: boolean;
  error?: string;
};

export async function saveAction(
  endpoint: string,
  method: "POST" | "PATCH",
  data: Record<string, unknown>,
): Promise<ActionResponse> {
  try {
    await apiClient(endpoint, {
      method,
      body: JSON.stringify(data),
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error(`Save Error [${method} ${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "保存に失敗しました",
    };
  }
}

export async function deleteAction(endpoint: string): Promise<ActionResponse> {
  try {
    await apiClient(endpoint, { method: "DELETE" });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error(`Delete Error [DELETE ${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "削除に失敗しました",
    };
  }
}
