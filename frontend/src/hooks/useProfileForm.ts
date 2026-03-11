import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useProfileForm = (initialData: { name: string; bio: string }) => {
  const router = useRouter();
  const [name, setName] = useState(initialData.name || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [file, setFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const preSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const executeSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirm(false);

    const formData = new FormData();
    formData.append("user[name]", name);
    formData.append("user[bio]", bio);
    if (file) formData.append("user[avatar]", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("更新に失敗しました");

      toast.success("更新しました");
      router.push("/profile");
      router.refresh(); // キャッシュを更新して新しい画像を反映
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "予期せぬエラーが発生しました",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    bio,
    setBio,
    setFile,
    preSubmit,
    executeSubmit,
    isSubmitting,
    showConfirm,
    setShowConfirm,
  };
};
