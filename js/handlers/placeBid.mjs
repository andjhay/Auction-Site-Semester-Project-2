import { createBid } from "../api/data/create.mjs";

/**
 * Function to gather input from bid form and reformat into usable object to send to api
 */

export async function placeBids() {
  const bidForms = document.querySelectorAll("#bidForm");

  bidForms.forEach((form) => {
    const id = form.children[1].id;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const bidData = [...formData.entries()];
      const numBidData = bidData.map(([key, value]) => [key, Number(value)]);
      const bid = Object.fromEntries(numBidData);
      createBid(id, bid);
    });
  });
}
