import { apiClient } from "@/lib/apiClient";
import { Project } from "@/types";
import { notFound } from "next/navigation";
import ProjectEditForm from "@/components/ProjectEditForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // データを取得。失敗したらその時点で notFound() を実行して関数を抜ける
  const project = await apiClient<Project>(`/projects/${id}`, {
    cache: "no-store",
  }).catch(() => {
    notFound();
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* project が確実に存在するときだけここに来る */}
        <ProjectEditForm initialData={project} />
      </div>
    </div>
  );
}
