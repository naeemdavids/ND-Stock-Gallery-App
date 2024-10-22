import { notFound } from "next/navigation"; // Import the notFound function to handle 404 pages.
import singleFetchVideo from "@/library/singleFetchVideos";
import { Video } from "@/models/Videos";
import VideoDetailsLayout from "@/app/components/VideoDetailsLayout";
import extractVideoTitleFromUrl from "@/library/extractVideoTitleFromUrl"; // Import the function.

// Code for when the user clicks on a video in the popular or search results.
// Which then leads to the video's own page.

type VideoPageProps = {
  params: { id: string }; // The dynamic route parameter for the video ID.
};

// Define an async function for generating metadata, which will set the document title dynamically.
export async function generateMetadata({ params }: VideoPageProps) {
  const { id } = params; // Destructure the id from params.

  // Convert `id` to a number since the Pexels API expects a numeric ID.
  // The '10' indicates the base of the number system to use for conversion (base 10 for decimal).
  const videoId = parseInt(id, 10);

  // Fetch the single video data using the photoId.
  const video: Video | undefined = await singleFetchVideo(videoId);

  // If no Video is found.
  if (!video) {
    return {
      title: "Video not found", // Fallback title if the Video is not found.
    };
  }

  // Use the URL to generate a title for the video.
  const videoTitle = extractVideoTitleFromUrl(video.url);

  // Set the tab title to the Video's name.
  return {
    title: videoTitle,
  };
}

// Default exported async function for the video page component.
export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = params; // Destructure the id from params.

  // Convert `id` to a number since the Pexels API expects a numeric ID.
  const videoId = parseInt(id, 10); // '10' specifies that the conversion should be done using base 10.

  // Fetch the single video data using the photoId.
  const video: Video | undefined = await singleFetchVideo(videoId);

  // If no photo is found, trigger a 404 page.
  if (!video) {
    notFound(); // Call the notFound function to display a 404 error.
  }

  return <VideoDetailsLayout video={video} />;
}
