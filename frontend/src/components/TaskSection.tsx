"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectAiButton from "./ProjectAiButton";
import TaskList from "./TaskList";
import ConfirmModal from "./ConfirmModal";
import { Task } from "@/types";
import toast from "react-hot-toast";

type Props = {
  projectId: string;
  initialTasks: Task[];
};

export default function TaskSection({ projectId, initialTasks }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAiSuccess = (tasks: Task[]) => {
    setTasks(tasks);
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    if (tasks.length === 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tasks/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          tasks: tasks.map((t) => ({
            name: t.name,
            description: t.description || "",
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("一括登録に失敗しました");
      }

      setIsModalOpen(false);
      setTasks([]);

      router.refresh();

      toast.success("タスクを一括登録しました！");
    } catch (error) {
      console.error("タスク一括登録に失敗しました。:", error);
      toast.error("タスク一括登録に失敗しました。");
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

          {/* AI連携ボタン */}
          <ProjectAiButton projectId={projectId} onSuccess={handleAiSuccess} />
        </div>
      </div>

      {/* タスク一覧表示 */}
      <TaskList initialTasks={initialTasks} projectId={projectId} />

      {/* AI提案確認モーダル */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        title="AIからの提案タスク"
        message="以下のタスクをプロジェクトに一括登録しますか？"
        confirmText={isSubmitting ? "保存中..." : "一括登録する"}
        isSubmitting={isSubmitting}
      >
        <div className="mt-4 mb-5 max-h-[40vh] overflow-y-auto pr-2">
          <ul className="space-y-3">
            {tasks.map((task, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-50 rounded-lg text-sm border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-purple-500 font-bold">✨</span>
                  <span className="font-bold text-gray-800">{task.name}</span>
                </div>
                {task.description && (
                  <p className="text-gray-600 text-[12px] leading-relaxed ml-6">
                    {task.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ConfirmModal>
    </div>
  );
}
