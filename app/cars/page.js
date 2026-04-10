"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import API from "../../lib/api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "@/store/carSlice";

// 🔥 INNER COMPONENT (UI SAME)
function CarsContent() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars.cars);

  const brand = searchParams.get("brand") || "";
  const type = searchParams.get("type") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    fetchCars();
  }, [brand, type, sort]);

  const fetchCars = async () => {
    try {
      let params = {};

      if (brand) params.brand = brand;
      if (type) params.type = type;
      if (sort) params.sort = sort;

      const res = await API.get("/user/cars", { params });
      dispatch(setCars(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* 🔥 HERO */}
      <div className="relative h-[220px] w-full">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Car Listing
          </h1>
          <p className="text-sm mt-2">
            {cars.length} Cars Available
          </p>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 mt-10 px-4">

        {/* LEFT */}
        <div className="w-full lg:w-[70%]">

          {cars.length === 0 && (
            <h2 className="text-red-500">No Cars Found ❌</h2>
          )}

          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden mb-6"
            >

              {/* IMAGE */}
              <div className="w-full md:w-[45%] h-[220px]">
                <img
                  src={
                    car.images?.[0] ||
                    "https://via.placeholder.com/600x400"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="w-full md:w-[55%] p-5 flex flex-col justify-between">

                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    {car.name}
                  </h2>

                  {/* ⭐ Rating */}
                  <div className="text-yellow-500 text-sm mb-2">
                    ⭐ {car.rating} ({car.reviews} reviews)
                  </div>

                  {/* 🔥 Specs */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>👥 {car.seats}</span>
                    <span>⚙️ {car.transmission}</span>
                    <span>⛽ {car.fuelType}</span>
                  </div>

                  {/* 🔥 Features */}
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                    {car.features?.map((f, i) => (
                      <p key={i}>✔ {f}</p>
                    ))}
                  </div>
                </div>

                {/* PRICE + BUTTON */}
                <div className="flex justify-between items-center mt-4">

                  <div>
                    <p className="text-2xl md:text-3xl font-bold">
                      ₹{car.pricePerDay}
                    </p>
                    <p className="text-sm text-gray-500">
                      Per Day
                    </p>
                  </div>

                  <Link href={`/booking/${car._id}`}>
                    <button className="bg-teal-500 text-white px-5 py-2 rounded hover:bg-teal-600">
                      Book
                    </button>
                  </Link>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[30%]">

          <div className="bg-white shadow p-5 rounded mb-6">
            <h2 className="text-lg font-semibold mb-3">
              For More Informations
            </h2>
            <p>📞 +91 9876543210</p>
            <p>🕒 Mon - Sat 9:00 - 18:00</p>
          </div>

          <div className="bg-white shadow p-5 rounded">
            <h2 className="text-lg font-semibold mb-3">
              Rental Tips
            </h2>

            <div className="flex gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200"
                className="w-14 h-14 rounded-full object-cover"
              />
              <p className="text-sm">
                Choose best cars at lowest prices
              </p>
            </div>

            <div className="flex gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200"
                className="w-14 h-14 rounded-full object-cover"
              />
              <p className="text-sm">
                Book early to get best deals
              </p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

// 🔥 ONLY CHANGE (Suspense wrapper)
export default function CarsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CarsContent />
    </Suspense>
  );
}