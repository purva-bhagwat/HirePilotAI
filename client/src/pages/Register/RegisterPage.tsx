import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start managing your career with AI"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;