"use client";

import Link from "next/link";
import { Project } from "@/types";
import { useProjectForm } from "@/hooks/useProjectForm";
import ConfirmModal from "./ConfirmModal";

export default function ProjectEditForm({
  initialData,
}: {
  initialData: Project;
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
  } = useProjectForm(initialData);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <Link
        href="/projects"
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block transition-colors"
      >
        ← キャンセルして戻る
      </Link>

      <h1 className="text-2xl font-bold mb-8">プロジェクトの編集</h1>

      <form onSubmit={preSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            プロジェクト名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-100"
            placeholder="プロジェクト名を入力"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            説明
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            rows={5}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-100"
            placeholder="プロジェクトの詳細を入力してください"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-slate-400 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              保存中...
            </>
          ) : (
            "変更を保存する"
          )}
        </button>
      </form>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeSubmit}
        title="更新の確認"
        message="この内容でプロジェクトを更新しますか？"
        confirmText="更新する"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
