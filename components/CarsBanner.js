"use client"

export default function CarsBanner() {
  return (
    <div className="relative h-[300px] w-full">
      
      {/* BACKGROUND IMAGE */}
      <img
        src="/cars_searcg.avif"
        className="w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        
        <h1 className="text-4xl font-semibold mb-2">
          Car Listing
        </h1>

        <p className="text-sm text-gray-200">
          Home / Cars
        </p>

      </div>
    </div>
  )
}