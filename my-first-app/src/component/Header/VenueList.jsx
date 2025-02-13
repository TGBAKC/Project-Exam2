import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#FFD700" }} />);
    } else if (i - 0.5 === rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: "#FFD700" }} />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ccc" }} />);
    }
  }
  return <span>{stars}</span>;
};
const VenueList = () => {
  const [venues, setVenues] = useState([]); // Mekanlar
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu

  const fetchVenues = async (searchQuery = "") => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://v2.api.noroff.dev/holidaze/venues?_media=true&_meta=true`;
      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log("API Response:", data); // Gelen veriyi kontrol et

      // Arama sorgusuna uygun sonuçları filtrele
      if (!searchQuery) {
        setVenues(data.data); // Tüm mekanları göster
      } else {
        const filteredData = data.data.filter((venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setVenues(filteredData); // Filtrelenmiş sonuçları state'e aktar
      }
    } catch (err) {
      setError("Failed to fetch venues. Please try again later.");
      console.error("Error fetching venues:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues(); // İlk yüklendiğinde tüm mekanları getir
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <h1>Venues</h1>
      <SearchBar onSearch={fetchVenues} />
      {loading && <p>Loading venues...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {venues.length > 0 ? (
          venues.map((venue) => (
            <Link
              to={`/details/${venue.id}`} // Detay sayfasına yönlendirme
              key={venue.id}
              style={{
                textDecoration: "none", // Link dekorasyonunu kaldır
                color: "inherit", // Yazı rengini koru
              }}
            >
            <div
 style={{
  flex: "1 1 calc(25% - 20px)", // Kartlar 4 sütun düzenine uyum sağlar (büyük ekranlarda)
  maxWidth: "calc(25% - 20px)", // Maksimum genişlik 4 sütun düzeni
  minWidth: "300px", // Kartlar için minimum genişlik
  marginBottom: "15px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  cursor: "pointer",
}}
>
                {venue.media?.length > 0 && (
                  <img
                    src={venue.media[0].url}
                    alt={venue.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <p>
                  <strong>{venue.name}</strong>
                </p>
                <p>
                  <strong>Rating:</strong> <Rating rating={venue.rating || 0} />
                </p>
                <p>
  <FontAwesomeIcon
    icon={faMapMarkerAlt}
    style={{ color: "#EA6659", marginRight: "5px" }}
  />
  {venue.location?.address || "Address not available"}
</p>

                <p>Price: ${venue.price}</p>
                <p>Max Guests: {venue.maxGuests}</p>
                <p>Rating:{venue.rating}</p>
                <p style={{color:"#EA6659",}}>CHECHK AVAILABILITY</p>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default VenueList;
