import type { Photo } from "@/models/Images"; // Import the Photo type, which represents the structure of a photo object from the API.
import Image from "next/image"; // Import the Next.js Image component for optimized image rendering.
import Link from "next/link"; // Import the Next.js Link component for client-side navigation to the full image page.

// Define the props expected by this component, which includes a single photo object.
type Props = {
  photo: Photo; // The photo object containing image details.
};

// Functional component to render a single image in the gallery layout.
export default function ImageLayout({ photo }: Props) {
  // Calculate the width-to-height ratio of the image to maintain aspect ratio and prevent cropping.
  const getWidthHeightRatio = photo.height / photo.width;

  // Determine the height of the image in the gallery based on the calculated ratio.
  // The width is fixed at 250px, so the height is adjusted accordingly.
  const photoGalleryHeight = Math.ceil(250 * getWidthHeightRatio);

  // Calculate the number of rows the image should span in the grid.
  // Each row is 10px, and there's a 2px gap between images.
  const photoSize = Math.ceil(photoGalleryHeight / 10) + 1;

  return (
    <div
      // The container div has a fixed width of 16rem/256px(w-64 is tailwind css class) and centers itself within the grid.
      className="w-64 justify-self-center"
      // Use the calculated photo size to set the grid row span for responsive layout.
      style={{ gridRow: `span ${photoSize}` }}
    >
      {/* Wrap the image in a link that opens the full image on Pexels in a new tab. */}
      <Link
        href={`/photo/${photo.id}`}
        target="_blank" // Open the link in a new browser tab.
        className="grid place-content-center" // Center the image within its container.
      >
        {/* Image container with overflow hidden to ensure proper rounding of the corners. */}
        <div className="rounded-md overflow-hidden group">
          {/* Render the image using Next.js Image component for optimized loading. */}
          <Image
            src={photo.src.large} // The source of the large version of the image.
            alt={photo.alt} // Alt text for accessibility and SEO.
            width={photo.width} // Original width of the image (used for layout calculations).
            height={photo.height} // Original height of the image.
            placeholder="blur" // Use the blurred image placeholder for a better UX during loading.
            blurDataURL={photo.blurredDataUrl} // Base64 placeholder image for blurred loading.
            className="group-hover:opacity-80" // Apply a hover effect to slightly fade the image.
            sizes="250px" // Inform the browser that the image will be displayed at 250px width.
          />
        </div>
      </Link>
    </div>
  );
}
