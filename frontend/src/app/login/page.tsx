"use client";

import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="h-[calc(100vh-72px)] w-full flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ログイン
        </h2>
        <Suspense fallback={<div>読み込み中...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
