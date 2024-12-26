// Import Next.js Link component for client-side navigation.
import Link from "next/link";

// Define the type for component props.
type Props = {
  searchTopic: string; // The search query or topic (default is "curated", or a custom search term).
  page: string | undefined; // Current page number (can be undefined for the first page).
  prevPage: string | null; // Previous page number, or null if not available.
  nextPage: string | null; // Next page number, or null if not available.
};

import React from "react";

// Functional component for the footer navigation.
export default function VideoFooterNavbar({
  searchTopic, // The search term being used.
  page, // The current page of the results.
  prevPage, // The previous page, if available.
  nextPage, // The next page, if available.
}: Props) {
  // If there are no previous or next pages, return nothing (hide the footer).
  if (!prevPage && !nextPage) return;

  // Array to store intermediate page numbers between prevPage and nextPage.
  const pageNumbers: number[] = [];

  // If both previous and next pages exist, generate the intermediate page numbers.
  if (prevPage && nextPage) {
    for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
      pageNumbers.push(i); // Populate the pageNumbers array with pages between prevPage and nextPage.
    }
  }

  // Next page navigation button (if nextPage exists).
  const nextPageButtonArea = nextPage ? (
    <Link
      href={
        searchTopic === "popular" // Check if the topic is "popular" (default topic).
          ? `/results/videos/popular/${nextPage}` // If popular, use the popular results URL.
          : `/results/videos/${searchTopic}/${nextPage}` // For custom search topics, construct URL with the topic and nextPage.
      }
      className={!prevPage ? "mx-auto" : ""} // Center the button if there's no previous page.
    >
      {!prevPage ? "More" : null} &gt;&gt;{" "}
      {/* Display "more" if no previous page, otherwise just ">>" */}
    </Link>
  ) : null;

  // Previous page navigation button and intermediate page links (if prevPage exists).
  const prevPageButtonArea = prevPage ? (
    <>
      {/* Link to the previous page. */}
      <Link
        href={`/results/videos/${searchTopic}/${prevPage}`} // Construct the URL for the previous page.
        className={!nextPage ? "mx-auto" : ""} // Center the button if there's no next page.
      >
        &lt;&lt; {!nextPage ? "back" : null}{" "}
        {/* Display "back" if no next page, otherwise just "<<" */}
      </Link>

      {/* Generate clickable links for intermediate pages between prevPage and nextPage. */}
      {/* We are mapping over the pageNumbers array, which contains the numbers between the prevPage and nextPage. */}
      {pageNumbers.map((pageNumber) =>
        // Check if the current pageNumber in the loop is equal to the page prop (which represents the current page).
        // If so, we display the number as plain text rather than a link, indicating the current page.
        page && pageNumber === parseInt(page) ? (
          // Show the current page number as plain text (non-clickable).
          // This highlights the current page to the user so they know where they are.
          pageNumber
        ) : (
          // For all other page numbers (not the current page), we generate clickable links.
          // These links allow the user to navigate between intermediate pages in the results.

          // Link component creates a clickable navigation link for each page number.
          // We dynamically construct the URL based on the searchTopic and the specific pageNumber in the loop.
          <Link
            key={pageNumber}
            href={`/results/videos/${searchTopic}/${pageNumber}`}
          >
            {`#${pageNumber}`}{" "}
            {/* Display the page number as a clickable link preceded by `#` for clarity. */}
          </Link>
        )
      )}
    </>
  ) : null;

  return (
    // Footer layout: a flex container that aligns the buttons horizontally and centers them within a fixed width.
    <footer className="flex flex-row justify-between items-center font-bold p-2 w-60 mx-auto text-white">
      {prevPageButtonArea}{" "}
      {/* Render the previous page and intermediate page links */}
      {nextPageButtonArea} {/* Render the next page link */}
    </footer>
  );
}
