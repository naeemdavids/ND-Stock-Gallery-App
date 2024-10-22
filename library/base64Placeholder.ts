/*
This code fetches images, generates a blurred base64 placeholder for each one, and adds this data to the images, 
allowing for a blurred placeholder to be displayed while the full image loads.
*/

// Importing the 'getPlaiceholder' function from the plaiceholder package, to generate a base64 placeholder for an image.
// Importing 'Photo' and 'SearchImageResults' types from our models for type checking.
import { getPlaiceholder } from "plaiceholder";
import type { Photo, SearchImageResults } from "@/models/Images";

// This async function takes an image URL as input and returns its base64 placeholder (blurred image).
async function getBase64Placeholder(imageUrl: string) {
  try {
    // Fetching the image from the provided URL.
    const res = await fetch(imageUrl);

    // If the fetch fails, throw an error.
    if (!res.ok) {
      throw new Error(`Image Fetch Error: ${res.status}`);
    }

    // Convert the response to an array buffer.
    const buffer = await res.arrayBuffer();

    // Pass the data to 'getPlaiceholder' to generate a base64 string.
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    // Return the base64 string.
    return base64;
  } catch (err) {
    // If there's an error during fetch or processing, log the error's stack trace.
    if (err instanceof Error) console.log(err.stack);
  }
}

/*
This function processes a list of images (of type 'SearchImageResults'),
and returns an array of photos where each photo has a blurred placeholder image (base64 format).
*/
export default async function createBlurredDataUrls(
  images: SearchImageResults
): Promise<Photo[]> {
  // Fetch base64 placeholders for each image in parallel (all at once instead of one by one).
  const parallelBase64Promises = images.photos.map((photo) =>
    getBase64Placeholder(photo.src.large)
  );

  // Wait until all the placeholder fetch promises are resolved.
  const base64PromiseResults = await Promise.all(parallelBase64Promises);

  // Map over the original images and assign each of them a 'blurredDataUrl' property.
  // This helps create a smooth blurred image placeholder while the full image is loading.
  const blurForPhotos: Photo[] = images.photos.map((photo, i) => {
    photo.blurredDataUrl = base64PromiseResults[i]; // Assigning the blurred image.
    return photo; // Returning the updated photo object.
  });

  // Return the list of photos with blurred placeholders added.
  return blurForPhotos;
}
