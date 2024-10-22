import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Revalidate data every 10 seconds for ISR (Incremental Static Regeneration).
export const revalidate = 10;

// Define metadata for the website such as the title and description.
export const metadata: Metadata = {
  title: "ND Stock Gallery App",
  description:
    "A Next.js Stock Footage and Image Gallery App, made using the Pexels Api by Naeem Davids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        {/* Main content section grows to fill available space */}
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto w-full px-4">{children} </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
