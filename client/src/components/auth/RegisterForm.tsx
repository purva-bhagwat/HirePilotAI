import { useState } from "react";
import { registerUser } from "../../api/auth";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      alert(response.message);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

    </form>
  );
}

export default RegisterForm;