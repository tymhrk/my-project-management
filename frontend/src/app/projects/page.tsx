import { apiClient } from "@/lib/apiClient";
import { Project } from "@/types";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

async function getProjects(): Promise<Project[]> {
  return await apiClient<Project[]>("/projects", { cache: "no-store" });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            プロジェクト
          </h1>
          <p className="text-slate-500 mt-2">
            進行中のプロジェクトを管理しましょう
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          プロジェクトを作成
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          {projects.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-5xl mb-4">🏜️</p>
              <h2 className="text-xl font-bold text-slate-800">
                まだ何もありません
              </h2>
              <Link
                href="/projects/new"
                className="mt-6 inline-block text-blue-600 font-semibold hover:underline"
              >
                最初のプロジェクトを作成する
              </Link>
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
