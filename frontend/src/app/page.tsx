"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description?: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // プロジェクト一覧を取得する関数
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/projects");
      if (!res.ok) throw new Error("取得失敗");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Railsに接続できません:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 新規作成・更新の送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const url = editingId
      ? `http://localhost:3000/projects/${editingId}`
      : "http://localhost:3000/projects";

    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: { name, description } }),
      });

      if (!res.ok) throw new Error("保存失敗");

      setName("");
      setDescription("");
      setEditingId(null);
      fetchProjects();
    } catch {
      alert("保存に失敗しました");
    }
  };

  // 編集モード開始
  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description || "");
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  // 削除処理
  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      await fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
      });
      fetchProjects();
    } catch {
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 入力フォームカード */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Project Manager
          </h1>
          <p className="text-slate-500 mb-8">
            {editingId
              ? "プロジェクト名を編集しています"
              : "新しいプロジェクトを登録しましょう"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="プロジェクト名を入力..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="プロジェクトの説明（任意）"
                className="w-full p-2 border rounded h-24 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                {editingId ? "更新" : "追加"}
              </button>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-slate-400 hover:text-slate-600 self-start ml-2 underline"
              >
                編集をキャンセル
              </button>
            )}
          </form>
        </div>

        {/* 一覧リストカード */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-700">登録済みプロジェクト</h2>
          </div>

          <ul className="divide-y divide-slate-100">
            {projects.length === 0 ? (
              <li className="p-12 text-center text-slate-400 italic">
                データがありません。
              </li>
            ) : (
              projects.map((project) => (
                <li
                  key={project.id}
                  className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-medium text-slate-700">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-lg hover:text-blue-500 font-medium"
                      >
                        {project.name}
                      </Link>
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {/* 編集ボタン */}
                    <button
                      onClick={() => startEdit(project)}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="編集"
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
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    {/* 削除ボタン */}
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="削除"
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
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
