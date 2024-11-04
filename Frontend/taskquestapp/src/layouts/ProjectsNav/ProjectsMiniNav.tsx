export default function ProjectsMiniNav() {
  return (
    <div className="flex justify-center mt-4">
      {" "}
      <nav className="bg-gray-800 shadow-lg rounded-lg w-96">
        <div className="px-4 py-2 flex justify-center items-center space-x-4">
          <a
            href="/Projects"
            className="flex items-center text-gray-100 hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            See All Projects
          </a>
          <a
            href="/AddProject"
            className="flex items-center text-gray-100 hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Project
          </a>
        </div>
      </nav>
    </div>
  );
}
