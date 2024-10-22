export default function About() {
  //Simple About component.
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-5 text-center">
        About ND Stock Gallery
      </h1>
      <p className="text-base mb-4 text-gray-400">
        Hey there! I am Naeem Davids and Welcome to my ND Stock Gallery App, a
        fun project I put together while learning at{" "}
        <strong>My Coding School</strong>. This app lets you browse and enjoy
        some amazing stock photos and videos, all pulled in from the{" "}
        <a
          href="https://www.pexels.com"
          className="text-blue-500 hover:underline"
        >
          Pexels API
        </a>
        .
      </p>
    </div>
  );
}
