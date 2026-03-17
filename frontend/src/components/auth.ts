import Cookies from "js-cookie";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function login(email: string, password: string) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!res.ok) throw new Error("ログイン失敗");

  const data = await res.json();

  Cookies.set("jwt_token", data.token, {
    expires: 7,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    same_site: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return data;
}

export async function logout() {
  Cookies.remove("jwt_token");
  window.location.href = "/login";
}
