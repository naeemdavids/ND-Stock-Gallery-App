"use client";

import Link from "next/link"; // Import the Next.js Link component for client-side navigation.
import SearchBar from "./SearchBar"; // Import the SearchBar component which will be used inside the Navbar.
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Importing usePathname hook to get the current path.

// Functional component for the Navbar.
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the Hamburger menu is open or closed.
  const menuRef = useRef<HTMLDivElement>(null); // Ref to track the Navbar element.
  const pathname = usePathname(); // Getting the current path.

  // Close the menu if the mouse hovers outside the Navbar, used when the Navbar changes to a hamburger menu state.
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Check if the mouse is outside the Navbar.
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the menu if mouse is outside.
      }
    };

    // Attach the event listener for mouse movements.
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener on component unmount.
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Dynamically set the navbar height and styles based on the current route.
  const isHomepageOrVideosPage =
    pathname === "/" || pathname === "/videos" || pathname === "/about";
  const navbarHeight = isHomepageOrVideosPage ? "h-42 md:h-62" : "h-42"; // Larger height for homepage and videos page.
  const navbarPadding = isHomepageOrVideosPage ? "p-10 md:p-14" : "p-4"; // More padding for homepage and videos page.

  return (
    // The header is sticky to the top of the viewport and has a z-index to ensure it stays on top of content when scrolling.
    <header
      className={`bg-slate-400 sticky top-0 z-10 bg-cover bg-center ${navbarHeight}`} // Apply dynamic height.
      style={{
        backgroundImage: isHomepageOrVideosPage
          ? "url('/pexels-rccbtn-28917740.jpg')" // Show this background image only on "/" and "/videos".
          : "url('/pexels-freestockpro-345522.jpg')",
      }}
    >
      {/* Navigation bar with flexible layout */}
      <nav
        ref={menuRef} // Assigning the ref to the Navbar container.
        className={`flex flex-col items-center font-bold max-w-6xl mx-auto ${navbarPadding}`} // Dynamically apply padding based on the route.
      >
        {/* Flex container to distribute space between title/navigation and search bar */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full wantSpaceHere">
          {/* Title and navigation links */}
          <div className="text-white">
            {/* Website title - becomes a clickable link to the homepage. */}
            <div className="flex flex-col sm:flex-row sm:items-center w-full">
              <h1 className="text-2xl sm:text-3xl text-center sm:text-left w-full sm:w-auto">
                {/* Link to the homepage (Images gallery). */}
                <Link href="/">ND Stock Gallery</Link>
              </h1>
            </div>
            {/* Navigation links for Images, Videos, and About */}
            <div
              className={`flex-col gap-4 ${
                isMenuOpen ? "flex" : "hidden"
              } md:flex md:flex-row md:gap-4 mt-4 md:mt-0 w-full text-center sm:text-left`}
            >
              {/* Link to the homepage (Images gallery). */}
              <Link href="/" className="hover:underline">
                Images
              </Link>

              {/* Link to the Video gallery page. */}
              <Link href="/videos" className="hover:underline">
                Videos
              </Link>

              {/* Link to the About page. */}
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </div>
            {/* Hamburger button for small/medium screens */}
            <button
              className="md:hidden block text-3xl mt-4 mx-auto" // Centering the Hamburger button on smaller screens.
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu open/close on click.
            >
              &#9776; {/* Unicode for the "Hamburger" icon */}
            </button>
          </div>

          {/* Search bar on the right for larger screens, below title for smaller screens */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <SearchBar />
          </div>
        </div>
      </nav>
    </header>
  );
}
