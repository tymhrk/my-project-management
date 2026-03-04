"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types";
import toast from "react-hot-toast";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { saveAction } from "@/lib/actions";
interface TaskListProps {
  initialTasks: Task[];
  projectId: string;
}

export default function TaskList({ initialTasks, projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const toggleStatus = async (task: Task) => {
    const nextStatusMap: Record<string, Task["status"]> = {
      todo: "doing",
      doing: "done",
      done: "todo",
    };
    const newStatus = nextStatusMap[task.status];

    try {
      const result = await saveAction(`/tasks/${task.id}`, "PATCH", {
        task: { status: newStatus },
      });

      if (result.success) {
        setTasks(
          tasks.map((t) =>
            t.id === task.id ? { ...t, status: newStatus } : t,
          ),
        );
        toast.success(`ステータスを ${newStatus} に更新しました`);
      } else {
        toast.error(result.error || "更新に失敗しました");
      }
    } catch {
      toast.error("予期せぬエラーが発生しました");
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
        <p className="text-gray-500 text-sm">タスクはまだありません</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleStatus(task)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.status === "done"
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              {task.status === "done" && "✓"}
            </button>
            <div>
              <h3
                className={`font-medium ${task.status === "done" ? "line-through text-gray-400" : "text-gray-900"}`}
              >
                <Link
                  href={`/projects/${projectId}/tasks/${task.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {task.name}
                </Link>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {task.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href={`/projects/${projectId}/tasks/${task.id}/edit`}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="タスクを編集"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Link>
            <DeleteButton
              endpoint={`/tasks/${task.id}`}
              message="タスクを削除しますか？"
              redirectPath={`/projects/${projectId}`}
              onSuccess={() => {
                setTasks((prev) => prev.filter((t) => t.id !== task.id));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
