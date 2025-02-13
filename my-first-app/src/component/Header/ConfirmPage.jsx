import { useLocation, useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {}; // Eğer state undefined ise boş obje atar
  const { id, venueName, startDate, endDate, guests } = bookingDetails;
  

  if (!bookingDetails) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>No Booking Found!</h1>
        <p>Please make a booking first.</p>
      </div>
    );
  }


  const handleDelete = async () => {
    const token = localStorage.getItem("authToken"); 
    console.log("🛂 Auth Token:", token);
    if (!id || id === "undefined") {
      alert("❌ Error: Invalid Booking ID!");
      return;
    }
  
    try {
      console.log("🔍 Trying to delete booking with ID:", id);
      console.log("🛂 Sending Authorization Token:", token); 
  
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
  
      console.log("📡 API Status Code:", response.status);
      const responseData = await response.json();
      console.log("📌 API Response:", responseData);
  
      if (!response.ok) {
        throw new Error(`❌ API Error: ${responseData.message || "Failed to delete booking"} (Status: ${response.status})`);
      }
  
      alert("✅ Booking deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error deleting booking:", error);
      alert("Error deleting booking: " + error.message);
    }
  };
  
  
  
  
  const handleEdit = () => {
    if (!id || id === "undefined") {
      console.error("❌ Error: Booking ID is missing!");
      alert("Something went wrong. Booking ID is missing!");
      return;
    }
  
    console.log("Navigating to Venue Details Page with Edit Mode");
    navigate(`/details/${id}`, { state: { editMode: true } });
  };
  
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "30px",
        maxWidth: "400px",
        margin: "20px auto",
        border: "2px solid grey",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ marginBottom: "10px", color: "#333" }}>Booking Confirmed!</h1>
      <h3 style={{ marginBottom: "20px", color: "#555" }}>Booking Details</h3>
      <p><strong>Venue:</strong> {venueName}</p>
      <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
      <p><strong>Guests:</strong> {guests}</p>

      {/* 📌 Edit ve Delete Butonları */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button
  onClick={handleEdit}
  style={{
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Edit
</button>

        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;