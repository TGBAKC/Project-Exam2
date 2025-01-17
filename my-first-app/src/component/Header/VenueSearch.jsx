import React, { useState } from "react";

function VenueSearch() {
  const [query, setQuery] = useState(""); // Kullanıcının girdiği sorgu
  const [results, setResults] = useState([]); // API'den dönen sonuçlar
  const [error, setError] = useState(""); // Hata mesajı
  const [loading, setLoading] = useState(false); // Yükleme durumu
  
  const handleSearch = async () => {
    console.log("Search triggered:", query); // Kullanıcı sorgusunu kontrol edin
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`
      );
      console.log("API Response Status:", response.status);
      const data = await response.json();
      console.log("API Response Data:", data);
      setResults(data.data || []);
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "blue" }}>Search Venues</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ marginTop: "20px", padding: "0", listStyle: "none" }}>
        {results.length === 0 && !loading && !error && (
          <p>No results found for "{query}"</p>
        )}
        {results.map((venue) => (
          <li
            key={venue.id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{venue.name}</h2>
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
            <p style={{ fontSize: "14px", color: "#555" }}>{venue.description}</p>
            <p style={{ fontWeight: "bold" }}>Price: ${venue.price} per night</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Rating: {venue.rating}</p>
            <ul>
              {venue.meta?.wifi && <li>WiFi Available</li>}
              {venue.meta?.parking && <li>Parking Available</li>}
              {venue.meta?.breakfast && <li>Breakfast Included</li>}
              {venue.meta?.pets && <li>Pets Allowed</li>}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VenueSearch;
