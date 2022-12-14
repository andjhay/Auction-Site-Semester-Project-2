import { apiPath } from "../api/api.mjs";
import { fetchData } from "../api/data/fetch.mjs";
import * as storage from "../handlers/storage.mjs";

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
