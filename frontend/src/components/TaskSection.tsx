"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectAiButton from "./ProjectAiButton";
import TaskList from "./TaskList";
import ConfirmModal from "./ConfirmModal";
import { Task, AiTask } from "@/types";
import { apiClient } from "@/lib/apiClient";

type Props = {
  projectId: string;
  initialTasks: Task[];
};

export default function TaskSection({ projectId, initialTasks }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiTasks, setAiTasks] = useState<AiTask[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAiSuccess = (tasks: AiTask[]) => {
    setAiTasks(tasks);
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsSubmitting(true);
    try {
      await apiClient(`/ai/projects/${projectId}/save_tasks`, {
        method: "POST",
        body: JSON.stringify({
          project_id: projectId,
          task_names: aiTasks.map((t) => t.title),
        }),
      });
      setIsModalOpen(false);

      router.refresh();
      alert("タスクを一括登録しました！");
    } catch {
      alert("保存に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">タスク</h2>
        <div className="flex flex-col items-end gap-2">
          <Link
            href={`/projects/${projectId}/tasks/new`}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            + タスクを追加
          </Link>

          <ProjectAiButton projectId={projectId} onSuccess={handleAiSuccess} />
        </div>
      </div>

      <TaskList initialTasks={initialTasks} projectId={projectId} />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        title="AIからの提案タスク"
        message="以下のタスクをプロジェクトに登録しますか？"
        confirmText="一括登録する"
        isSubmitting={isSubmitting}
      >
        <ul className="space-y-2 mt-4 mb-5">
          {aiTasks.map((task, idx) => (
            <li
              key={idx}
              className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-100"
            >
              <span className="text-blue-500 mr-2 font-bold">・</span>
              {task.title}
            </li>
          ))}
        </ul>
      </ConfirmModal>
    </div>
  );
}
