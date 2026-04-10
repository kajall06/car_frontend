"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [car, setCar] = useState(null);
  const [locations, setLocations] = useState([]);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    dropLocation: "",
  });

  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ HYDRATION FIX
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ FETCH DATA
  useEffect(() => {
    if (id) fetchCar();
    fetchLocations();
  }, [id]);

  // 🚗 FETCH CAR
  const fetchCar = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);
      setCar(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch car details ❌");
    }
  };

  // 📍 FETCH LOCATIONS
  const fetchLocations = async () => {
    try {
      const res = await API.get("user/locations");
      setLocations(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch locations ❌");
    }
  };

  // 💰 PRICE CALCULATION
  useEffect(() => {
    if (car && form.pickupDate && form.returnDate) {
      const start = new Date(form.pickupDate);
      const end = new Date(form.returnDate);

      const diff = end - start;
      const d = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (d > 0) {
        setDays(d);
        setTotalPrice(d * car.pricePerDay);
      } else {
        setDays(0);
        setTotalPrice(0);
      }
    }
  }, [form, car]);

  // 🔐 TOKEN
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
  };

  // ✅ BOOKING
  const handleBooking = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast("Please login first 🔐");
        router.push("/login");
        return;
      }

      if (
        !form.pickupDate ||
        !form.returnDate ||
        !form.pickupLocation ||
        !form.dropLocation
      ) {
        setError("All fields are required 🚨");
        return;
      }

      const res = await API.post(
        "/user/bookings",
        {
          vehicleId: id,
          pickupDate: form.pickupDate,
          returnDate: form.returnDate,
          pickupLocation: form.pickupLocation,
          dropLocation: form.dropLocation,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBooking(res.data.booking);
      setError("");
      toast.success("Booking Created ✅");
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        toast.error("Booking failed ❌");
      }
    }
  };

  // 💳 PAYMENT (RAZORPAY)
  const handlePayment = async () => {
    try {
      const token = getToken();

      if (!booking) {
        toast.error("No booking found ❌");
        return;
      }

      const { data } = await API.post(
        "/user/payments/create-order",
        { bookingId: booking._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Car Rental",
        description: "Booking Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            await API.post(
              "/user/payments/verify",
              {
                bookingId: booking._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Payment Successful 🎉");
            router.push("/booking");
          } catch (err) {
            console.log("Verification Error:", err);
            toast.error("Payment verification failed ❌");
          }
        },

        theme: { color: "#2563eb" },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay script not loaded ❌");
        return;
      }

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log("Payment Error:", err);
      toast.error("Payment Failed ❌");
    }
  };

  // ❌ CANCEL BOOKING
  const handleCancel = async () => {
    try {
      const token = getToken();
      await API.put(
        `/user/bookings/cancel/${booking._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking Cancelled ❌");
      setBooking(null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel booking ❌");
    }
  };

  if (!isMounted) return null;
  if (!car) return <p className="pt-32 text-center">Loading...</p>;

  return (
    <div className="pt-28 px-4 md:px-6 max-w-5xl mx-auto">
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* ❌ ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* 🚗 CAR */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <img src={car.images?.[0]} className="w-full h-64 object-cover" />
        <div className="p-5">
          <h1 className="text-xl md:text-2xl font-bold">{car.name}</h1>
          <p className="text-gray-600 text-sm">
            {car.type} • {car.transmission} • {car.seats} seats
          </p>
          <p className="text-blue-600 font-bold mt-2">
            ₹{car.pricePerDay} / day
          </p>
        </div>
      </div>

      {/* 📅 BOOKING FORM */}
      {!booking && (
        <div className="mt-6 bg-white shadow p-5 rounded-xl">
          <h2 className="font-bold mb-4 text-lg">Booking Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.pickupLocation}
              onChange={(e) =>
                setForm({ ...form, pickupLocation: e.target.value })
              }
              className="border p-3 rounded w-full"
            >
              <option value="">Select Pickup Location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name}
                </option>
              ))}
            </select>

            <select
              value={form.dropLocation}
              onChange={(e) =>
                setForm({ ...form, dropLocation: e.target.value })
              }
              className="border p-3 rounded w-full"
            >
              <option value="">Select Drop Location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <input
              type="date"
              value={form.pickupDate}
              onChange={(e) =>
                setForm({ ...form, pickupDate: e.target.value })
              }
              className="border p-3 rounded"
            />

            <input
              type="date"
              value={form.returnDate}
              onChange={(e) =>
                setForm({ ...form, returnDate: e.target.value })
              }
              className="border p-3 rounded"
            />
          </div>

          {days > 0 && (
            <div className="mt-4 bg-gray-100 p-4 rounded text-center">
              <p>Duration: {days} day(s)</p>
              <p>Price/day: ₹{car.pricePerDay}</p>
              <p className="text-xl font-bold text-blue-600">
                Total: ₹{totalPrice}
              </p>
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={!totalPrice}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            Confirm Booking 🚗
          </button>
        </div>
      )}

      {/* 💳 PAYMENT SECTION */}
      {booking && (
        <div className="mt-6 bg-white shadow p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold text-green-600">
            Booking Created 🎉
          </h2>
          <p className="mt-2">Total Amount: ₹{booking.totalPrice}</p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePayment}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl"
            >
              Pay Now 💳
            </button>

            <button
              onClick={() => setBooking(null)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl"
            >
              Edit
            </button>

            <button
              onClick={handleCancel}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl"
            >
              Cancel ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}