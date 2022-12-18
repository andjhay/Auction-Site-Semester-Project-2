import { updateAvatar } from "../api/data/update.mjs";

/**
 * Function to gather form data for updating user avatar
 * @param {string} username the logged in user who is updating their avatar
 * 
 */

export async function updateAvatarListener(username) {
  const form = document.querySelector("#avatarForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(username);

      const form = event.target;
      const formData = new FormData(form);
      const avatarData = Object.fromEntries(formData.entries());

      updateAvatar(avatarData, username);
    });
  }
}
