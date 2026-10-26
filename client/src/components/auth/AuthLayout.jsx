import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 border border-slate-200/80">
        <Link to="/" className="block text-center">
          <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            HirePilot AI
          </h1>
        </Link>

        <h2 className="mt-6 text-2xl font-semibold text-center text-gray-900">
          {title}
        </h2>

        <p className="mt-2 text-center text-gray-500 text-sm">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
