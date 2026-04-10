"use client";

import Link from "next/link";

export default function Breadcrumb({ type }) {
  return (
    <div className="text-sm text-gray-500 mb-5">

      <Link href="/" className="hover:text-black">
        Home
      </Link>

      <span className="mx-2">/</span>

      <Link href="/cars" className="hover:text-black">
        Cars
      </Link>

      {type && (
        <>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">{type}</span>
        </>
      )}

    </div>
  );
}