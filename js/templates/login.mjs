import { load } from "../handlers/storage.mjs";

// Functions that alter page details if user is logged out

export function loginTemplate(path, mainContainer, currentUser) {
  if (path === "userprofile.html") {
    mainContainer.innerHTML = `<div class="mb-3">Welcome to World Auction</br>To access your profiles you must</div>
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
  currentUser.innerHTML = `${user.name} - ${user.credits} credits`;
}
