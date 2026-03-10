import Cookies from "js-cookie";

const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || "http://backend:3000/api/v1";

export async function login(email: string, password: string) {
  const res = await fetch(`${INTERNAL_API_URL}/auth/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!res.ok) throw new Error("ログイン失敗");

  const data = await res.json();

  Cookies.set("jwt_token", data.token, { expires: 7, secure: true });
  return data;
}

export async function logout() {
  Cookies.remove("jwt_token");
  window.location.href = "/login";
}
