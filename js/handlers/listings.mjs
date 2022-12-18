import { apiPath } from "../api/api.mjs";
import { fetchAllData, fetchData } from "../api/data/fetch.mjs";
import { checkLoggedIn } from "./checkLoggedIn.mjs";
import { userProfile } from "./fetchUserData.mjs";
import { placeBids } from "./placeBid.mjs";
import * as storage from "./storage.mjs";
import { renderListingsTemplate, renderListingTemplate } from "../templates/listing.mjs";

const apiListings = "/listings";
const listingFlags = "?_seller=true&_bids=true";

export async function listingsFetch() {
  const sortOld = document.querySelector("#sortOld");
  const sortNew = document.querySelector("#sortNew");
  const sortActive = document.querySelector("#sortActive");
  const sortInactive = document.querySelector("#sortInactive");
  const previousButton = document.querySelector("#previousPage");
  const nextButton = document.querySelector("#nextPage");
  const sortEnding = document.querySelector("#endingSoon");
  const displayPage = document.querySelector("#pageNumber");
  const container = document.querySelector("#listings");
  const sortDisplay = document.querySelector("#sortDisplay");
  const sortDiv = document.querySelector("#sortDiv");
  const pagePick = document.querySelector("#changePage");
  const searchBox = document.querySelector("#search");
  const createButton = document.querySelector("#createNew");
  const auctionTitle = document.querySelector("#auctionTitle");

  let limit = 10;
  let offset = 0;

  storage.save("currentPage", offset);
  let activeStatus = "_active=true";
  var currentSort = storage.load("currentSort");
  var currentPage = storage.load("currentPage");

  if (currentPage == "" || currentPage == null) {
    storage.save("currentPage", 1);
    currentPage = storage.load("currentPage");
  }

  if (currentSort == "" || currentSort == null) {
    storage.save("currentActive", "_active=true");
    storage.save("sortDisplay", "Newest");
    storage.save("currentSort", "&sort=created&sortOrder=desc");
    currentSort = storage.load("currentSort");
  }

  if (checkLoggedIn() == true) {
    const userData = await userProfile();
    const userListings = userData.listings;
    storage.save("userListings", userListings);
  }

  /**
   * Searches the entire api for posts
   * by searchTerm
   * text or post ID
   */

  function Search() {
    const form = document.querySelector("#search");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const searchTerm = Object.fromEntries(formData.entries()).search;
        loadEntirePostLibrary(searchTerm.toLowerCase());
      });
    }
  }

  /**
   * Loads as many as possible api posts (total is custom set) then returns only objects in array that match the search input
   * @param {string} searchTerm the input from search field
   */

  async function loadEntirePostLibrary(searchTerm) {
    let limit = 100;
    let sort = storage.load("currentSort");
    let offset = 0;
    const listingsToSearch = await fetchAllData(apiPath, apiListings, activeStatus, limit, sort, offset);
    const searchedListings = listingsToSearch.filter((listing) => {
      if (
        listing.title.toLowerCase().includes(searchTerm) == true ||
        String(listing.description).toLowerCase().includes(searchTerm) == true ||
        listing.seller.name.toLowerCase().includes(searchTerm) == true ||
        listing.id == searchTerm
      ) {
        return true;
      }
    });
    console.log(searchedListings);
    container.innerHTML = "";
    if (searchedListings.length == 0) {
      container.innerHTML = "<h3>No Listings Matched the Search</h3>";
    } else {
      renderListingsTemplate(searchedListings, container);
    }
  }

  Search();

  /**
   * Loads listings to page
   * @param {number} activeStatus a sorting parameter saved to localstorage
   * @param {number} limit how many listings to load
   * @param {string} sort query string to tell api how to return array
   * @param {number} offset number tells the api how many post from the first in the array to return, used to cycle through page by page
   */

  async function loadListings(activeStatus, limit, sort, offset) {
    const url = new URL(location.href);
    const searchUrl = url.searchParams.get("search");
    if (searchUrl != null) {
      var listings = await fetchData(apiPath, apiListings, searchUrl, listingFlags);
      renderListingTemplate(listings, container);
      pagePick.classList.add("d-none");
      sortDiv.classList.add("d-none");
      searchBox.classList.add("d-none");
      createButton.classList.add("d-none");
      auctionTitle.innerHTML = "Listing";
    } else {
      listings = await fetchAllData(apiPath, apiListings, activeStatus, limit, sort, offset);
      renderListingsTemplate(listings, container);
    }
    let currentPage = Number(storage.load("currentPage"));
    var showSort = storage.load("sortDisplay");
    const activeCheck = storage.load("currentActive");
    var activePost;
    if (activeCheck == "_active=true") {
      activePost = " Active";
    } else {
      activePost = " Inactive";
    }
    sortDisplay.innerHTML = "Currently Sorted by: " + showSort + activePost;
    displayPage.innerHTML = currentPage;
    placeBids();
    return listings;
  }

  loadListings(activeStatus, limit, currentSort, offset);

  sortOld.addEventListener("click", () => {
    storage.save("currentSort", "&sort=created&sortOrder=asc");
    const currentSort = storage.load("currentSort");
    const activeStatus = storage.load("currentActive");
    const offset = 0;
    storage.save("currentPage", "1");
    let currentPage = Number(storage.load("currentPage"));
    storage.save("sortDisplay", "Oldest");
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
  });

  sortNew.addEventListener("click", () => {
    storage.save("currentSort", "&sort=created&sortOrder=desc");
    const currentSort = storage.load("currentSort");
    const activeStatus = storage.load("currentActive");
    const offset = 0;
    storage.save("currentPage", "1");
    let currentPage = Number(storage.load("currentPage"));
    storage.save("sortDisplay", "Newest");
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
  });

  sortActive.addEventListener("click", () => {
    storage.save("currentActive", "_active=true");
    const activeStatus = storage.load("currentActive");
    const currentSort = storage.load("currentSort");
    const offset = 0;
    storage.save("currentPage", "1");
    let currentPage = Number(storage.load("currentPage"));
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
  });

  sortInactive.addEventListener("click", () => {
    storage.save("currentActive", "_active=false");
    const activeStatus = storage.load("currentActive");
    const currentSort = storage.load("currentSort");
    const offset = 0;
    storage.save("currentPage", "1");
    let currentPage = Number(storage.load("currentPage"));
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
  });

  previousButton.addEventListener("click", () => {
    if (offset != 0) offset = offset - 10;
    let currentPage = Number(storage.load("currentPage"));
    if (currentPage != 1) currentPage = currentPage - 1;
    storage.save("currentPage", currentPage);
    const activeStatus = storage.load("currentActive");
    const currentSort = storage.load("currentSort");
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
    window.scrollTo(0, 0);
  });

  nextButton.addEventListener("click", () => {
    offset = offset + 10;
    let currentPage = Number(storage.load("currentPage"));
    currentPage = currentPage + 1;
    storage.save("currentPage", currentPage);
    const activeStatus = storage.load("currentActive");
    const currentSort = storage.load("currentSort");
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
    window.scrollTo(0, 0);
  });

  sortEnding.addEventListener("click", () => {
    storage.save("currentSort", "&sort=endsAt&sortOrder=asc");
    storage.save("currentActive", "_active=true");
    const activeStatus = storage.load("currentActive");
    const currentSort = storage.load("currentSort");
    const offset = 0;
    storage.save("currentPage", "1");
    storage.save("sortDisplay", "Ending Soon");
    let currentPage = Number(storage.load("currentPage"));
    displayPage.innerHTML = currentPage;
    container.innerHTML = "";
    loadListings(activeStatus, limit, currentSort, offset);
  });
}
