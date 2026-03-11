import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ログインページ自体は絶対にチェックしない（これが重要！）
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // 2. 保護したいパス（マイページなど）だけを定義
  const isProtectedPath = pathname.startsWith("/mypage");
  const token = request.cookies.get("jwt_token");
  console.log("ミドルウェアで取得したトークン:", token);

  // 3. 保護対象かつトークンがない場合のみログインへ飛ばす
  if (isProtectedPath && !token) {
    // ログインへ飛ばす際、現在のページを from として持たせる
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(pathname)}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage/:path*"],
};
