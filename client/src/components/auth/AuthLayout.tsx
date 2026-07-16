import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          HirePilot AI
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-center">
          {title}
        </h2>

        <p className="mt-2 text-center text-gray-500">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;