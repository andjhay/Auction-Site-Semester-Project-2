import { apiPath } from "./api.mjs";

const apiReg = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerUrl = apiPath + apiReg;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });
  const result = await response.json();
  alert("You are now registered");
  return result;
}
