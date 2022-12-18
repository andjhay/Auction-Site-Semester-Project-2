import { userProfile } from "../../handlers/fetchUserData.mjs";
import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";
import * as storage from "../../handlers/storage.mjs";

const action = "/listings";
const method = "post";

/**
 * Sends listing data to the server
 * @param {string} listingData the input from create listing form
 */

export async function createListing(listingData) {
  const createListingURL = apiPath + action;
  if (listingData.media[0] == [""]) {
    delete listingData.media;
  }
  const response = await authFetch(createListingURL, {
    method,
    body: JSON.stringify(listingData),
  });
  alert(`Listing Created`);
  window.location.href = "userprofile.html";
  return await response.json();
}

/**
 * Sends bid data to the server
 * @param {string} bidData the input bid input form
 * @param {string} id listing id
 */

export async function createBid(id, bidData) {
  const placeBidURL = apiPath + action + `/${id}` + "/bids";
  const body = JSON.stringify(bidData);
  const response = await authFetch(placeBidURL, {
    method,
    body,
  });
  const user = await userProfile();
  storage.save("user", user);
  alert(`Bid Placed`);
  location.reload();
  return await response.json();
}
