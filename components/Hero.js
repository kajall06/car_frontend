"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../lib/api";

export default function Hero() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    type: "",
    sort: "",
  });

  // ✅ prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ fetch brands
  useEffect(() => {
    if (!mounted) return;

    const fetchBrands = async () => {
      try {
        const res = await API.get("/admin/brands");
        setBrands(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBrands();
  }, [mounted]);

  if (!mounted) return null;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const query = new URLSearchParams(filters).toString();
    router.push(`/cars?${query}`);
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-screen">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/IMG_3496bfree.jpg"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[85vh] sm:min-h-screen px-4 text-center py-20 sm:py-0">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4 text-white">
          Find Best Car
        </h1>

        <p className="mb-6 text-gray-200 text-sm sm:text-base">
          From ₹1000 per day
        </p>

        {/* SEARCH BOX */}
        <div className="
          w-full max-w-5xl
          bg-white/10 backdrop-blur-md
          p-4 sm:p-5
          rounded-xl
          flex flex-col sm:flex-row
          gap-3 sm:gap-4
        ">

          {/* BRAND */}
          <select
            name="brand"
            onChange={handleChange}
            className="w-full sm:flex-1 p-2 sm:p-3 rounded text-black bg-white"
          >
            <option value="">Any Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* TYPE */}
          <select
            name="type"
            onChange={handleChange}
            className="w-full sm:flex-1 p-2 sm:p-3 rounded text-black bg-white"
          >
            <option value="">Any Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
          </select>

          {/* SORT */}
          <select
            name="sort"
            onChange={handleChange}
            className="w-full sm:flex-1 p-2 sm:p-3 rounded text-black bg-white"
          >
            <option value="">Sort</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>

          {/* BUTTON */}
          <button
            onClick={handleSearch}
            className="
              w-full sm:w-auto
              bg-teal-400 hover:bg-teal-600
              text-black font-semibold
              px-6 py-2 sm:py-3
              rounded
              transition
            "
          >
            Search
          </button>

        </div>

      </div>
    </div>
  );
}