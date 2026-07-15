import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-5">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-600">
          HirePilot AI
        </h1>
      </Link>

      <div className="flex gap-6">
        <a href="#features" className="hover:text-blue-600">
          Features
        </a>

        <a href="#about" className="hover:text-blue-600">
          About
        </a>

        <a href="#contact" className="hover:text-blue-600">
          Contact
        </a>
      </div>

      <Link to="/register">
        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Get Started
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;