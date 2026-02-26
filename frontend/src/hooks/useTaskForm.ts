import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/apiClient";
import { Task } from "@/types";

export const useTaskForm = (projectId: string, initialData?: Task) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const preSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    if (!title.trim()) {
      toast.error("タスク名を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      const method = initialData ? "PATCH" : "POST";
      const endpoint = initialData
        ? `/tasks/${initialData.id}`
        : `/projects/${projectId}/tasks`;

      setShowConfirm(false);

      await apiClient(endpoint, {
        method,
        body: JSON.stringify({ title, content }),
      });

      toast.success(initialData ? "更新しました！" : "作成しました！");

      if (!initialData) setTitle("");
      if (!initialData) setContent("");
      console.log("projectId:", projectId);
      router.push(`/projects/${projectId}`);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    preSubmit,
    executeSubmit,
    isSubmitting,
    showConfirm,
    setShowConfirm,
  };
};
