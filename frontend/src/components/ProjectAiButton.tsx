"use client";

import { useState } from "react";
import { AiTask } from "@/types";
import toast from "react-hot-toast";

type Props = {
  projectId: string;
  onSuccess: (tasks: AiTask[]) => void;
};

export default function ProjectAiButton({ projectId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch("/api/tasks/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await response.json();
      const aiTasks = data.tasks;

      if (aiTasks && aiTasks.length > 0) {
        onSuccess(aiTasks);
      } else {
        toast.error(
          "AIからの提案が取得できませんでした。もう一度お試しください",
        );
      }
    } catch (error) {
      console.error("AIからの提案が取得できませんでした:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "AIとの通信中に予期せぬエラーが発生しました。";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 text-[11px] font-bold rounded-lg border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:transform active:scale-95"
    >
      <span className={loading ? "animate-spin" : ""}>
        {loading ? "⌛" : "✨"}
      </span>
      {loading ? "AI解析中..." : "AIに相談"}
    </button>
  );
}
