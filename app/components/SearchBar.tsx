import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function SearchBar() {
  const [search, setSearch] = useState(""); // State to store the user's search input.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control whether the dropdown is open or closed.

  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container to detect clicks outside of it.

  const router = useRouter(); // Hook to navigate programmatically.
  const pathname = usePathname(); // Hook to get the current page path.

  // Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior (which refreshes the page)

    // If search input is not empty, navigate to the appropriate results page.
    if (search) {
      if (pathname.includes("/videos")) {
        // If on the videos page, perform a video search.
        router.push(`/results/videos/${search}`);
      } else {
        // If on the images page or elsewhere, perform an image search.
        router.push(`/results/images/${search}`);
      }
    }
    setSearch(""); // Clear the search input after submission.
  };

  // Determine whether the user is on the videos or images page for the dropdown label.
  let searchSelection = pathname.includes("/videos") ? "Videos" : "Images";

  // Function to handle clicking outside the dropdown to close it.
  const handleClickOutside = (e: MouseEvent) => {
    // If the click happens outside the dropdown, close it.
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Add/remove event listener to detect clicks outside the dropdown when it's open.
  useEffect(() => {
    if (isDropdownOpen) {
      // Add event listener when the dropdown is open.
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the dropdown is closed.
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to ensure the event listener is removed when the component unmounts.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // Only rerun this effect when isDropdownOpen changes.

  return (
    <form
      className="flex justify-center md:justify-between"
      onSubmit={handleSubmit}
    >
      {/* Dropdown Menu */}
      <div className="relative" ref={dropdownRef}>
        {/* Button to toggle the dropdown */}
        <button
          type="button"
          className="bg-gray-300 p-2 text-black text-xl rounded-md"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility.
        >
          {searchSelection} &#9660;
        </button>

        {/* Dropdown Links */}
        {isDropdownOpen && (
          <div
            className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-10 text-black"
            onMouseLeave={() => setIsDropdownOpen(false)} // Close dropdown on hover out.
          >
            <ul className="py-2">
              {/* Link to Images Gallery */}
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/" onClick={() => setIsDropdownOpen(false)}>
                  Images
                </Link>
              </li>
              {/* Link to Videos Gallery */}
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/videos" onClick={() => setIsDropdownOpen(false)}>
                  Videos
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={search} // Bind input value to state.
        onChange={(e) => setSearch(e.target.value)} // Update state on input change.
        placeholder="Search"
        className="bg-white p-2 w-64 sm:w-80 text-xl rounded-md text-black"
      />
    </form>
  );
}
