// Function to extract and format the title from the video URL.
export default function extractVideoTitleFromUrl(url: string): string {
  // Extract the part after the last slash and before the video ID.
  // This is an example of the Url we work with:
  // https://www.pexels.com/video/woman-stepping-in-the-sand-6473582/'

  const urlParts = url.split("/"); // Split the URL by '/'
  const titleWithId = urlParts[urlParts.length - 2]; // Get the part before the last slash.

  // Replace hyphens with spaces and remove any trailing video ID.
  const title = titleWithId.replace(/-\d+$/, "").replace(/-/g, " ");

  return title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter.
}
