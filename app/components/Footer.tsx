export default function Footer() {
  //Quick Footer component.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-4 bg-gray-800 text-white">
      <p>ND Stock Gallery {currentYear}</p>
    </footer>
  );
}
