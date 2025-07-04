import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No booking data found!</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 underline">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed ✅</h1>
      <p><strong>Movie ID:</strong> {booking.movieId}</p>
      <p><strong>Theatre ID:</strong> {booking.theatreId}</p>
      <p><strong>Showtime:</strong> {booking.showtime}</p>
      <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
      <p><strong>Total Paid:</strong> ₹{booking.totalPrice}</p>

      <button onClick={() => navigate("/")} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
