import { removeListing } from "../api/data/delete.mjs";

export async function selectDeleteButtons(listingId) {
  const deleteButton = document.querySelector("#deleteButton");

  deleteButton.addEventListener("click", deleteListing);

  function deleteListing() {
    removeListing(listingId);
  }
}
