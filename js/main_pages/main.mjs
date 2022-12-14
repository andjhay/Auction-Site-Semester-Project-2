import { setRegisterFormListener } from "../handlers/register.mjs";
import { setLoginFormListener } from "../handlers/login.mjs";
import { checkLoggedIn } from "../handlers/checkLoggedIn.mjs";
import { logOut } from "../handlers/logout.mjs";
import { listingsFetch } from "../handlers/listings.mjs";
import { createListingListener } from "../handlers/createListing.mjs";
import { updateListingListener } from "../handlers/editListing.mjs";

const pathOriginal = location.pathname;
const logOutButton = document.querySelector("#logOutButton");
const url = new URL(location.href);
const pageType = url.searchParams.get("page");

const path = pathOriginal.slice(pathOriginal.lastIndexOf("/") + 1);
if (path === "login.html") {
  setLoginFormListener();
} else if (path === "register.html") {
  logOutButton.Disabled = true;
  setRegisterFormListener();
} else {
  checkLoggedIn(path);
}

if (path === "auctions.html") {
  listingsFetch();
  const createButton = document.querySelector("#createNew");
  if (checkLoggedIn() == true) {
    createButton.classList.remove("d-none");
  }
}

const currentDate = new Date();

const dateFormatted =
  currentDate.getFullYear() +
  "-" +
  (currentDate.getMonth() + 1) +
  "-" +
  (currentDate.getDate() + 1) +
  "T" +
  currentDate.getHours() +
  ":" +
  currentDate.getMinutes();

if (path === "create_edit.html") {
  if (pageType == "create") {
    const createButton = document.querySelector("#createButton");
    createButton.classList.remove("d-none");
    const mediaButton = document.querySelector("#addMedia");
    mediaButton.classList.remove("d-none");
    createListingListener(dateFormatted);
  } else if (pageType == "edit") {
    const editButton = document.querySelector("#editButton");
    editButton.classList.remove("d-none");
    const deleteButton = document.querySelector("#deleteButton");
    deleteButton.classList.remove("d-none");
    const dateField = document.querySelector("#dateField");
    dateField.classList.add("d-none");
    const dateInput = document.querySelector("#date");
    dateInput.required = false;
    updateListingListener(dateFormatted);
  }
}

logOut();
