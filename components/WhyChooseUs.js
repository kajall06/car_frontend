"use client";

import { Car, Smile, Heart } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-bold">
          Why Choose Us
        </h2>

        <p className="mt-3 text-sm md:text-lg text-gray-200">
          Explore our first class limousine & car rental services
        </p>

        {/* CARDS */}
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">

          {/* CARD 1 */}
          <div className="flex flex-col items-center text-center px-4">

            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Car size={30} />
            </div>

            <h3 className="text-xl font-semibold">
              Variety of Car Brands
            </h3>

            <p className="mt-2 text-sm text-gray-200">
              Choose from a wide range of luxury, sports and economy cars.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="flex flex-col items-center text-center px-4">

            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Smile size={30} />
            </div>

            <h3 className="text-xl font-semibold">
              Best Rate Guarantee
            </h3>

            <p className="mt-2 text-sm text-gray-200">
              Get the best prices with no hidden charges.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="flex flex-col items-center text-center px-4">

            <div className="bg-white/20 p-5 rounded-full mb-4">
              <Heart size={30} />
            </div>

            <h3 className="text-xl font-semibold">
              Awesome Customer Support
            </h3>

            <p className="mt-2 text-sm text-gray-200">
              24/7 support to help you anytime, anywhere.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}