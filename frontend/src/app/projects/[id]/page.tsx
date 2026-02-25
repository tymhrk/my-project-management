import Link from "next/link";

async function getProject(id: string) {
  const res = await fetch(`http://backend:3000/projects/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Next.js 15 では必須
  const project = await getProject(id);

  if (!project)
    return (
      <div className="p-8 text-center text-gray-500">
        プロジェクトが見つかりません
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/projects" className="text-sm text-blue-600 font-medium">
            ← 一覧に戻る
          </Link>
          <Link
            href={`/projects/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            プロジェクトを編集
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-white">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {project.name}
            </h1>
          </div>
          <div className="p-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              説明
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {project.description || "説明なし"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
