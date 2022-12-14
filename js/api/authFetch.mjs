import { load } from "../handlers/storage.mjs";

export function headers() {
  const token = load("token");

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url, options = {}) {
  return fetch(url, {
    headers: headers(),
    ...options,
  });
}
