/**
 * JWT token management + auth API calls (client-side).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const TOKEN_KEY = "navifact_token";

/* ---------- Token storage ---------- */

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/* ---------- Auth API ---------- */

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
  points: number;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || "로그인에 실패했습니다");
  }
  const data: LoginResponse = await res.json();
  setToken(data.access_token);
  return data;
}

export async function register(
  email: string,
  username: string,
  password: string,
): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || "회원가입에 실패했습니다");
  }
  return res.json();
}

export async function fetchMe(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      removeToken();
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}

export function logout(): void {
  removeToken();
}
