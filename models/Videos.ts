import { z } from "zod";

// Define a schema for pagination and video selection details returned by the Pexels API.
const VideoSelectionSchema = z.object({
  page: z.number(), // Current page number in the pagination.
  per_page: z.number(), // Number of videos returned per page.
  prev_page: z.string().optional(), // URL for the previous page (optional, may not exist).
  next_page: z.string().optional(), // URL for the next page (optional, may not exist).
  total_results: z.number(), // Total number of search results across all pages.
  url: z.string(), // URL of the search or curated videos.
});

// Define a schema for individual video file details.
const VideoFileSchema = z.object({
  id: z.number(), // Unique identifier for the video file.
  quality: z.string(), // Quality of the video (e.g., 'hd', 'sd').
  file_type: z.string(), // The type of the file (e.g., 'video/mp4').
  width: z.number().nullable(), // Width of the video (nullable if not available).
  height: z.number().nullable(), // Height of the video (nullable if not available).
  fps: z.number().optional(), // Frames per second of the video (optional field).
  link: z.string(), // URL link to the video file.
});

// Define a schema for video pictures (preview images for the video).
const VideoPictureSchema = z.object({
  id: z.number(), // Unique identifier for the preview picture.
  picture: z.string(), // URL of the preview picture.
  nr: z.number(), // The order of the picture in the sequence.
});

// Define a schema for individual video data returned by the Pexels API.
export const VideoSchema = z.object({
  id: z.number(), // Unique identifier for the video.
  width: z.number(), // Width of the video in pixels.
  height: z.number(), // Height of the video in pixels.
  url: z.string(), // URL to the video on Pexels' website.
  image: z.string(), // URL to the thumbnail or poster image for the video.
  full_res: z.string().nullable(), // Full resolution video URL (nullable if not available).
  tags: z.array(z.string()), // Array of tags associated with the video.
  duration: z.number(), // Duration of the video in seconds.
  user: z.object({
    id: z.number(), // Unique identifier for the photographer or videographer.
    name: z.string(), // Name of the photographer or videographer.
    url: z.string(), // URL to the user’s Pexels profile.
  }),
  video_files: z.array(VideoFileSchema), // Array of available video files.
  video_pictures: z.array(VideoPictureSchema), // Array of video preview pictures.
});

// Combine both selection and video data into a single schema.
export const VideoSelectionAndVideoSchema = VideoSelectionSchema.extend({
  videos: z.array(VideoSchema), // Array of videos returned in the response.
});

// Infer the TypeScript type for a single video from the VideoSchema.
export type Video = z.infer<typeof VideoSchema>;

// Infer the TypeScript type for the overall search results (including pagination and videos).
export type SearchVideoResults = z.infer<typeof VideoSelectionAndVideoSchema>;
