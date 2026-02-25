import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description?: string;
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. params を await してから id を取り出す
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Fetchを実行
  const res = await fetch(`http://backend:3000/projects/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <div>プロジェクトが見つかりません</div>;

  const project: Project = await res.json();

  return (
    <div className="p-8 max-w-2xl mx-auto text-white">
      {" "}
      {/* 一旦文字を白にして確認 */}
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="mb-8">ID: {project.id}</p>
      <div className="bg-white text-black p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">プロジェクト詳細</h2>
        <p>{project.description || "説明はありません。"}</p>
      </div>
      <Link
        href="/"
        className="inline-block mt-8 text-blue-600 hover:underline"
      >
        ← 一覧に戻る
      </Link>
    </div>
  );
}
