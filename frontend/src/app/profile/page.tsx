"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient<User>(`/profile`);
        setUser(data);
      } catch (error) {
        console.error("ユーザー取得失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">読み込み中...</div>;
  if (!user) return <div className="p-8 text-red-500">ログインが必要です</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">マイページ</h1>
        <p className="text-gray-500 text-sm mt-1">
          あなたのアクティビティと基本設定
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左側：プロフィール表示 */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={user.avatar_url || "/default-avatar.png"}
                alt="avatar"
                fill
                priority
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-6 px-4">
              {user.bio || "I'm TAYAMA."}
            </p>

            <div className="border-t pt-6">
              <Link
                href="/profile/edit"
                className="block w-full py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                編集する
              </Link>
            </div>
          </div>
        </div>

        {/* 右側：活動状況など (省略なし) */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              活動状況
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">参加中プロジェクト</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">完了タスク</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              最近参加したプロジェクト
            </h2>
            <div className="space-y-3">
              {[
                "新しいWebサイト構築",
                "マーケティング分析",
                "在庫管理システム",
              ].map((proj) => (
                <div
                  key={proj}
                  className="flex justify-between items-center p-4 border border-gray-50 rounded-xl"
                >
                  <span className="font-medium text-gray-800">{proj}</span>
                  <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    進行中
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
