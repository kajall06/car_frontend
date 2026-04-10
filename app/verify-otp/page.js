"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import API from "@/lib/api";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ SEND OTP WHEN PAGE LOADS
  useEffect(() => {
    if (email) {
      API.post("/auth/send-otp", { email })
        .then(() => console.log("OTP sent"))
        .catch((err) => console.log(err));
    }
  }, [email]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      router.push("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    try {
      await API.post("/auth/send-otp", { email });
      alert("OTP Resent!");
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-4">
          Verify OTP
        </h2>

        <p className="text-center text-sm mb-4">
          OTP sent to: <b>{email}</b>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-3 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}

        <button
          onClick={handleResend}
          className="w-full mt-4 text-sm text-blue-600"
        >
          Resend OTP
        </button>

      </div>
    </div>
  );
}