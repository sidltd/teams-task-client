import type { User } from "../users/types";
import type { Creds } from "./types";

export const signInUser = async (creds: Creds): Promise<User> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message)
  }

  return res.json();
}

export const fetchCurrentUser = async (): Promise<User> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message)
  }

  return res.json();
}

export const logoutCurrentUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/signout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message)
  }

  return res.json();
}
