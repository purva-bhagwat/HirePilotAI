import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-8 py-4 sticky top-0 z-30 shadow-xs">
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          HirePilot AI
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="hover:text-blue-600 transition"
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#about" className="hover:text-blue-600 transition">
              About
            </a>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase">
                {user?.name ? user.name.charAt(0) : "U"}
              </span>
              <span className="hidden sm:inline">{user?.name || "My Account"}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-gray-600 hover:text-red-600 border border-gray-200 px-3 py-1.5 rounded-lg transition hover:border-red-200 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-2 transition"
            >
              Sign In
            </Link>
            <Link to="/register">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
