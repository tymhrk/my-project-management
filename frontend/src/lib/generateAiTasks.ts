import { apiClient } from "./apiClient";
import { AiTask } from "../types";

export const generateAiTasks = async (projectId: string): Promise<AiTask[]> => {
  const res = await apiClient<{ tasks: AiTask[] }>(
    `/ai/projects/${projectId}/task_generations`,
    {
      method: "POST",
      body: JSON.stringify({}),
    },
  );

  return res.tasks;
};
