import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* 🔥 ABOUT */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">
              Car Rental
            </h2>
            <p className="text-sm leading-6">
              We provide premium car rental services at affordable prices.
              Enjoy smooth booking, verified cars, and 24/7 support.
            </p>
          </div>

          {/* 🔥 QUICK LINKS */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/cars">Cars</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* 🔥 CONTACT */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Info
            </h3>

            <ul className="space-y-2 text-sm">
              <li>📍 Mumbai, India</li>
              <li>📞 +91 98765 43210</li>
              <li>📧 support@carrental.com</li>
            </ul>
          </div>

          {/* 🔥 SOCIAL */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaYoutube />
              </a>
            </div>

          </div>

        </div>

        {/* 🔥 BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Car Rental. All rights reserved.
        </div>

      </div>

    </footer>
  );
}