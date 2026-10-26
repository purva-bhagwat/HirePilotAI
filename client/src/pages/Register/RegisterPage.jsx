import AuthLayout from "../../components/auth/AuthLayout.jsx";
import RegisterForm from "../../components/auth/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start managing your career with AI"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
