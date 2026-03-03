"use client";

import { useTaskForm } from "@/hooks/useTaskForm";
import ConfirmModal from "./ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Task } from "@/types";

export default function TaskEditForm({
  projectId,
  initialdata,
}: {
  projectId: string;
  initialdata?: Task;
}) {
  const {
    name,
    setName,
    description,
    setDescription,
    preSubmit,
    executeSubmit,
    isSubmitting,
    showConfirm,
    setShowConfirm,
  } = useTaskForm(projectId, initialdata);

  const router = useRouter();
  console.log("TaskEditForm projectId:", projectId);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto">
        <Link
          href={`/projects/${projectId}`}
          className="text-sm text-blue-600 mb-6 inline-block"
        >
          ← プロジェクト詳細へ戻る
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold mb-6">タスクを編集</h1>

          <form onSubmit={preSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                タスク名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="何をしますか？"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                メモ（任意）
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="詳細な手順など"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-all"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-all"
              >
                {isSubmitting ? "更新中..." : "タスクを更新"}
              </button>
            </div>
          </form>

          <ConfirmModal
            isOpen={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={executeSubmit}
            title="変更の確認"
            message="この内容でタスクを更新しますか？"
            confirmText="更新する"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
