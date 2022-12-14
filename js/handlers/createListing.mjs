import { createListing } from "../api/data/create.mjs";

export function createListingListener(currentDate) {
  const date = document.querySelector("#date");
  const mediaButton = document.querySelector("#addMedia");
  const mediaField = document.querySelector("#mediaField");
  const resetMedia = document.querySelector("#resetMedia");
  date.min = currentDate;
  let mediaCounter = 0;

  mediaButton.addEventListener("click", () => {
    if (mediaCounter < 7) {
      mediaCounter = mediaCounter + 1;
      const newMedia = `
        <div id="newMedia" class="form-floating">
        <input type="text" class="form-control mid" name="media-${mediaCounter}" placeholder="Media (URL)"></input>
        </div>`;
      mediaField.insertAdjacentHTML("afterend", newMedia);

      resetMedia.classList.remove("d-none");
    } else {
      alert(`Max Media Inputs`);
    }
    const newMediaHtml = document.querySelector("#newMedia");
    resetMedia.addEventListener("click", () => {
      newMediaHtml.parentNode.removeChild(newMediaHtml);
      resetMedia.classList.add("d-none");
      mediaCounter = 0;
    });
  });

  const form = document.querySelector("#listingForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());

      const newMediaHtml = document.querySelectorAll("#newMedia");

      let mediaFormatted = [formObject.media];
      newMediaHtml.forEach((input, i) => {
        let currentKey = `media-${i + 1}`;
        const currentMedia = formObject[currentKey];
        delete formObject[currentKey];
        mediaFormatted.push(currentMedia);
      });

      const tagFormat = [formObject.tags];
      const formObjectUpdate = { ...formObject, media: mediaFormatted, tags: tagFormat };
      createListing(formObjectUpdate);
    });
  }
}
