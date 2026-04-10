"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import API from "../../lib/api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "@/store/carSlice";

// 🔥 INNER COMPONENT
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
      {/* HERO */}
      <div className="relative h-[220px] w-full">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Car Listing</h1>
          <p className="text-sm mt-2">{cars.length} Cars Available</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 mt-10 px-4">

        <div className="w-full lg:w-[70%]">
          {cars.length === 0 && (
            <h2 className="text-red-500">No Cars Found ❌</h2>
          )}

          {cars.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow flex flex-col md:flex-row mb-6">

              <div className="w-full md:w-[45%] h-[220px]">
                <img
                  src={car.images?.[0] || "https://via.placeholder.com/600x400"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-[55%] p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{car.name}</h2>
                  <p>₹{car.pricePerDay}</p>
                </div>

                <Link href={`/booking/${car._id}`}>
                  <button className="bg-teal-500 text-white px-5 py-2 rounded">
                    Book
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

// 🔥 MAIN EXPORT WITH SUSPENSE
export default function CarsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CarsContent />
    </Suspense>
  );
}