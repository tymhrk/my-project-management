import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { saveAction } from "@/lib/actions";
import { Task } from "@/types";

export const useTaskForm = (projectId: string, initialData?: Task) => {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const preSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    if (!name.trim()) {
      toast.error("タスク名を入力してください");
      return;
    }

    setIsSubmitting(true);

    try {
      const method = initialData ? "PATCH" : "POST";
      const endpoint = initialData
        ? `/tasks/${initialData.id}`
        : `/projects/${projectId}/tasks`;

      const payload = {
        task: {
          name,
          description,
        },
      };

      setShowConfirm(false);

      const result = await saveAction(endpoint, method, payload);
      if (result.success) {
        toast.success(initialData ? "更新しました！" : "作成しました！");

        if (!initialData) {
          setName("");
          setDescription("");
        }

        router.push(`/projects/${projectId}`);
      } else {
        toast.error(result.error || "保存に失敗しました");
      }
    } catch {
      toast.error("予期せぬエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    preSubmit,
    executeSubmit,
    isSubmitting,
    showConfirm,
    setShowConfirm,
  };
};
