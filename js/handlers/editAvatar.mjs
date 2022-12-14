import { updateAvatar } from "../api/data/update.mjs";

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
      location.reload();
      alert(`Avatar Updated`);
    });
  }
}
