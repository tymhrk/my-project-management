const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || "http://backend:3000/api/v1";

async function getBaseUrl() {
  return typeof window === "undefined" ? INTERNAL_API_URL : NEXT_PUBLIC_API_URL;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = await getBaseUrl();
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window === "undefined" && process.env.INTERNAL_API_KEY) {
    headers.set("Authorization", `Bearer ${process.env.INTERNAL_API_KEY}`);
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.errors?.join("。") || `エラーが発生しました (${res.status})`;
    throw new Error(errorMessage);
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

export async function bulkCreateTasks(
  projectId: string,
  tasks: { name: string; description: string }[],
): Promise<{ message: string }> {
  return apiClient<{ message: string }>(
    `/projects/${projectId}/tasks/bulk_create`,
    {
      method: "POST",
      body: JSON.stringify({ tasks }),
    },
  );
}
