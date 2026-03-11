"use client";

import { useState } from "react";
import { useProfileForm } from "@/hooks/useProfileForm";
import ConfirmModal from "./ConfirmModal";
import { User } from "@/types";
import Image from "next/image";

export default function ProfileEditForm({
  initialData,
}: {
  initialData: User;
}) {
  const {
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
  } = useProfileForm(initialData);

  // プレビュー用のステート
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">
        プロフィールの編集
      </h1>

      <form onSubmit={preSubmit} className="space-y-6">
        {/* --- アバター中央配置エリア --- */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={
                previewUrl || initialData.avatar_url || "/default-avatar.png"
              }
              alt="avatar"
              fill
              priority
              className="rounded-full object-cover border-4 border-white shadow-md"
              unoptimized
            />
          </div>

          {/* アップロードボタン風のラベル */}
          <label className="cursor-pointer bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-100 transition-colors border border-blue-100">
            画像をアップロード
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-400 mt-2">
            正方形の画像が推奨されます
          </p>
        </div>

        {/* --- 入力フィールド群 --- */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              自己紹介
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-400 transition-all"
        >
          {isSubmitting ? "保存中..." : "変更内容を確認"}
        </button>
      </form>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeSubmit}
        title="プロフィールの更新"
        message="この内容でプロフィールを更新しますか？"
        confirmText="更新する"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
