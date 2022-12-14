import { authFetch } from "../authFetch.mjs";

export async function fetchAllData(baseURL, dataURL, activeStatus, limit, sort, offset) {
  const fetchAllDataURL = `${baseURL}${dataURL}?_seller=true&_bids=true&${activeStatus}&limit=${limit}&offset=${offset}${sort}`;

  const response = await authFetch(fetchAllDataURL);

  return await response.json();
}

export async function fetchData(baseURL, dataURL, id, option) {
  const fetchDataURL = `${baseURL}${dataURL}/${id}${option}`;

  const response = await authFetch(fetchDataURL);

  return await response.json();
}
