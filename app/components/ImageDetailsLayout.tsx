import React from "react";
import Image from "next/image"; // Import the Image component for optimized image rendering.
import { Photo } from "@/models/Images"; // Import the Photo type for TypeScript type checking.

type ImageDetailsLayoutProps = {
  photo: Photo; // Expecting `photo` to be passed in as a prop.
};

export default function ImageDetailsLayout({ photo }: ImageDetailsLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* Display the image name (alt text) */}
      <p className="text-center mb-1 text-lg font-semibold">{photo.alt}</p>
      {/* Display the photographer's name */}
      <p className="text-center mb-1 text-lg">Photo by {photo.photographer}</p>
      {/* Display the large2x image */}
      <Image
        src={photo.src.large2x} // Source URL for the large2x image.
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="rounded-lg mx-auto"
      />
    </div>
  );
}
