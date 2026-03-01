"use client";

import { useState } from "react";
import { generateAiTasks } from "@/lib/generateAiTasks";
import { AiTask } from "@/types";

type Props = {
  projectId: string;
  onSuccess: (tasks: AiTask[]) => void;
};

export default function ProjectAiButton({ projectId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const aiTasks = await generateAiTasks(projectId);
      onSuccess(aiTasks);
    } catch (error) {
      console.error("AI通信エラー:", error);
      alert("AI通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 text-[11px] font-bold rounded-lg border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all disabled:opacity-50"
    >
      <span>✨</span>
      {loading ? "AI解析中..." : "AIに相談"}
    </button>
  );
}
