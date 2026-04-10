"use client";
import { useEffect, useState, useRef } from "react";
import API from "@/lib/api";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function SafeReceiptPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const receiptRefs = useRef({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Please login first");

        const res = await API.get("/user/payments/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPayments(res.data.payments);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch payment history");
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const downloadPDF = async (id) => {
    const element = receiptRefs.current[id];
    if (!element) return;

    // Clone only the receipt content (exclude button)
    const clone = element.cloneNode(true);
    // Remove any buttons from clone
    clone.querySelectorAll("button").forEach((btn) => btn.remove());

    clone.style.backgroundColor = "#ffffff";
    clone.style.color = "#000000";
    // clone.style.padding = "20px";
    clone.style.fontFamily = "Arial, sans-serif";
    clone.style.border = "1px solid #ccc";

    // Reset child styles
    clone.querySelectorAll("*").forEach((el) => {
      el.style.color = "#000";
      el.style.backgroundColor = "#fff";
      el.style.borderColor = "#ccc";
      el.style.boxShadow = "none";
    });

    document.body.appendChild(clone);
    const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
    document.body.removeChild(clone);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // margin
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`receipt_${id}.pdf`);
  };

  if (loading) return <p className="text-center pt-32 text-lg">Loading...</p>;
  if (error) return <p className="text-center pt-32 text-red-600 text-lg">{error}</p>;

  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Payment Receipts</h1>
        <p className="text-lg md:text-xl text-blue-200">
          View all your payments and confirmed bookings in one place
        </p>
      </div>

      {/* RECEIPTS SECTION */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No payments found.</p>
        ) : (
          payments.map((p) => {
            const b = p.booking;
            const v = b?.vehicle;

            return (
              <div
                key={p._id}
                ref={(el) => (receiptRefs.current[p._id] = el)}
                className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-300 pb-3 mb-3">
                  <h2 className="text-2xl font-bold">Receipt</h2>
                  <p className="text-gray-700 text-sm">
                    {b?.createdAt ? dayjs(b.createdAt).format("DD MMM YYYY") : "-"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
                  <img
                    src={v?.images?.[0] || "/placeholder-car.png"}
                    alt={v?.name}
                    className="w-full sm:w-48 h-32 object-cover rounded border border-gray-300 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-black">{v?.name || "Vehicle"}</h3>
                    <p className="text-gray-800 text-sm md:text-base">
                      Type: {v?.type || "-"} | Seats: {v?.seats || "-"} | Transmission: {v?.transmission || "-"}
                    </p>
                  </div>
                </div>

                <div className="text-gray-800 text-sm md:text-base border-t border-b border-gray-300 py-3 mb-4">
                  <p><strong>Pickup Date:</strong> {b?.pickupDate ? dayjs(b.pickupDate).format("DD MMM YYYY") : "-"}</p>
                  <p><strong>Return Date:</strong> {b?.returnDate ? dayjs(b.returnDate).format("DD MMM YYYY") : "-"}</p>
                  <p><strong>Pickup Location:</strong> {b?.pickupLocation?.name || "-"}</p>
                  <p><strong>Drop Location:</strong> {b?.dropLocation?.name || "-"}</p>
                  <p><strong>Booking Status:</strong> {b?.status || "-"}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm md:text-base">
                  <div className="mb-3 sm:mb-0">
                    <p><strong>Amount Paid:</strong> ₹{p.amount}</p>
                    <p><strong>Payment Status:</strong> {p.paymentStatus.toUpperCase()}</p>
                    <p><strong>Transaction ID:</strong> {p.transactionId}</p>
                  </div>
                  {/* Invisible in PDF, visible on page */}
                  <button
                    onClick={() => downloadPDF(p._id)}
                    className="bg-blue-900 text-white px-5 py-2 rounded-md text-sm md:text-base hover:bg-blue-800 transition"
                  >
                    {/* You can leave button text empty or show "Download" */}
                    Download
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}