import { load } from "../handlers/storage.mjs";

// Functions that alter page details if user is logged out

export function loginTemplate(path, mainContainer, currentUser) {
  if (path === "userprofile.html") {
    mainContainer.innerHTML = `<div class="m-3">Welcome to World Auction</br>To access your profile you must</div>
  <div>
    <a href="login.html" class="m-2 btn btn-secondary w-25">Login</a>
    <p> or </p>
    <a href="register.html" class="m-2 btn btn-secondary btn w-25">Register</a>
  </div>`;
    currentUser.innerHTML = `Logged Out`;
  } else {
    currentUser.innerHTML = `Logged Out`;
  }
}

export function loggedInTemplate(currentUser) {
  const user = load("user");
  currentUser.innerHTML = `${user.name} <svg
  xmlns="http://www.w3.org/2000/svg"
  width="25"
  height="25"
  fill="currentColor"
  class="bi bi-person-circle"
  viewBox="0 0 16 18"
>
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
  <path
    fill-rule="evenodd"
    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
  />
</svg> ${user.credits} $`;
}
