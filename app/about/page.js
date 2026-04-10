"use client";

import { Car, Users, ShieldCheck, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* 🔥 HERO SECTION */}
      <div className="relative w-full h-60 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            About Us 🚗
          </h1>
          <p className="mt-2 text-sm md:text-lg">
            Learn more about our journey & services
          </p>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* INTRO */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome to Car Rental
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best car rental services with a wide range of vehicles 
            at affordable prices. Our mission is to make your journey comfortable, 
            safe, and hassle-free.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-4 gap-6 text-center mb-12">

          <div className="bg-white shadow rounded-xl p-6">
            <Car className="mx-auto text-teal-500 mb-3" size={32} />
            <h3 className="font-semibold mb-2">Wide Range</h3>
            <p className="text-sm text-gray-600">
              Choose from economy to luxury cars
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <Users className="mx-auto text-teal-500 mb-3" size={32} />
            <h3 className="font-semibold mb-2">Happy Customers</h3>
            <p className="text-sm text-gray-600">
              Thousands of satisfied users
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <ShieldCheck className="mx-auto text-teal-500 mb-3" size={32} />
            <h3 className="font-semibold mb-2">Safe & Secure</h3>
            <p className="text-sm text-gray-600">
              100% secure booking & payment
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <Star className="mx-auto text-teal-500 mb-3" size={32} />
            <h3 className="font-semibold mb-2">Top Rated</h3>
            <p className="text-sm text-gray-600">
              Highly rated service by users
            </p>
          </div>

        </div>

        {/* WHY CHOOSE US */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            className="w-full h-72 object-cover rounded-xl shadow"
          />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose Us?
            </h2>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Easy booking process</li>
              <li>✔ Affordable pricing</li>
              <li>✔ Well maintained vehicles</li>
              <li>✔ 24/7 customer support</li>
              <li>✔ Flexible pickup & drop locations</li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="bg-teal-500 text-white text-center py-10 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Book Your Ride?
          </h2>
          <p className="mb-4">
            Explore our cars and start your journey today!
          </p>

          <a
            href="/cars"
            className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold"
          >
            Browse Cars
          </a>
        </div>

      </div>
    </div>
  );
}