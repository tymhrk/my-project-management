"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteAction } from "@/lib/actions";
import ConfirmModal from "./ConfirmModal";

interface DeleteButtonProps {
  endpoint: string;
  title?: string;
  message?: string;
  redirectPath?: string;
  onSuccess?: () => void;
  variant?: "icon" | "text";
}

export default function DeleteButton({
  endpoint,
  message = "削除してもよろしいですか？",
  title = "削除の確認",
  redirectPath,
  onSuccess,
  variant = "icon",
}: DeleteButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAction(endpoint);

      if (result.success) {
        toast.success("削除しました");
        setShowConfirm(false);

        if (onSuccess) {
          onSuccess();
        }

        router.refresh();

        if (redirectPath) {
          router.push(redirectPath);
        }
      } else {
        toast.error("削除に失敗しました");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "通信エラーが発生しました",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowConfirm(true);
        }}
        disabled={isDeleting}
        className={
          variant === "text"
            ? "rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-50" // ★ ここを修正
            : "group p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        }
      >
        {variant === "text" ? (
          isDeleting ? (
            "削除中..."
          ) : (
            "削除"
          )
        ) : (
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title={title}
        message={message}
        confirmText="削除する"
        variant="danger"
        isSubmitting={isDeleting}
      />
    </>
  );
}
