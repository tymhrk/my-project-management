import Link from "next/link";
import { apiClient } from "@/lib/apiClient";
import { Project, Task } from "@/types";
import TaskList from "@/components/TaskList";

async function getProject(id: string) {
  return await apiClient<Project>(`/projects/${id}`, { cache: "no-store" });
}

async function getTasks(projectId: string) {
  return await apiClient<Task[]>(`/projects/${projectId}/tasks`, {
    cache: "no-store",
  });
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, tasks] = await Promise.all([
    getProject(id).catch(() => null),
    getTasks(id).catch(() => []),
  ]);

  if (!project)
    return (
      <div className="p-8 text-center text-gray-500">
        プロジェクトが見つかりません
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/projects"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            ← 一覧に戻る
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/projects/${id}/edit`}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              編集
            </Link>
          </div>
        </div>

        {/* メインカード：タスク詳細と同じ rounded-2xl & shadow & border */}
        <div className="bg-white rounded-4xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* ヘッダー部分：スクショのような薄いグレーの背景 */}
          <div className="p-8 border-b border-gray-100 bg-white">
            <div className="mb-4">
              {/* プロジェクトということを示すラベル（タスクのTODOバッジの位置） */}
              <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full uppercase">
                PROJECT
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {project.name}
            </h1>
          </div>

          {/* コンテンツ部分：内容 (CONTENT) のラベルと余白 */}
          <div className="p-8 min-h-40">
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
              内容
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {project.description || "説明なし"}
            </p>
          </div>

          {/* フッター部分：スクショのような薄グレーの背景と左右のメタ情報 */}
          <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-medium tracking-wider uppercase">
            <div className="flex gap-2">
              <span>プロジェクトID:</span>
              <span className="font-mono">{project.id}</span>
            </div>
            <div>
              作成日: {new Date(project.created_at).toLocaleString("ja-JP")}
            </div>
          </div>
        </div>

        {/* --- タスクセクション --- */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">タスク</h2>
            <Link
              href={`/projects/${id}/tasks/new`}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              + タスクを追加
            </Link>
          </div>
          <TaskList initialTasks={tasks} projectId={id} />
        </div>
      </div>
    </div>
  );
}
