import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faCar,
  faCoffee,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [query, setQuery] = useState(""); // Search query
  const [loading, setLoading] = useState(false);

  const fetchVenues = async (searchQuery = "") => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `https://v2.api.noroff.dev/holidaze/venues/search?q=${searchQuery}&_media=true&_meta=true`
        : `https://v2.api.noroff.dev/holidaze/venues?_media=true&_meta=true`;
      const response = await fetch(url);
      const data = await response.json();
      setVenues(data.data); // Save venue data to state
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <div
      style={{
        marginTop: "10rem",
        marginBottom:"10rem",
        display: "flex",
        flexDirection: "row", // Arrange venues in a row
        flexWrap: "wrap", // Wrap to new line when necessary
        gap: "20px", // Add spacing between venues
        width: "100%",
        justifyContent: "center", // Center content
      }}
    >
      {venues.map((venue) => (
        <Link
          to={`/details/${venue.id}`} // Navigate to VenueDetails
          key={venue.id}
          style={{
            textDecoration: "none", // Remove underline
            color: "inherit", // Inherit text color
          }}
        >
          <div
            style={{
              border: "1px solid gray",
              padding: "20px",
              width: "20rem",
              height: "35rem", // Venue card size
              borderRadius: "5px",
              transition: "transform 0.3s",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>{venue.name}</h2>

            {/* Venue Image */}
            {venue.media && venue.media.length > 0 ? (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || "Venue Image"}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <p>No Image Available</p>
            )}

            <p style={{ fontSize: "10px", color: "#555" }}>{venue.description}</p>
            <p style={{ fontWeight: "bold" }}>Price: ${venue.price} per night</p>
            <p style={{ fontSize: "10px" }}>Max Guests: {venue.maxGuests}</p>
            <p style={{ fontSize: "10px" }}>Rating: {venue.rating}</p>

            {/* Meta Information */}
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "20px",
                gap: "10px",
              }}
            >
              {venue.meta?.wifi && (
                <li style={{ listStyle: "none", display: "flex", fontSize: "10px", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faWifi}
                    style={{ marginRight: "5px", fontSize: "10px", color: "green" }}
                  />
                  <span>WiFi</span>
                </li>
              )}
              {venue.meta?.parking && (
                <li style={{ listStyle: "none", display: "flex", fontSize: "10px", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faCar}
                    style={{ marginRight: "5px", fontSize: "10px", color: "blue" }}
                  />
                  <span>Parking</span>
                </li>
              )}
              {venue.meta?.breakfast && (
                <li style={{ listStyle: "none", display: "flex", fontSize: "10px", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faCoffee}
                    style={{ marginRight: "5px", fontSize: "10px", color: "orange" }}
                  />
                  <span>Breakfast</span>
                </li>
              )}
              {venue.meta?.pets && (
                <li style={{ listStyle: "none", display: "flex", fontSize: "10px", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faDog}
                    style={{ marginRight: "5px", fontSize: "10px", color: "brown" }}
                  />
                  <span>Pets</span>
                </li>
              )}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VenueList;
