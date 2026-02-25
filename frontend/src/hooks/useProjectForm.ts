import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/apiClient";
import { Project } from "@/types";

export const useProjectForm = (initialData?: Project) => {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const preSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true); // まず確認モーダルを出す
  };

  const executeSubmit = async () => {
    if (!name.trim()) {
      toast.error("プロジェクト名を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      const method = initialData ? "PATCH" : "POST";
      const endpoint = initialData
        ? `/projects/${initialData.id}`
        : "/projects";

      setShowConfirm(false);

      await apiClient(endpoint, {
        method,
        body: JSON.stringify({ name, description }),
      });

      toast.success(initialData ? "更新しました！" : "作成しました！");

      if (!initialData) setName("");
      if (!initialData) setDescription("");

      router.push("/projects");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message); // apiClientが返してくれるRailsのエラー
      }
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
