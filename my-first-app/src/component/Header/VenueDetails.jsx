import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faParking, faCoffee, faPaw, faStar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [startDate, setStartDate] = useState(null); // Başlangıç tarihi
  const [endDate, setEndDate] = useState(null); // Bitiş tarihi

  // API'den venue bilgilerini çek
  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_media=true&_meta=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue details.");
        }
        const data = await response.json();
        setVenue(data.data);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError(true);
      }
      setLoading(false);
    };

    fetchVenueDetails();
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (error || !venue) return <p>Failed to load venue details.</p>;

  // Venue bilgilerini çöz
  const {
    name = "Venue Name Not Available",
    description = "Description not available.",
    price = "Not Available",
    maxGuests = "Not Specified",
    rating = "No Rating",
    media = [],
    meta = {},
    location = {},
  } = venue;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        marginTop: "10rem",
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Medya Bölümü */}
      {media.length > 0 ? (
        <img
          src={media[0].url}
          alt={media[0].alt || "Venue Image"}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />
      ) : (
        <p>No Image Available</p>
      )}

      {/* Başlık Bölümü */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{name}</h1>
        <p>
          <strong>Rating:</strong>
          <FontAwesomeIcon icon={faStar} style={{ color: "gold", marginLeft: "5px" }} />
          {rating}
        </p>
      </div>

      {/* Adres Bilgisi */}
      <ul>
        <li style={{ fontSize: "12px", listStyle: "none" }}>
          <strong>Address:</strong> {location.address || "Not Provided"}
        </li>
      </ul>

      {/* Detaylar */}
      <div>
        <p style={{ fontSize: "12px" }}>
          <strong>Description:</strong> {description}
        </p>
        <p style={{ display: "flex", justifyContent: "right" }}>
          <strong>Price:</strong> {price !== "Not Available" ? `$${price}` : price}
        </p>
        <p>
          <strong>Max Guests:</strong> {maxGuests}
        </p>
      </div>

      {/* Meta Bilgileri */}
      <ul style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        {meta.wifi && (
          <li>
            <FontAwesomeIcon icon={faWifi} /> WiFi Available
          </li>
        )}
        {meta.parking && (
          <li>
            <FontAwesomeIcon icon={faParking} /> Parking Available
          </li>
        )}
        {meta.breakfast && (
          <li>
            <FontAwesomeIcon icon={faCoffee} /> Breakfast Included
          </li>
        )}
        {meta.pets && (
          <li>
            <FontAwesomeIcon icon={faPaw} /> Pets Allowed
          </li>
        )}
      </ul>

      {/* Takvim */}
      <div style={{ marginTop: "20px",fontSize:"12px" ,}}>
        <label>
          <strong>Select Start Date:</strong>
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select start date"
          style={{ width: "100%", marginTop: "10px" }}
        />
        <label style={{ marginTop: "10px",fontSize:"12px", }}>
          <strong>Select End Date:</strong>
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Select end date"
          style={{ width: "100%", marginTop: "10px" ,}}
        />
      </div>

      {/* Rezervasyon Butonu */}
      <button
        style={{
          backgroundColor: "brown",
          color: "white",
          width: "100%",
          height: "3rem",
          cursor: "pointer",
          border: "none",
          marginTop: "20px",
        }}
        onClick={() => {
          if (!startDate || !endDate) {
            alert("Please select both start and end dates!");
          } else {
            alert(
              `Booking confirmed from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
            );
          }
        }}
      >
        Select dates to book
      </button>
    </div>
  );
}

export default VenueDetails;
