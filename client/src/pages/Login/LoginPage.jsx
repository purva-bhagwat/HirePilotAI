import AuthLayout from "../../components/auth/AuthLayout.jsx";
import LoginForm from "../../components/auth/LoginForm.jsx";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your HirePilot AI career portal"
    >
      <LoginForm />
    </AuthLayout>
  );
}
