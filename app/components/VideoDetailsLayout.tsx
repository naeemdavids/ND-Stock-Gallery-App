import React from "react";
import { Video } from "@/models/Videos";
import extractVideoTitleFromUrl from "@/library/extractVideoTitleFromUrl"; // Import the function.

type VideoDetailsLayoutProps = {
  video: Video; // Expecting `video` to be passed in as a prop.
};

export default function VideoDetailsLayout({ video }: VideoDetailsLayoutProps) {
  // Find the HD video file or fallback to the first video file.
  const videoFile =
    video.video_files.find((file) => file.quality === "hd") ||
    video.video_files[0]; // Fall back to the first video file if no HD version is found.

  if (!videoFile) return <p>No video available</p>;

  // Use the URL to generate a title for the video
  const videoTitle = extractVideoTitleFromUrl(video.url);

  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* Display the extracted video title */}
      <p className="text-center mb-1 text-lg font-semibold">{videoTitle}</p>

      {/* Display the videographer's name */}
      <p className="text-center mb-1 text-lg">Video by {video.user.name}</p>

      {/* Display the video */}
      <video controls className="w-full h-auto">
        <source src={videoFile.link} type={videoFile.file_type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
