// Register Page

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { api } from "@/lib/api";
import type { ApiError } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    role: "STUDENT",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: "STUDENT", label: "Student" },
    { value: "TEACHER", label: "Teacher" },
    { value: "ENROLLMENT_OFFICE", label: "Enrollment Office" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await api.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        role: formData.role,
      });

      setSuccess(true);

      // Only redirect to login for students (auto-approved)
      // Staff roles need to wait for admin approval
      if (formData.role === "STUDENT") {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // For staff, redirect to home after 5 seconds
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <Alert variant="error">{error}</Alert>}

          {success && (
            <Alert variant="success">
              Registration successful! Redirecting...
            </Alert>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />

              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>

            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="+1234567890"
            />

            <Input
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="123 Main St"
            />

            <Select
              label="I am a"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              helperText="Must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading || success}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
