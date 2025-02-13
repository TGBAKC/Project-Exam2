import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]);
  const [isVenueManager, setIsVenueManager] = useState(false);

  // Kullanıcı bilgisini localStorage'dan al ve durumu güncelle
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    } else {
      setUser(storedUser);
      setIsVenueManager(storedUser.venueManager);
    }
  }, [navigate]);

  // Venue Manager olma işlemi
  const becomeVenueManager = () => {
    if (!user) return;
    
    // Kullanıcıyı Venue Manager olarak güncelle
    const updatedUser = { ...user, venueManager: true };
    setUser(updatedUser);
    setIsVenueManager(true);
    
    // Güncellenmiş kullanıcıyı localStorage'a kaydet
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Kullanıcıyı registervenue sayfasına yönlendir
    navigate("/registervenue");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Dashboard</h1>
      <p><strong>Username:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Venue Manager:</strong> {isVenueManager ? "Yes" : "No"}</p>

      {!isVenueManager ? (
        <button
          onClick={becomeVenueManager} // 🔥 Butona basınca Venue Manager olacak
          style={{
            backgroundColor: "#EA6659",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Become a Venue Manager
        </button>
      ) : (
        <>
          <h3>🎉 Welcome, Venue Manager!</h3>
          <button
            onClick={() => navigate("/registervenue")}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Register New Venue
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
