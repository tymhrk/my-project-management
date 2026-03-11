"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logout } from "./auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkStatus = () => {
      setIsLoggedIn(!!Cookies.get("jwt_token"));
    };

    checkStatus();

    window.addEventListener("auth-changed", checkStatus);

    return () => {
      window.removeEventListener("auth-changed", checkStatus);
    };
  }, []);

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          プロジェクト管理
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/projects"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            プロジェクト
          </Link>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-all"
            >
              ログアウト
            </button>
          ) : (
            <Link
              href={`/login?from=${encodeURIComponent(pathname)}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-sm"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
