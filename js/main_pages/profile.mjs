import { apiPath } from "../api/api.mjs";
import { fetchData } from "../api/data/fetch.mjs";
import { checkLoggedIn } from "../handlers/checkLoggedIn.mjs";
import { updateAvatarListener } from "../handlers/editAvatar.mjs";
import { userProfile } from "../handlers/fetchUserData.mjs";
import * as storage from "../handlers/storage.mjs";

const displayName = document.querySelector("#userName");
const profilePicture = document.querySelector("#profilePicture");
const profilePictureDiv = document.querySelector("#profilePictureDiv");
const pageTitle = document.querySelector("title");
const userDetails = document.querySelector("#userDetails");
const listListings = document.querySelector("#listListings");
const listBids = document.querySelector("#listBids");
const bidsWon = document.querySelector("#bidsWon");
const createButton = document.querySelector("#createNew");
const updateAvatar = document.querySelector("#updateAvatar");

const apiProfiles = "/profiles";

function userBids() {
  const url = new URL(location.href);
  const selectedUser = url.searchParams.get("name");
  const bidListings = "?_listings=true";
  var currentUserBids;
  if (selectedUser == null) {
    currentUserBids = `${storage.load("user").name}/bids`;
  } else {
    currentUserBids = `${selectedUser}/bids`;
  }
  const userBids = fetchData(apiPath, apiProfiles, currentUserBids, bidListings);

  return userBids;
}

const user = await userProfile();
const bids = await userBids();

function renderProfile() {
  displayName.innerHTML += user.name;
  pageTitle.innerHTML = `World Auction - ${user.name}`;

  if (user.avatar == "" || user.avatar == null) {
    profilePictureDiv.innerHTML = `<h2 class="h-100"> No Avatar </h2>`;
  } else {
    profilePicture.src = user.avatar;
  }

  const url = new URL(location.href);
  const selectedUser = url.searchParams.get("name");

  if (checkLoggedIn() == true && selectedUser == null) {
    updateAvatar.innerHTML += `<form id="avatarForm">
    <div class="form-floating">
              <input type="url" class="form-control" name="avatar" id="avatar" placeholder="Avatar" required pattern=".*\.jpg|.png|.gif$"></input>
              <label for="avatar"> Avatar (url jpg,png,gif) </label>
    </div>
    <button type="submit" id="avatarButton" class="btn btn-secondary my-1"> Update Users Avatar </button>
    </form> `;

    updateAvatarListener(user.name);
    createButton.classList.remove("d-none");

    user.listings.forEach((listing) => {
      listListings.innerHTML += `<div class="col shadow border rounded-4 p-0 m-2"> 
    <div> <img id="listingImg" class="img-fluid rounded-4" src="${listing.media[0]}" alt="image of item listed for auction"> </div>
    <div> <h5>${listing.title}</h5> <a href="create_edit.html?id=${listing.id}&page=edit"> <button class="btn btn-secondary m-2">Edit</button></a><a href="auctions.html?search=${listing.id}"><button class="btn btn-secondary m-2">View</button></a></div>
    </div>`;
    });
  } else {
    user.listings.forEach((listing) => {
      listListings.innerHTML += `<div class="col shadow border rounded-4 p-0 m-2"> 
  <div> <img id="listingImg" class="img-fluid rounded-4" src="${listing.media[0]}" alt="image of item listed for auction"> </div>
  <div> <h5>${listing.title}</h5><a href="auctions.html?search=${listing.id}"> <button class="btn btn-secondary m-2"> View </button></a></div>
  </div>`;
    });
  }

  userDetails.innerHTML = `<p>Name: ${user.name}</p>
  <p>Available Credits: ${user.credits} $</p>
<p>Email: ${user.email}</p>
<p>Listed Items: ${user.listings.length}</p>
<p>Open Bids: ${bids.length}</p>
<p>Auctions Won: ${user.wins.length}</p>

`;

  bids.forEach((bid) => {
    listBids.innerHTML += `<div class="border rounded-4"> 
  <div> <a href="auctions.html?search=${bid.listing.id}"><p>Bid ${bid.amount} credits on "${bid.listing.title}" the auction ends: ${bid.listing.endsAt} </p></a> </div>
  </div>`;
  });

  user.wins.forEach((win) => {
    bidsWon.innerHTML += `<div class="col border rounded-4 m-4"> 
  <div> <a href="auctions.html?search=${win}"><p>User won the Bid on Auction ${win}</p></a> </div>
  </div>`;
  });
}

renderProfile();
