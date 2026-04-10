"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/contact", form);
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      setSuccess("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 HERO */}
      <div className="relative h-56 md:h-72">
        <img
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Contact Us
          </h1>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* 🔥 FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-center text-green-600 text-sm">
                {success}
              </p>
            )}

          </form>
        </div>

        {/* 🔥 INFO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 hover:shadow-xl transition">

            <h2 className="text-xl font-bold border-b pb-2">
              Contact Details
            </h2>

            <p className="text-gray-600">📍 Mumbai, India</p>
            <p className="text-gray-600">📞 +91 98765 43210</p>
            <p className="text-gray-600">📧 support@carrental.com</p>
            <p className="text-gray-600">🕒 Mon - Sat: 9 AM - 8 PM</p>

          </div>

          {/* RIGHT */}
          <div className="shadow-lg rounded-2xl p-6 space-y-4 hover:shadow-xl transition">

            <h2 className="text-xl font-bold border-b pb-2">
              Need Help?
            </h2>

            <p className="text-gray-600 text-sm">
              Our support team is always ready to help you with booking,
              payments, and car selection.
            </p>

            <ul className="text-gray-600 text-sm space-y-2">
              <li>✔ Fast response within 24 hours</li>
              <li>✔ Easy booking support</li>
              <li>✔ Secure payments</li>
              <li>✔ Rental guidance</li>
            </ul>

          </div>

        </div>

      </div>
    </div>
  );
}