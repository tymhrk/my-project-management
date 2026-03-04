import { apiClient } from "@/lib/apiClient";
import { Task } from "@/types";
import Link from "next/link";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string; taskId: string }>;
}) {
  const { id, taskId } = await params;

  const task = await apiClient<Task>(`/tasks/${taskId}`);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href={`/projects/${id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          ← プロジェクト詳細に戻る
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* ヘッダー部分 */}
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                task.status === "done"
                  ? "bg-green-100 text-green-700"
                  : task.status === "doing"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {task.status}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{task.name}</h1>
        </div>

        {/* コンテンツ部分 */}
        <div className="p-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            内容
          </h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed min-h-200px]">
            {task.description || (
              <span className="text-gray-400 italic">
                内容が入力されていません。
              </span>
            )}
          </div>
        </div>

        {/* フッター（メタ情報） */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
          <span>タスクID: {task.id}</span>
          <span>
            作成日: {new Date(task.created_at).toLocaleString("ja-JP")}
          </span>
        </div>
      </div>
    </div>
  );
}
