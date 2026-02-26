import { apiClient } from "@/lib/apiClient";
import { Task } from "@/types";
import { notFound } from "next/navigation";
import TaskEditForm from "@/components/TaskEditForm";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string; taskId: string }>;
}) {
  const { id, taskId } = await params;

  const task = await apiClient<Task>(`/tasks/${taskId}`, {
    cache: "no-store",
  }).catch(() => {
    notFound();
  });

  return <TaskEditForm projectId={id} initialdata={task} />;
}
