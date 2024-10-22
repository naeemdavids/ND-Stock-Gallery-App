// Import the SearchImageResults type which represents the structure of the response from the Pexels API.
import type { SearchVideoResults } from "@/models/Videos";

// Function to extract the current page number from the given URL.
// Uses URL API to parse the 'page' parameter from the query string.
function getThisPageNumber(url: string) {
  const { searchParams } = new URL(url); // Parse the URL to extract query parameters.
  return searchParams.get("page"); // Return the value of the 'page' parameter.
}

// Function to determine the next and previous page numbers for pagination.
// Takes in the search results data (of type SearchImageResults) and returns the page numbers.
export default function nextAndPrevPages(videos: SearchVideoResults) {
  // Determine the next page number if available, otherwise set it to null.
  let nextPage = videos?.next_page ? getThisPageNumber(videos.next_page) : null;

  // Determine the previous page number if available, otherwise set it to null.
  const prevPage = videos?.prev_page
    ? getThisPageNumber(videos.prev_page)
    : null;

  // Calculate the total number of pages based on the total results and the number of results per page.
  // If the total results is not evenly divisible by results per page, use Math.ceil to round up.
  const totalPages =
    videos.total_results % videos.per_page // Check if there's a remainder when dividing total results by per_page.
      ? Math.ceil(videos.total_results / videos.per_page) // If so, round up to the nearest integer.
      : videos.total_results / videos.per_page + 1; // Otherwise, add 1 for the total number of pages.

  // If the prevPage exists and there are at least 5 pages ahead, set nextPage to 5 pages after prevPage.
  if (prevPage && parseInt(prevPage) + 5 < totalPages) {
    nextPage = (parseInt(prevPage) + 5).toString(); // Set nextPage to prevPage + 5.
  }

  // If the calculated nextPage exceeds or equals the total number of pages, set nextPage to null.
  if (nextPage && parseInt(nextPage) >= totalPages) nextPage = null;

  // Return both the previous and next page numbers.
  return { prevPage, nextPage };
}
