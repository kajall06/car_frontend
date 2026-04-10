"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

// ✅ Redux
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "@/store/authSlice";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Redux data
  const reduxUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [user, setUser] = useState(reduxUser || null);
  const [loading, setLoading] = useState(!reduxUser);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reduxUser) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const storedToken = token || localStorage.getItem("token");

      if (!storedToken) {
        router.push("/login");
        return;
      }

      const res = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setUser(res.data.user);

      // ✅ Redux me bhi save kar do
      dispatch(login({
        user: res.data.user,
        token: storedToken
      }));

    } catch (err) {
      console.log(err);

      dispatch(logout());
      localStorage.removeItem("token");
      router.push("/login");

      setError("Failed to load profile ❌");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ LOADING
  if (loading) {
    return <p className="pt-32 text-center">Loading...</p>;
  }

  // ❌ ERROR
  if (error) {
    return <p className="pt-32 text-center text-red-500">{error}</p>;
  }

  // 🚫 NO USER
  if (!user) {
    return <p className="pt-32 text-center">No user data found</p>;
  }

  return (
    <div className="pt-32 max-w-4xl mx-auto px-4">

      <div className="bg-white shadow-xl rounded-2xl p-6 text-center">

        {/* AVATAR */}
        <div className="w-24 h-24 mx-auto bg-teal-500 text-white flex items-center justify-center rounded-full text-3xl font-bold">
          {user.name?.charAt(0)}
        </div>

        <h1 className="text-2xl font-bold mt-4">
          {user.name}
        </h1>

        <p className="text-gray-600 mt-1">
          {user.email}
        </p>

        <p className="text-gray-600">
          📞 {user.phone}
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => router.push("/booking")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            My Bookings 🚗
          </button>

          <button
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout ❌
          </button>

        </div>

      </div>
    </div>
  );
}