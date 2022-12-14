// Template functions for visually displaying posts

import { checkLoggedIn } from "../handlers/checkLoggedIn.mjs";
import { load } from "../handlers/storage.mjs";

export function listingTemplate(listingData) {
  const createdDate = `${
    listingData.created.slice(8, 10) +
    "-" +
    listingData.created.slice(5, 7) +
    "-" +
    listingData.created.slice(0, 4) +
    " " +
    listingData.created.slice(11, 19)
  }`;
  const endingDate = `${
    listingData.endsAt.slice(8, 10) +
    "-" +
    listingData.endsAt.slice(5, 7) +
    "-" +
    listingData.endsAt.slice(0, 4) +
    " " +
    listingData.endsAt.slice(11, 19)
  }`;

  const listing = document.createElement("div");
  const listingImg = document.createElement("div");
  const listingDetails = document.createElement("div");
  const bids = document.createElement("ol");

  var highestBid = 0;

  listingData.bids.reverse().forEach((bid, i) => {
    if (i === 0) {
      highestBid = bid.amount;
    } else if (highestBid < bid.amount) {
      highestBid = bid.amount;
    }
    bids.innerHTML += `<li id="${bid.amount}"> <a href="userprofile.html?name=${bid.bidderName}"> ${bid.bidderName} - ${bid.amount} </a></li>`;
  });

  var aboveHighestBid;

  if (highestBid === Number(highestBid)) {
    aboveHighestBid = highestBid + 1;
  } else {
    aboveHighestBid = 1;
  }

  listing.classList.add("d-flex", "border", "rounded-4", "shadow-lg", "m-2", "p-3");
  listingDetails.classList.add("w-50", "border", "rounded-4", "shadow-lg", "m-2", "p-3", "text-start");
  listingImg.classList.add("w-50");

  listingData.media.forEach((img) => {
    listingImg.innerHTML += `<img class="m-4 rounded-4" src="${img}" width="50%">`;
  });

  listingDetails.innerHTML += `
   <h2>${listingData.title}</h2> <a href="userprofile.html?name=${listingData.seller.name}">Sold by :<h5>${listingData.seller.name}</h5></a> <p>Auction created at: ${createdDate}</br>Auction will end at: ${endingDate}</p> <h5>Description:</h5><p>${listingData.description}</p> 
  <h5>Bids - Highest Bid: ${highestBid} credits</h5></div>
  `;

  listing.appendChild(listingImg);
  listing.appendChild(listingDetails);
  listingDetails.appendChild(bids);

  function matchListing(listing) {
    if (listing.id == listingData.id) {
      return true;
    }
  }

  if (checkLoggedIn() == true) {
    const userData = load("user");
    const userListings = load("userListings");

    const checkIdMatch = userListings.some(matchListing);

    if (checkIdMatch == true) {
      listingDetails.innerHTML += `<div class="w-50"> <a href="create_edit.html?id=${listingData.id}&page=edit"> <button class="btn btn-secondary mt-4 w-100"> Edit </button></a> </div>`;
    } else {
      listingDetails.innerHTML += `<div class="w-50">
  <form id="bidForm">
  <input type="number" name="amount" class="form-control w-100" required min="${aboveHighestBid}" max="${
        userData.credits
      }" value="${Number(aboveHighestBid)}"></input>
  <button type="submit" id="${listingData.id}" class="btn btn-secondary my-1 w-100"> Place Bid </button>
  </form> 
  </div>
  `;
    }
  }

  return listing;
}

export function renderListingsTemplate(listingData, container) {
  container.append(...listingData.map(listingTemplate));
}

export function renderListingTemplate(listingData, container) {
  container.append(listingTemplate(listingData));
}
