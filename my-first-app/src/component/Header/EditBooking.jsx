import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking] = useState(null); // ✅ setBooking kaldırıldı


  console.log("Location State:", location.state); // ✅ Gelen veriyi kontrol et
  console.log("Booking Data:", booking);
  console.log("Booking ID:", booking?.id);

  useEffect(() => {
    if (!booking || !booking.id) {
      console.error("No booking data found! Redirecting...");
      navigate("/dashboard"); // Eğer veri eksikse dashboard'a yönlendir
    }
  }, [booking, navigate]);

  return booking ? (
    <div>
      <h1>Edit Booking</h1>
      <p>Editing Booking ID: {booking.id}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditBooking;
