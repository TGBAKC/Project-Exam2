import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const VenueGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const VenueCard = styled(Link)`
  flex: 1 1 calc(25% - 20px);
  max-width: calc(25% - 20px);
  min-width: 300px;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const AvailabilityText = styled.p`
  color: #ea6659;
  font-weight: bold;
`;

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
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVenues = async (searchQuery = "") => {
    console.log("Search Query:", searchQuery); // ✅ Arama parametresini kontrol et
    setLoading(true);
    setError(null);
  
    try {
      let url = `https://v2.api.noroff.dev/holidaze/venues?_media=true&_meta=true`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API request failed");
      }
  
      const data = await response.json();
      console.log("API Raw Response:", data); // ✅ API yanıtını konsola yazdır
  
      const venuesList = data.data || data; // ✅ Eğer `data.data` yoksa direkt `data` kullan
  
      const filteredData = venuesList
        .filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((venue) => ({
          ...venue,
          media: venue.media || [], // Eğer medya eksikse boş array ata
        }));
  
      setVenues(filteredData);
    } catch (err) {
      setError("Failed to fetch venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <Container>
      <Title>Venues</Title>
      <SearchBar onSearch={fetchVenues} />
      {loading && <p>Loading venues...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <VenueGrid>
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCard to={`/details/${venue.id}`} key={venue.id}>
              {venue.media?.length > 0 && <VenueImage src={venue.media[0].url} alt={venue.name} />}
              <p><strong>{venue.name}</strong></p>
              <p><strong>Rating:</strong> <Rating rating={venue.rating || 0} /></p>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#EA6659", marginRight: "5px" }} />
                {venue.location?.address || "Address not available"}
              </p>
              <p>Price: ${venue.price}</p>
              <p>Max Guests: {venue.maxGuests}</p>
              <p>Rating: {venue.rating}</p>
              <AvailabilityText>CHECK AVAILABILITY</AvailabilityText>
            </VenueCard>
          ))
        ) : (
          !loading && <p>No venues found.</p>
        )}
      </VenueGrid>
    </Container>
  );
};

export default VenueList;
