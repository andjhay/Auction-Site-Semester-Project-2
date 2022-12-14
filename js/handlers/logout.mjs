import * as storage from "./storage.mjs";

/**
 * Logs user out, clearing auth token and user data from local storage when user presses button.
 */

export function logOut() {
  const logOutButton = document.querySelector("#logOutButton");

  if (logOutButton.innerHTML === String("Log In")) {
    logOutButton.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  } else {
    logOutButton.addEventListener("click", () => {
      storage.remove("token");
      storage.remove("user");
      storage.remove("userListings");
      location.reload();
      alert(`You are now logged out.`);
    });
  }
}
