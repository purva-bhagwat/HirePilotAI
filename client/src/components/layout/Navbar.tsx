function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b bg-white">
      <h1 className="text-2xl font-bold text-blue-600">
        HirePilot AI
      </h1>

      <div className="flex gap-6">
        <a href="#" className="hover:text-blue-600">
          Features
        </a>

        <a href="#" className="hover:text-blue-600">
          About
        </a>

        <a href="#" className="hover:text-blue-600">
          Contact
        </a>
      </div>

      <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;