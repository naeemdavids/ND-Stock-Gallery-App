import type { Video } from "@/models/Videos";
import { VideoSchema } from "@/models/Videos";
import env from "./env"; // Import environment variables (like the Pexels API key).

// Function to fetch details of a single video by its ID.
export default async function singleFetchVideo(
  id: number // Accepts the video ID as a parameter.
): Promise<Video | undefined> {
  try {
    // Construct the API URL to fetch a specific video using its ID.
    const url = `https://api.pexels.com/videos/videos/${id}`;
    console.log(url);

    // Make a request to the Pexels API with the necessary authorization header.
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY, // Include the API key in the request header.
      },
    });

    // Log the response status for debugging
    console.log("Response Status:", res.status);

    // If the response is not successful (status code is not 200-299), throw an error.
    if (!res.ok)
      throw new Error(`Error Fetching Video Data: ${res.statusText}`);

    // Parse the response data as JSON and log the response body.
    const data = await res.json(); // Read the body once
    console.log("Response Body:", data); // Log the parsed response

    // Use Zod to validate and parse the response data into the expected structure.
    const parsedVideo = VideoSchema.parse(data);

    // Return the validated video data.
    return parsedVideo;
  } catch (err) {
    // If an error occurs, log the error stack trace for debugging purposes.
    if (err instanceof Error) console.log(err.stack);
  }
}
