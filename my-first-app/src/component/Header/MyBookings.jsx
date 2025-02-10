import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      console.error("No token or user found! Redirecting to login...");
      navigate("/login");
      return;
    }

    console.log("Stored Token:", token);
    console.log("Fetching bookings for:", user.name);

    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch bookings.");
        }

        const data = await response.json();
        setBookings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} style={{ marginBottom: "10px" }}>
              <strong>{booking.venue.name}</strong> - {new Date(booking.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/dashboard")} style={{ padding: "10px", backgroundColor: "#EA6659", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default MyBookings;
