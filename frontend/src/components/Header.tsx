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
    <header className="flex justify-between items-center p-4 border-b border-gray-100">
      <Link href="/" className="text-xl font-bold text-gray-800">
        プロジェクト管理
      </Link>

      <nav className="flex items-center gap-3">
        <Link
          href="/projects"
          className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
        >
          プロジェクト
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
            >
              マイページ
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-gray-500 hover:text-red-600 transition-colors font-medium text-sm"
            >
              ログアウト
            </button>
          </>
        ) : (
          <Link
            href={`/login?from=${encodeURIComponent(pathname)}`}
            className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            ログイン
          </Link>
        )}
      </nav>
    </header>
  );
}
