"use client"; // Directive for client-side interactivity.
import Link from "next/link"; // Import the Next.js Link component for client-side navigation to the full image page.
import React, { useRef } from "react";

interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number | null;
  height: number | null;
  fps?: number;
  link: string;
}

interface VideoLayoutProps {
  videoFiles: VideoFile[]; // Array of video files with different quality and formats.
  videoId: number; // The main video ID passed from the parent component.
}

const VideoLayout: React.FC<VideoLayoutProps> = ({ videoFiles, videoId }) => {
  // Find the SD video file.
  const sdVideo = videoFiles.find((file) => file.quality === "sd") || null; // Get the first SD video if available.

  // Ref to control the video element.
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!sdVideo) return <p>No SD Video Available</p>;

  // Function to handle video play on hover.
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Ensure the video is muted.
      videoRef.current.play(); // Play the video.
    }
  };

  // Function to handle video pause when hover ends.
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video.
      videoRef.current.currentTime = 0; // Reset the video to the beginning.
    }
  };

  return (
    <div className={`w-full max-w-[540px] justify-self-center`}>
      {/* Use the main videoId for linking to the detailed video page */}
      <Link
        href={`/video/${videoId}`} // Use the main video ID here.
        target="_blank" // Open the link in a new browser tab.
        className="grid place-content-center" // Center the video within its container.
      >
        <video
          ref={videoRef}
          onMouseEnter={handleMouseEnter} // Play on hover.
          onMouseLeave={handleMouseLeave} // Pause when hover ends.
          className="w-full h-auto"
        >
          <source src={sdVideo.link} type={sdVideo.file_type} />
          Your browser does not support the video tag.
        </video>
      </Link>
    </div>
  );
};

export default VideoLayout;
