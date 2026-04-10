"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

// ✅ Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Redux se token lo
  const token = useSelector((state) => state.auth.token);

  // 🔥 SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔐 LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-black text-gray-300 text-sm hidden md:block">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-6 lg:px-12 py-2">
          <div className="flex items-center gap-6 lg:gap-8 text-xs lg:text-sm">
            <p>📍 184 Main Street East 8007</p>
            <p>📞 1.800.456.6743</p>
            <p>⏰ Mon–Fri 09.00 – 17.00</p>
          </div>

          <div className="flex items-center gap-4 text-white">
            <FaFacebookF className="hover:text-teal-400 cursor-pointer" />
            <FaTwitter className="hover:text-teal-400 cursor-pointer" />
            <FaYoutube className="hover:text-teal-400 cursor-pointer" />
            <FaPinterestP className="hover:text-teal-400 cursor-pointer" />
            <FaInstagram className="hover:text-teal-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 md:py-5 text-white mt-0 md:mt-10">

          {/* LOGO */}
          <div className="flex items-center">
            <img
              src="/logo@2x_white.png"
              alt="logo"
              className="h-8 md:h-10 w-auto object-contain cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8 text-[14px] font-medium tracking-wide absolute left-1/2 -translate-x-1/2">

            <Link href="/" className="hover:text-teal-400">Home</Link>

            <Link href="/cars" className="flex items-center gap-1 hover:text-teal-400">
              Cars
            </Link>

            <Link href="/booking" className="flex items-center gap-1 hover:text-teal-400">
              Booking 
            </Link>

            <Link href="/payment_history" className="flex items-center gap-1 hover:text-teal-400">
              Payment
            </Link>

            <Link href="/about" className="hover:text-teal-400">
              About Us
            </Link>

            <Link href="/contact" className="hover:text-teal-400">
              Contact
            </Link>

            {!token && (
              <Link href="/signup" className="hover:text-teal-400">
                Sign Up
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* PROFILE / LOGIN */}
            {!token ? (
              <Link href="/login">
                <div className="bg-teal-400 hover:bg-teal-500 p-2 md:p-3 rounded-full cursor-pointer transition">
                  <User size={18} />
                </div>
              </Link>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="bg-teal-400 hover:bg-teal-500 p-2 md:p-3 rounded-full cursor-pointer transition"
                >
                  <User size={18} />
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg p-3 z-50">

                    <button
                      onClick={() => {
                        router.push("/profile");
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left py-1 hover:text-teal-500"
                    >
                      Profile 👤
                    </button>

                    <button
                      onClick={() => {
                        router.push("/booking");
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left py-1 hover:text-teal-500"
                    >
                      My Bookings 🚗
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-1 text-red-500"
                    >
                      Logout ❌
                    </button>

                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <div
              className="lg:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>

          </div>
        </div>

        {/* ✅ FIXED MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden bg-black text-white px-6 py-6 flex flex-col gap-4">

            <Link href="/" onClick={() => setMenuOpen(false)} className="block w-full py-3 border-b border-gray-700 hover:text-teal-400">
              Home
            </Link>

            <Link href="/cars" onClick={() => setMenuOpen(false)} className="block w-full py-3 border-b border-gray-700 hover:text-teal-400">
              Cars
            </Link>

            <Link href="/booking" onClick={() => setMenuOpen(false)} className="block w-full py-3 border-b border-gray-700 hover:text-teal-400">
              Booking
            </Link>
            <Link href="/payment_history" onClick={() => setMenuOpen(false)} className="block w-full py-3 border-b border-gray-700 hover:text-teal-400">
              Payment
            </Link>

            <Link href="/about" onClick={() => setMenuOpen(false)} className="block w-full py-3 border-b border-gray-700 hover:text-teal-400">
              About Us
            </Link>

            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block w-full py-3 border-b border-gray-700 hover:text-teal-400">
              Contact
            </Link>
         

            {!token && (
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="block w-full py-3 hover:text-teal-400">
                Sign Up
              </Link>
            )}

          </div>
        )}

      </div>
    </>
  );
}