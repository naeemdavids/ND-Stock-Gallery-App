import { notFound } from "next/navigation"; // Import the notFound function to handle 404 pages.
//import Image from "next/image"; // Import the Image component for optimized image rendering.
import singleFetchImage from "@/library/singleFetchImage"; // Import the function to fetch a single image.
import { Photo } from "@/models/Images"; // Import the Photo type for TypeScript type checking.
import ImageDetailsLayout from "@/app/components/ImageDetailsLayout";

// Code for when the user clicks on an image in the curated or search results.
// Which then leads to the photo's own page.

type PhotoPageProps = {
  params: { id: string }; // The dynamic route parameter for the photo ID.
};

// Define an async function for generating metadata, which will set the document title dynamically.
export async function generateMetadata({ params }: PhotoPageProps) {
  const { id } = params; // Destructure the id from params.

  // Convert `id` to a number since the Pexels API expects a numeric ID.
  // The '10' indicates the base of the number system to use for conversion (base 10 for decimal).
  const photoId = parseInt(id, 10);

  // Fetch the single photo data using the photoId.
  const photo: Photo | undefined = await singleFetchImage(photoId);

  // If no photo is found.
  if (!photo) {
    return {
      title: "Photo not found", // Fallback title if the photo is not found.
    };
  }

  // Set the tab title to the photo's alt text (or any other photo property).
  return {
    title: photo.alt, // This sets the tab title to the photo's name.
  };
}

// Default exported async function for the photo page component.
export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = params; // Destructure the id from params.

  // Convert `id` to a number since the Pexels API expects a numeric ID.
  const photoId = parseInt(id, 10); // '10' specifies that the conversion should be done using base 10.

  // Fetch the single photo data using the photoId.
  const photo: Photo | undefined = await singleFetchImage(photoId);

  // If no photo is found, trigger a 404 page.
  if (!photo) {
    notFound(); // Call the notFound function to display a 404 error.
  }

  return <ImageDetailsLayout photo={photo} />;
}
