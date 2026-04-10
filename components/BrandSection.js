"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../lib/api";

export default function BrandSection() {
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await API.get("user/brands");
        setBrands(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Browse by Brand
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => router.push(`/brand/${brand._id}`)}

            className="
              cursor-pointer
              object-cover
              rounded-xl
              overflow-hidden
              bg-white
              transition-all duration-300
              hover:shadow-xl
              hover:-translate-y-2
            "
          >
            <img
              src={brand.image}
              className="w-full h-[200px] object-cover"
            />

            <h3 className="text-center p-3 font-semibold">
              {brand.name}
            </h3>
          </div>
        ))}

      </div>
    </div>
  );
}