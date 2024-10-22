// Import the VideoGallery component, which is used to display a gallery of videos.
import VideoGallery from "@/app/components/VideoGallery";

// Define the type for the props that the component receives.
// `params` contains an array of strings, where the first item is the search topic and the second is the page number.
type Props = {
  params: {
    pageParams: (string | undefined)[]; // An array that can contain strings or undefined values(if there is no search topic).
  };
};

// Function to dynamically generate metadata for the page based on the URL parameters.
// This is useful for setting the page title and improving SEO.
export function generateMetadata({ params: { pageParams } }: Props) {
  // Extract the search topic from the first element of pageParams (default to "popular" if not provided).
  const searchTopic = pageParams?.[0] ?? "popular";

  // Extract the page number from the second element of pageParams (default to "1" if not provided).
  const page = pageParams?.[1] ?? "1";

  // Return an object containing the metadata for the page.
  return {
    title: `Results for ${searchTopic} - Page ${page}`, // Page title dynamically changes based on the search topic and page number.
  };
}

// Main component that displays search results.
// Receives the URL parameters (search topic and page number) via `params`.
export default function SearchResults({ params: { pageParams } }: Props) {
  // Extract the search topic from the first element of pageParams, defaulting to "popular" if no topic is specified.
  const searchTopic = pageParams?.[0] ?? "popular";

  // Extract the page number from the second element of pageParams, defaulting to "1" if not specified.
  const page = pageParams?.[1] ?? "1";

  // Render the VideoGallery component, passing the search topic and page as props.
  return <VideoGallery searchTopic={searchTopic} page={page} />;
}
