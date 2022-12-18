import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "delete";

/**
 * Deletes the users selected listing from the server if the user is the owner of the listing and is logged in
 * @param {string} id listing id
 */

export async function removeListing(id) {
  const deletePostURL = `${apiPath}${action}/${id}`;

  const response = await authFetch(deletePostURL, {
    method,
  });

  if (response.ok == true) {
    window.location.href = "userprofile.html";
    alert(`Listing Deleted`);
  } else {
    const result = await response.json();
    alert("ERROR " + result.errors[0].message);
  }
}
