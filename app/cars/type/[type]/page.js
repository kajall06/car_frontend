"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
export default function TypePage() {
  const { type } = useParams();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, [type]);

  const fetchCars = async () => {
    const res = await API.get("/vehicles");

    const filtered = res.data.filter(
      (car) => car.type === type
    );

    setCars(filtered);
  };

  return (
  <div className="w-full overflow-x-hidden">

    {/* 🔥 HERO */}
    <div className="relative w-full h-56 md:h-72 lg:h-80">
      <img
        src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold uppercase">
          {type}
        </h1>
        <p className="text-sm md:text-lg mt-2">
          Explore {type} Cars
        </p>
      </div>
    </div>

    {/* 🔥 ADD BREADCRUMB HERE */}
    <div className="max-w-7xl mx-auto px-4 pt-5">
      <Breadcrumb type={type} />
    </div>

    {/* 🔥 CONTENT */}
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">

      {/* LEFT */}
      <div className="w-full lg:w-3/4 space-y-8">

        {cars.map((car) => (
          <div
            key={car._id}
            className="border rounded-xl overflow-hidden shadow-sm bg-white"
          >

            <img
              src={car.images?.[0]}
              className="w-full h-60 md:h-72 object-cover"
            />

            <div className="p-4 md:p-5">

              <h2 className="text-xl md:text-2xl font-bold">
                {car.name}
              </h2>

              <p className="text-gray-600 mt-1">
                {car.fuelType} • {car.transmission} • {car.seats} seats
              </p>

              <p className="text-sm mt-2 text-gray-500">
                {car.description}
              </p>

              <p className="mt-3 text-lg font-bold">
                ₹{car.pricePerDay}/day
              </p>

              <Link href={`/booking/${car._id}`}>
              <button className="mt-4 w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded">
                Book Now
              </button>
              </Link>

            </div>

          </div>
        ))}

      </div>

      {/* RIGHT PANEL */}
      <div className="hidden lg:block w-1/4">

        <div className="sticky top-5 space-y-4">

          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-bold text-lg mb-2">More Info</h3>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>✔ Free cancellation</li>
              <li>✔ Unlimited kilometers</li>
              <li>✔ 24/7 support</li>
              <li>✔ Instant booking</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-bold text-lg mb-2">Rental Tips</h3>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Check fuel policy</li>
              <li>• Inspect car before booking</li>
              <li>• Carry valid driving license</li>
              <li>• Book in advance for best price</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  </div>
);
}