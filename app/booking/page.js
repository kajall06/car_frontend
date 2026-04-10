"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

// ✅ Redux
import { useDispatch, useSelector } from "react-redux";
import { setBookings, setLoading } from "@/store/bookingSlice";

export default function MyBookingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Redux se data
  const { bookings, loading } = useSelector((state) => state.booking);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      dispatch(setLoading(true));

      if (!token) {
        alert("Please login first 🔐");
        router.push("/login");
        return;
      }

      const res = await API.get("/user/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setBookings(res.data.bookings || []));
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ❌ CANCEL
  const handleCancel = async (id) => {
    try {
      await API.put(
        `/user/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Cancelled ❌");
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  // 💳 PAYMENT
  const handlePayment = async (booking) => {
    try {
      const { data } = await API.post(
        "/user/payments/create-order",
        { bookingId: booking._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Car Rental",
        description: "Booking Payment",
        order_id: data.order.id,

        handler: async function (response) {
          await API.post(
            "/user/payments/verify",
            {
              ...response,
              bookingId: booking._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment Successful 🎉");
          fetchBookings();
        },

        theme: { color: "#2563eb" },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.log(err);
      alert("Payment failed ❌");
    }
  };

  // ⏳ LOADING
  if (loading) {
    return <p className="pt-32 text-center">Loading...</p>;
  }

  return (
    <div className="w-full overflow-x-hidden">

      {/* 🔥 HERO */}
      <div className="relative w-full h-56 md:h-72">
        <img
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            My Bookings 🚗
          </h1>
          <p className="mt-2 text-sm md:text-lg">
            Manage your bookings & payments
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">
            No bookings found 😔
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >

                <img
                  src={
                    b.vehicle?.images?.[0] ||
                    "https://via.placeholder.com/600x400"
                  }
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 flex flex-col justify-between flex-1">

                  <div>
                    <h2 className="text-lg font-semibold">
                      {b.vehicle?.name}
                    </h2>

                    <p className="text-sm text-gray-600">
                      {b.vehicle?.type} • {b.vehicle?.transmission}
                    </p>

                    <p className="text-sm mt-2">
                      📍 {b.pickupLocation?.name} → {b.dropLocation?.name}
                    </p>

                    <p className="text-sm">
                      📅{" "}
                      {new Date(b.pickupDate).toLocaleDateString()} →{" "}
                      {new Date(b.returnDate).toLocaleDateString()}
                    </p>

                    <p className="text-blue-600 font-bold mt-2 text-lg">
                      ₹{b.totalPrice}
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : b.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </div>

                  {b.status === "pending" && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">

                      <button
                        onClick={() => handlePayment(b)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                      >
                        Pay Now 💳
                      </button>

                      <button
                        onClick={() => handleCancel(b._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                      >
                        Cancel ❌
                      </button>

                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}