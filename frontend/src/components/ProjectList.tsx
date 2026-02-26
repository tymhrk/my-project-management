"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/types";
import DeleteButton from "./DeleteButton";

interface ProjectListProps {
  initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);

  // 親のデータが変わった時に同期させる
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  return (
    <div className="grid grid-cols-1 md:flex flex-col gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-4xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-45"
        >
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-gray-900 truncate pr-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="hover:text-blue-600"
                >
                  {project.name}
                </Link>
              </h2>

              {/* アクションボタン：編集と削除 */}
              <div className="flex items-center gap-1">
                {/* 🆕 編集ボタンの復活 */}
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="プロジェクトを編集"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </Link>

                <DeleteButton
                  endpoint={`/projects/${project.id}`}
                  title="プロジェクトの削除"
                  message={`「${project.name}」を削除しますか？`}
                  onSuccess={() => {
                    setProjects((prev) =>
                      prev.filter((p) => p.id !== project.id),
                    );
                  }}
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {project.description || "説明なし"}
            </p>
          </div>

          {/* フッター：IDと日付 */}
          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-300 font-mono italic">
            <span>ID: {project.id.slice(0, 8)}...</span>
            <span>
              {new Date(project.created_at).toLocaleDateString("ja-JP")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
