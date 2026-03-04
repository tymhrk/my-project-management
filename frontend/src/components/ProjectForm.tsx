"use client";

import Link from "next/link";
import { useProjectForm } from "@/hooks/useProjectForm";
import ConfirmModal from "./ConfirmModal";

export default function ProjectForm() {
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
  } = useProjectForm();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      <Link
        href="/projects"
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block transition-colors"
      >
        ← キャンセルして戻る
      </Link>
      <h2 className="text-xl font-bold mb-4">新しいプロジェクト</h2>
      <form onSubmit={preSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            名前
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
            placeholder="プロジェクト名"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            説明（任意）
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
            placeholder="詳細を入力してください"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              作成中...
            </>
          ) : (
            "プロジェクトを作成"
          )}
        </button>
      </form>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeSubmit}
        title="新規登録の確認"
        message={`プロジェクト「${name}」を登録しますか？`}
        confirmText="登録する"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
