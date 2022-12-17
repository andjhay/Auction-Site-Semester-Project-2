import { apiPath } from "./api.mjs";
import * as storage from "../handlers/storage.mjs";

const apiLogin = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginUrl = apiPath + apiLogin;
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("user", user);
    const currentUser = storage.load("user");
    alert(`You are now logged in as ${currentUser.name} `);
    window.location.href = "userprofile.html";
    return result;
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
