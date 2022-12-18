import { apiPath } from "../api/api.mjs";
import { fetchData } from "../api/data/fetch.mjs";
import { updateListing } from "../api/data/update.mjs";
import { selectDeleteButtons } from "./deleteListing.mjs";

const apiListings = "/listings";

/**
 * function gathers info from form to update a listing
 */

export async function updateListingListener() {
  const form = document.querySelector("#listingForm");
  const mediaField = document.querySelector("#mediaField");
  const url = new URL(location.href);
  const listingId = url.searchParams.get("id");
  const listingFlags = "?_seller=true&_bids=true";

  selectDeleteButtons(listingId);

  if (form) {
    const listingData = await fetchData(apiPath, apiListings, listingId, listingFlags);

    form.title.value = listingData.title;
    form.description.value = listingData.description;
    form.tags.value = listingData.tags;

    listingData.media.forEach((media, i) => {
      if (i === 0) {
        form.media.value = media;
      } else {
        const newMedia = `
      <div id="newMedia" class="form-floating">
      <input type="text" class="form-control mid" name="media-${i}" placeholder="Media (URL)" value="${media}"></input>
      </div>`;
        mediaField.insertAdjacentHTML("afterend", newMedia);
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
      formObject.id = listingId;

      const newMediaHtml = document.querySelectorAll("#newMedia");

      let mediaFormatted = [formObject.media];
      newMediaHtml.forEach((input, i) => {
        let currentKey = `media-${i + 1}`;

        if (formObject[currentKey] == "") {
          delete formObject[currentKey];
        } else {
          var currentMedia = formObject[currentKey];
          delete formObject[currentKey];
          mediaFormatted.push(currentMedia);
        }
      });

      const tagFormat = [formObject.tags];
      const formObjectUpdate = { ...formObject, media: mediaFormatted, tags: tagFormat };

      updateListing(formObjectUpdate);
      alert(`Listing Updated`);
      location.reload();
    });
  }
}
