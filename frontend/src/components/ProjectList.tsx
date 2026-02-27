"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Project } from "@/types";
import DeleteButton from "./DeleteButton";

interface ProjectListProps {
  initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortOrder === "oldest") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [projects, searchQuery, sortOrder]);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  return (
    <div className="grid grid-cols-1 md:flex flex-col gap-4">
      <div className="mb-0 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full relative">
          <label
            htmlFor="search"
            className="block text-xs font-medium text-gray-500 mb-1.5 ml-1"
          >
            プロジェクトを検索
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="プロジェクトを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-48">
          <label
            htmlFor="sort"
            className="block text-xs font-medium text-gray-500 mb-1.5 ml-1"
          >
            並び替え
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="newest">作成日が新しい順</option>
            <option value="oldest">作成日が古い順</option>
            <option value="name">名前順（A-Z）</option>
          </select>
        </div>
      </div>

      <div className={`${searchQuery ? "py-3" : "py-0"} ml-1 transition-all`}>
        {searchQuery && (
          <p className="text-xs text-gray-400">
            <span className="font-bold text-blue-600">
              {filteredProjects.length}
            </span>{" "}
            件のプロジェクトが見つかりました
          </p>
        )}
      </div>

      {filteredProjects.map((project) => (
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
                <p className="text-sm text-gray-600">
                  タスク合計:{" "}
                  <span
                    className={`font-semibold ${project.tasks_count > 0 ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {project.tasks_count}
                  </span>{" "}
                  件
                </p>
              </h2>

              <div className="flex items-center gap-1">
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

          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-300 font-mono italic">
            <span>ID: {project.id.slice(0, 8)}...</span>
            <span>
              {new Date(project.created_at).toLocaleDateString("ja-JP")}
            </span>
          </div>
        </div>
      ))}

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
          <div className="bg-gray-200 p-4 rounded-full mb-4 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">
            該当するプロジェクトが見つかりません
          </p>
          <p className="text-gray-400 text-sm mt-1">
            検索ワードを変えてみてください
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm underline underline-offset-4"
            >
              検索をリセットする
            </button>
          )}
        </div>
      )}
    </div>
  );
}
