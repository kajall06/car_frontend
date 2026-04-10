"use client";

import Link from "next/link";

export default function Queue() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        alt="car"
        className="w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white">

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Our Fleet, Your Fleet
        </h1>

        <p className="mt-4 max-w-2xl text-sm md:text-lg text-gray-200">
          We know the difference is in the details and that’s why our car rental
          services stand out for their quality and good taste, to offer you an
          unforgettable experience.
        </p>

        {/* PHONE */}
        <p className="mt-6 text-xl md:text-3xl font-light tracking-wide">
          Call Now (54)-344-4533-4
        </p>

        {/* BUTTON */}
        <Link href="/contact">
          <button className="mt-6 bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-lg text-white font-semibold transition duration-300 shadow-lg">
            Request a Quote
          </button>
        </Link>

      </div>
    </section>
  );
}