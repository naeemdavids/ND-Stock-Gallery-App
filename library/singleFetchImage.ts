import type { Photo } from "@/models/Images"; // Import the TypeScript type for a single photo.
import { ImagePhotoSchema } from "@/models/Images"; // Import the Zod schema for photo data validation.
import env from "./env"; // Import environment variables (like the Pexels API key).

// Function to fetch details of a single photo by its ID.
export default async function singleFetchImage(
  id: number // Accepts the photo ID as a parameter.
): Promise<Photo | undefined> {
  try {
    // Construct the API URL to fetch a specific photo using its ID.
    const url = `https://api.pexels.com/v1/photos/${id}`;

    // Make a request to the Pexels API with the necessary authorization header.
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY, // Include the API key in the request header.
      },
    });

    // If the response is not successful (status code is not 200-299), throw an error.
    if (!res.ok) throw new Error("Error Fetching Image Data");

    // Parse the response data as JSON.
    const data = await res.json();

    // Use Zod to validate and parse the response data into the expected structure.
    const parsedPhoto = ImagePhotoSchema.parse(data);

    // Return the validated photo data.
    return parsedPhoto;
  } catch (err) {
    // If an error occurs, log the error stack trace for debugging purposes.
    if (err instanceof Error) console.log(err.stack);
  }
}
