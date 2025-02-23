import Logo from "../../assets/TaskQuestLogo.png";

export default function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-800 w-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="w-20 h-18" alt="TaskQuest Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/Dashboard" className="hover:underline me-4 md:me-6">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/Team" className="hover:underline me-4 md:me-6">
                Team
              </a>
            </li>
            <li>
              <a href="/Projects" className="hover:underline me-4 md:me-6">
                Projects
              </a>
            </li>
            <li>
              <a href="/Tasks/byUser" className="hover:underline">
                Your Tasks
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            TaskQuest™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
