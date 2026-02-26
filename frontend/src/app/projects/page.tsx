import { apiClient } from "@/lib/apiClient";
import { Project } from "@/types";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";

async function getProjects(): Promise<Project[]> {
  return await apiClient<Project[]>("/projects", { cache: "no-store" });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          プロジェクト管理
        </h1>
        <p className="text-slate-500 mt-2">
          進行中のプロジェクトを管理しましょう
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-80 shrink-0">
          <div className="sticky top-8">
            {" "}
            <ProjectForm />
          </div>
        </div>
        <div className="flex-1">
          {projects.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-5xl mb-4">🏜️</p>
              <h2 className="text-xl font-bold text-slate-800">
                まだ何もありません
              </h2>
            </div>
          ) : (
            <div className="grid gap-4">
              <ProjectList initialProjects={projects} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
