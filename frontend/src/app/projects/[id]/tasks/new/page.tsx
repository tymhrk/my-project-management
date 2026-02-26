import TaskForm from "@/components/TaskForm";

export default async function NewTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = await params;

  return <TaskForm projectId={projectId} />;
}
