"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 PREVENT MULTIPLE CALLS
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        password: form.password,
      };

      // 1️⃣ REGISTER USER
      await API.post("/auth/register", payload);

      // 2️⃣ SEND OTP (ONLY ONCE)
      await API.post("/auth/send-otp", {
        email: payload.email,
      });

      // 3️⃣ REDIRECT
      router.push(`/verify-otp?email=${payload.email}`);

    } catch (err) {
      console.log("ERROR:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center px-4 text-white">

      {/* HERO */}
      <div className="text-center max-w-2xl mb-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Rent Your Dream Car 🚗
        </h1>

        <p className="mt-4 text-gray-300">
          Sign up and explore luxury, sports & economy cars at the best prices.
        </p>

        <div className="mt-5 text-sm text-gray-400 flex flex-col sm:flex-row justify-center gap-3">
          <span>✔ Easy Booking</span>
          <span>✔ Best Prices</span>
          <span>✔ Premium Cars</span>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full max-w-md bg-white text-black p-6 md:p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Sign Up & Send OTP"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}