import { apiPath } from "../api/api.mjs";
import { fetchData } from "../api/data/fetch.mjs";
import * as storage from "../handlers/storage.mjs";

/**
 * Gets the data of the logged in user or if another user is selected gets thats users data to display on the profile page
 */

export function userProfile() {
  const url = new URL(location.href);
  const selectedUser = url.searchParams.get("name");
  const apiProfiles = "/profiles";
  const userFlags = "?_listings=true";
  var currentUser;

  if (selectedUser == null) {
    currentUser = `${storage.load("user").name}`;
  } else {
    currentUser = `${selectedUser}`;
  }

  const userProfile = fetchData(apiPath, apiProfiles, currentUser, userFlags);

  return userProfile;
}
