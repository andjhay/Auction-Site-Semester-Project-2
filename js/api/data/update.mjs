import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";

const apiListing = "/listings";
const apiAvatar = "/profiles";
const method = "put";

export async function updateListing(listingData) {
  const updatePostURL = `${apiPath}${apiListing}/${listingData.id}`;
  if (listingData.media[0] == [""]) {
    delete listingData.media;
  }
  delete listingData.id;
  delete listingData.endsAt;
  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(listingData),
  });

  return await response.json();
}

export async function updateAvatar(newAvatar, username) {
  const updateAvatarURL = `${apiPath}${apiAvatar}/${username}/media`;

  const response = await authFetch(updateAvatarURL, {
    method,
    body: JSON.stringify(newAvatar),
  });

  if (response.ok) {
    result = await response.json();
    location.reload();
    alert(`Avatar Updated`);
    return result;
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
