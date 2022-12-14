import { userProfile } from "../../handlers/fetchUserData.mjs";
import { apiPath } from "../api.mjs";
import { authFetch } from "../authFetch.mjs";
import * as storage from "../../handlers/storage.mjs";

const action = "/listings";
const method = "post";

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
  window.location.href = `auctions.html?search=${id}`;
  return await response.json();
}
