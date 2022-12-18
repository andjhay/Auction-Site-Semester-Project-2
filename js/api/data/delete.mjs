import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "delete";

/**
 * Deletes the users selected listing from the server if the user is the owner of the listing and is logged in
 * @param {string} id listing id
 */

export async function removeListing(id) {
  if (!id) {
    throw new Error("Delete Post requires ID");
  }

  const deletePostURL = `${apiPath}${action}/${id}`;

  const response = await authFetch(deletePostURL, {
    method,
  });

  if (response.ok) {
    const result = await response.json();
    alert(`Listing Deleted`);
    window.location.href = "userprofile.html";
    return result;
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
