// Import the types and Zod schema for validating the image data returned from the Pexels API.
import type { SearchImageResults } from "@/models/Images"; // Type representing the structure of the search results.
import { ImageSelectionAndPhotoSchema } from "@/models/Images"; // Zod schema used for validation.
import env from "./env"; // Import environment variables.

// This function fetches images from the Pexels API and returns the search results.
// The function is asynchronous and returns either SearchImageResults or undefined if an error occurs.
export default async function fetchImages(
  url: string // The API URL to fetch images from curated or search URL.
): Promise<SearchImageResults | undefined> {
  try {
    // Make the API request to Pexels using the provided URL.
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY, // Use the API key stored in the environment variables for authentication.
      },
    });

    // If the response is not OK (status code outside 200–299), throw an error.
    if (!res.ok) throw new Error("Error Fetching Images Data");

    // Parse the response body as JSON to get the search results.
    const searchImageResults: SearchImageResults = await res.json();

    // Use Zod to validate and parse the returned data with the pre-defined schema.
    // This ensures that the data matches the expected structure.
    const parseData = ImageSelectionAndPhotoSchema.parse(searchImageResults);

    // If the total number of results is 0, return undefined to indicate no images found.
    if (parseData.total_results === 0) return undefined;

    // Return the validated and parsed search results.
    return parseData;
  } catch (err) {
    // Catch any errors that occur during the fetch or parsing process.
    // Log the error stack for debugging purposes if the error is an instance of Error.
    if (err instanceof Error) console.log(err.stack);
  }
}
