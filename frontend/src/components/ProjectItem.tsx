"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Project } from "@/types";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="group relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center hover:border-blue-400 hover:shadow-md transition-all">
      <div className="flex-1">
        {/* カードの大部分をリンクにして、どこを押しても詳細へ飛べるように */}
        <Link href={`/projects/${project.id}/edit`} className="block">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {project.name}
          </h2>
          {project.description && (
            <p className="text-slate-500 mt-1 text-sm line-clamp-1 italic">
              {project.description}
            </p>
          )}
        </Link>
      </div>

      {/* 削除ボタンはリンクの外側に置いて、誤爆を防ぐ */}
      <div className="relative z-10 ml-4">
        <DeleteButton id={project.id} />
      </div>
    </div>
  );
}
