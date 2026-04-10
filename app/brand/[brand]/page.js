"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";

export default function BrandCarsPage() {
  const { brand } = useParams();

  const [cars, setCars] = useState([]);
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get(`/user/cars?brand=${brand}`);

        console.log("CARS:", res.data);

        setCars(res.data);

        // ✅ GET BRAND NAME FROM FIRST CAR
        if (res.data.length > 0) {
          setBrandName(res.data[0].brand?.name);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, [brand]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16">

      {/* ✅ BRAND TITLE */}
      <h2 className="text-3xl font-bold text-center mb-10">
        {brandName ? `${brandName} Cars` : "Cars"}
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {cars.map((car) => (
          <div key={car._id} className="border rounded-xl overflow-hidden shadow">

            {/* IMAGE */}
      <img
  src={
    car.images?.[0]?.startsWith("http")
      ? car.images[0]
      : `http://localhost:5000/${car.images?.[0]?.replace(/\\/g, "/")}`
  }
  className="w-full h-[200px] object-cover"
/>

            {/* DETAILS */}
            <div className="p-4">

              {/* CAR NAME */}
              <h3 className="text-xl font-semibold">
                {car.name}
              </h3>

              {/* BRAND NAME (IMPORTANT) */}
              <p className="text-sm text-gray-500">
                Brand: {car.brand?.name}
              </p>

              {/* LOCATION */}
              <p className="text-gray-600">
                {car.location?.name}
              </p>

              {/* PRICE */}
              <p className="text-blue-600 font-bold mt-2">
                ₹{car.pricePerDay} / day
              </p>

              {/* BUTTON */}
              <Link href={`/booking/${car._id}`} >
              <button className="mt-4 w-full bg-black text-white py-2 rounded">
                Book Now
              </button>
              </Link>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}