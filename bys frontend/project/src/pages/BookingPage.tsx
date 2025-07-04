import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, theatre, showtime } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seatLayout = [
    "A1", "A2", "A3", "A4", "A5",
    "B1", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
  ];

  const ticketPrice = 250;

  const handleSeatSelect = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotal = () => selectedSeats.length * ticketPrice;

  const proceedToPayment = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to continue.");
      return;
    }

    const bookingData = {
      movieTitle: movie?.title,
      theatreName: theatre?.name,
      showtime: showtime?.time,
      seats: selectedSeats,
      totalPrice: calculateTotal(),
    };
    
    try {
      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
      alert("Booking successful!");

      // Navigate to confirmation or home with booking info
      navigate("/confirmation", { state: { booking: response.data } });
    } catch (error) {
      console.error("Error booking tickets", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>

        <div className="mb-6">
          <p><strong>Movie:</strong> {movie?.title}</p>
          <p><strong>Theatre:</strong> {theatre?.name}</p>
          <p><strong>Showtime:</strong> {showtime?.time}</p>
        </div>

        <h3 className="text-xl font-semibold mb-2">Select Seats</h3>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {seatLayout.map((seat) => (
            <button
              key={seat}
              onClick={() => handleSeatSelect(seat)}
              className={`py-2 rounded-lg text-white font-bold ${
                selectedSeats.includes(seat) ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              {seat}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Booking Summary</h4>
          <p>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
          <p>Total Price: ₹{calculateTotal()}</p>
        </div>

        <button
          onClick={proceedToPayment}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
