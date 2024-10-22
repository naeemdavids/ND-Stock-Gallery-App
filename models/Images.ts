// Import the Zod library for schema validation and type inference.
import { z } from "zod";

// Define a schema for pagination and image selection details returned by the Pexels API.
const ImageSelectionSchema = z.object({
  page: z.number(), // The current page number in the pagination.
  per_page: z.number(), // Number of images returned per page.
  prev_page: z.string().optional(), // URL for the previous page (optional, may not exist).
  next_page: z.string().optional(), // URL for the next page (optional, may not exist).
  total_results: z.number(), // Total number of search results across all pages.
});

// Define a schema for individual image data returned by the Pexels API.
export const ImagePhotoSchema = z.object({
  id: z.number(), // Unique identifier for the image.
  width: z.number(), // Width of the image in pixels.
  height: z.number(), // Height of the image in pixels.
  url: z.string(), // URL to the image on Pexels' website.
  src: z.object({
    large: z.string(), // URL to the 'large' version of the image.
    large2x: z.string(), // URL to the 'large2x' version of the image for detailed view.
  }),
  photographer: z.string(), // Photographer's name.
  alt: z.string(), // Alternative text for the image, useful for accessibility.
  blurredDataUrl: z.string().optional(), // Optional base64 string for the blurred image placeholder (used in lazy loading).
});

// Combine both selection and photo data into a single schema.
export const ImageSelectionAndPhotoSchema = ImageSelectionSchema.extend({
  photos: z.array(ImagePhotoSchema), // Array of photos returned in the response.
});

// Infer the TypeScript type for a single photo from the ImagePhotoSchema.
export type Photo = z.infer<typeof ImagePhotoSchema>;

// Infer the TypeScript type for the overall search results (including pagination and photos).
export type SearchImageResults = z.infer<typeof ImageSelectionAndPhotoSchema>;
