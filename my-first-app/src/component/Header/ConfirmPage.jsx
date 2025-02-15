import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 🎨 Styled Components ile Bileşenlerin Tanımlanması
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  max-width: 400px;
  margin: 20px auto;
  border: 2px solid grey;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled.h3`
  margin-bottom: 20px;
  color: #555;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #444;
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

// 🎨 Dinamik Buton Bileşeni (renk seçeneği ile)
const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#ccc"};
  color: ${(props) => (props.bgColor === "#dc3545" ? "#fff" : "#000")};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {}; 
  const { id, venueName, startDate, endDate, guests } = bookingDetails;
  
  if (!bookingDetails || Object.keys(bookingDetails).length === 0) {
    return (
      <Container>
        <Title>No Booking Found!</Title>
        <InfoText>Please make a booking first.</InfoText>
      </Container>
    );
  }

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!id || id === "undefined") {
      alert("❌ Error: Invalid Booking ID!");
      return;
    }
  
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`❌ API Error: ${responseData.message || "Failed to delete booking"} (Status: ${response.status})`);
      }
  
      alert("✅ Booking deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error deleting booking: " + error.message);
    }
  };

  const handleEdit = () => {
    if (!id || id === "undefined") {
      alert("Something went wrong. Booking ID is missing!");
      return;
    }
    navigate(`/details/${id}`, { state: { editMode: true } });
  };

  return (
    <Container>
      <Title>Booking Confirmed!</Title>
      <Subtitle>Booking Details</Subtitle>
      <InfoText><strong>Venue:</strong> {venueName}</InfoText>
      <InfoText><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</InfoText>
      <InfoText><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</InfoText>
      <InfoText><strong>Guests:</strong> {guests}</InfoText>

      {/* 📌 Edit ve Delete Butonları */}
      <ButtonContainer>
        <Button bgColor="#ffc107" onClick={handleEdit}>Edit</Button>
        <Button bgColor="#dc3545" onClick={handleDelete}>Delete</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ConfirmPage;
