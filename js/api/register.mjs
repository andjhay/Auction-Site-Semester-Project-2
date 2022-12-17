import { apiPath } from "./api.mjs";
import { login } from "./login.mjs";

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

  if (response.ok) {
    const result = await response.json();
    alert("You are now registered");
    console.log(profile.password);
    login(profile);
    return result;
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
