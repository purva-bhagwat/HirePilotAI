import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { updateUserProfile } from "../../api/auth.js";
import Navbar from "../../components/layout/Navbar.jsx";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage("Name cannot be empty.");
      return;
    }
    if (trimmedName.length < 2) {
      setErrorMessage("Name must be at least 2 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await updateUserProfile({ name: trimmedName });
      if (res && res.user) {
        updateUser(res.user);
        setSuccessMessage("Your profile name has been updated successfully.");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your personal account settings and preferences.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {successMessage && (
          <div
            role="status"
            className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-750 flex items-start space-x-2"
          >
            <span className="font-semibold text-green-800">Success:</span>
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start space-x-2"
          >
            <span className="font-semibold text-red-800">Error:</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Profile Card Header */}
          <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold uppercase shadow">
              {user?.name ? user.name.charAt(0) : user?.email?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name || "User"}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 uppercase tracking-wide">
                {user?.role || "user"}
              </span>
            </div>
          </div>

          {/* Profile Form & Information */}
          <form onSubmit={handleUpdate} className="p-6 sm:p-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage("");
                  if (successMessage) setSuccessMessage("");
                }}
                disabled={loading}
                className="w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm disabled:bg-gray-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                This name is displayed across your job applications and profile.
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-gray-500 text-sm cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-400">
                Email address is linked to your account and cannot be modified.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs text-gray-500 font-medium block">Account Role</span>
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {user?.role || "user"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs text-gray-500 font-medium block">Joined Date</span>
                <span className="text-sm font-semibold text-gray-800">
                  {formattedDate}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading || name.trim() === user?.name}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>

              {name.trim() !== user?.name && (
                <button
                  type="button"
                  onClick={() => setName(user?.name || "")}
                  disabled={loading}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
