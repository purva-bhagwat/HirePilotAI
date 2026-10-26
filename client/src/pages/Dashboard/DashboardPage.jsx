import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "../../components/layout/Navbar.jsx";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Account Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || "Candidate"}! 👋
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Logged in as <span className="font-medium text-gray-900">{user?.email}</span> ({user?.role || "user"})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              Edit Profile
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Feature Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
              💼
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Job Applications</h3>
            <p className="text-sm text-gray-500 mb-4">Track and monitor your active applications.</p>
            <span className="text-2xl font-bold text-gray-900">0</span>
            <span className="text-xs text-gray-400 ml-2">Active</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              📄
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Resumes Stored</h3>
            <p className="text-sm text-gray-500 mb-4">Upload and optimize your AI resume versions.</p>
            <span className="text-2xl font-bold text-gray-900">0</span>
            <span className="text-xs text-gray-400 ml-2">Files</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mb-4">
              🎯
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Interview Prep</h3>
            <p className="text-sm text-gray-500 mb-4">Upcoming AI practice sessions and mock interviews.</p>
            <span className="text-2xl font-bold text-gray-900">Ready</span>
            <span className="text-xs text-emerald-600 ml-2">Available</span>
          </div>
        </div>

        {/* Quick Profile Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Account Details</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">{user?.name || "Not set"}</dd>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900 truncate">{user?.email}</dd>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Role</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900 capitalize">{user?.role || "user"}</dd>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
