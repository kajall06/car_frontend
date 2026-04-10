"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import Link from "next/link";

// ✅ Redux imports
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch(); // ✅

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      // ✅ Redux me store karo
      dispatch(
        login({
          user: res.data.user,   // backend se aana chahiye
          token: res.data.token,
        })
      );

      // ✅ optional (persist ke liye)
      localStorage.setItem("token", res.data.token);

      console.log("TOKEN:", res.data.token);

      router.push("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white text-black p-6 md:p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue exploring cars
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

        </form>

        {/* LINKS */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-teal-600 font-semibold">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}