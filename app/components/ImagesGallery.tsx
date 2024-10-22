import fetchImages from "@/library/fetchImages"; // Function to fetch images from Pexels API.
import type { SearchImageResults } from "@/models/Images"; // Type definition for the structure of API response.
import ImageLayout from "./ImageLayout"; // Component responsible for rendering individual images.
import createBlurredDataUrls from "@/library/base64Placeholder"; // Utility to create base64 blurred placeholders for lazy loading.
import nextAndPrevPages from "@/library/nextAndPrevPages"; // Function to calculate the next and previous page numbers for pagination.
import ImagesFooterNavbar from "./ImagesFooterNavbar"; // Footer component containing pagination navigation.

// Define the expected props for the ImagesGallery component.
type Props = {
  searchTopic?: string | undefined; // Optional search term for querying images, defaults to 'curated'.
  page?: string | undefined; // Optional page number for pagination, if not provided defaults to the first page.
};

// The main functional component for the image gallery.
export default async function ImagesGallery({
  searchTopic = "curated", // Default search topic is 'curated' if none is provided.
  page, // Page number is optional, if not passed, first page will be used.
}: Props) {
  let url; // Declare variable to hold the API endpoint URL.

  // Check if user is browsing curated photos or searching for specific topics.
  if (searchTopic === "curated") {
    // If the topic is 'curated', handle pagination for curated photos.
    url = page
      ? `https://api.pexels.com/v1/curated?page=${page}` // If a page number is provided, append it to the URL for pagination.
      : "https://api.pexels.com/v1/curated"; // If no page number is provided, default to the first page of curated photos.
  } else if (!page) {
    // If a search topic is provided but no page number, defaults to the first page of search results.
    url = `https://api.pexels.com/v1/search?query=${searchTopic}`;
  } else {
    // If both search topic and page number are provided, handle pagination for search results.
    url = `https://api.pexels.com/v1/search?query=${searchTopic}&page=${page}`;
  }

  // Fetch images from the Pexels API using the constructed URL.
  const images: SearchImageResults | undefined = await fetchImages(url);

  // Check if any images were returned by the API.
  // If not, display a message to the user that no images were found.
  if (!images || images.per_page === 0)
    return (
      <h2 className="text-2xl font-bold m-2">Sorry, Could Not Find Images.</h2>
    );

  // Create blurred placeholders for the images to improve perceived performance when lazy loading.
  const photosPlusBlur = await createBlurredDataUrls(images);

  // Get the next and previous page numbers for pagination from the fetched images.
  const { nextPage, prevPage } = nextAndPrevPages(images);

  // Prepare the props for the FooterNavbar component, including pagination data.
  const footerNavbarProps = { searchTopic, page, nextPage, prevPage };

  return (
    <>
      {/* Gallery section: Display images in a grid layout using Tailwind CSS. */}
      <section className="px-1 my-3 grid grid-cols-customGallery auto-rows-[10px]">
        {photosPlusBlur.map((photo) => (
          // Render each image in the gallery using ImageLayout component.
          // The blurred image placeholder is included for smoother transitions.
          <ImageLayout key={photo.id} photo={photo} />
        ))}
      </section>

      {/* Footer: Pagination controls to navigate to the next and previous pages. */}
      <ImagesFooterNavbar {...footerNavbarProps} />
    </>
  );
}
