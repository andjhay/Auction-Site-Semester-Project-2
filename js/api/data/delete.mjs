import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "delete";

export async function removeListing(id) {
  if (!id) {
    throw new Error("Delete Post requires ID");
  }

  const deletePostURL = `${apiPath}${action}/${id}`;

  const response = await authFetch(deletePostURL, {
    method,
  });
  alert(`Listing Deleted`);
  window.location.href = "userprofile.html";
  return await response.json();
}
