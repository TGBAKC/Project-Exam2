import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function VenueDetails() {
  const { id } = useParams(); // Venue ID
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_media=true&_meta=true`
        );
        const responseData = await response.json();
        
        console.log("📌 API'den gelen venue verisi:", responseData);
        
        if (!response.ok) {
          throw new Error("Failed to fetch venue details.");
        }

        setVenue(responseData.data); // API'den dönen veriyi doğru şekilde alıyoruz
      } catch (error) {
        console.error("❌ Venue detayları alınamadı:", error);
        setError(true);
      }
      setLoading(false);
    };
  
    fetchVenueDetails();
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (error || !venue) return <p>Failed to load venue details.</p>;

  const {
    name = "Venue Name Not Available",
    description = "Description not available.",
    price = "Not Available",
    maxGuests = "Not Specified",
    rating = "No Rating",
    media = [],
  } = venue;

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || price === "Not Available") return "N/A";
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `$${days * price}`;
  };

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates!");
      return;
    }

    navigate("/confirm", {
      state: {
        venueName: name,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        guests: numberOfGuests,
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginTop:"10rem",
        marginBottom:"10rem",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>{name}</h1>
      {media.length > 0 ? (
        <img
          src={media[0].url}
          alt="Venue"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ) : (
        <p>No Image Available</p>
      )}
      <p style={{ textAlign: "center", color: "#555" }}>{description}</p>
      <p>
        <strong>Price per night:</strong> ${price}
      </p>
      <p>
        <strong>Max Guests:</strong> {maxGuests}
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
        {rating}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <label>
          <strong>Select Start Date:</strong>
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        />
        <label>
          <strong>Select End Date:</strong>
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        />
        <label>
          <strong>Number of Guests:</strong>
        </label>
        <input
          type="number"
          value={numberOfGuests}
          min="1"
          max={maxGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      </div>
      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: "#EA6659",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        BOOK
      </button>
      <p>
        <strong>Total Price:</strong> {calculateTotalPrice()}
      </p>
    </div>
  );
}

export default VenueDetails;
