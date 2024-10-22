import fetchVideos from "@/library/fetchVideos";
import type { SearchVideoResults } from "@/models/Videos";
import VideoLayout from "./VideoLayout";
import videoNextAndPrevPages from "@/library/videoNextAndPrevPages";
import VideoFooterNavbar from "./VideoFooterNavbar";

// Define the expected props for the VideosGallery component.
type Props = {
  searchTopic?: string | undefined; // Optional search term for querying images, defaults to 'curated'.
  page?: string | undefined; // Optional page number for pagination, if not provided defaults to the first page.
};

export default async function VideoGallery({
  searchTopic = "popular",
  page,
}: Props) {
  let videoUrl;

  if (searchTopic === "popular") {
    videoUrl = page
      ? `https://api.pexels.com/videos/popular?page=${page}` // If a page number is provided, append it to the URL for pagination.
      : "https://api.pexels.com/videos/popular";
  } else if (!page) {
    // If a search topic is provided but no page number, defaults to the first page of search results.
    videoUrl = `https://api.pexels.com/videos/search?query=${searchTopic}`;
  } else {
    // If both search topic and page number are provided, handle pagination for search results.
    videoUrl = `https://api.pexels.com/videos/search?query=${searchTopic}&page=${page}`;
  }

  const videos: SearchVideoResults | undefined = await fetchVideos(videoUrl);

  if (!videos) return <h2>No Videos Found</h2>;

  // Get the next and previous page numbers for pagination from the fetched images.
  const { nextPage, prevPage } = videoNextAndPrevPages(videos);

  // Prepare the props for the FooterNavbar component, including pagination data.
  const videoFooterNavbarProps = { searchTopic, page, nextPage, prevPage };

  return (
    <>
      <section className="px-1 my-3 flex flex-wrap gap-3 justify-around">
        {videos.videos.map((video) => (
          <div key={video.id} className="flex justify-center">
            {/* Pass the video_files array to PreviewVideoFiles component */}
            <VideoLayout videoFiles={video.video_files} videoId={video.id} />
          </div>
        ))}
      </section>

      {/* Footer: Pagination controls to navigate to the next and previous pages. */}
      <VideoFooterNavbar {...videoFooterNavbarProps} />
    </>
  );
}
