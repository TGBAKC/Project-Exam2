import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [venues, setVenues] = useState([]); // 📌 Venues listesi için state
  const [isVenueManager, setIsVenueManager] = useState(false); // 📌 Venue Manager olup olmadığını kontrol etmek için state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedApiKey = localStorage.getItem("apiKey");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setIsVenueManager(storedUser.venueManager);

      if (!storedApiKey) {
        createApiKey();
      }

      if (storedUser.venueManager) {
        fetchVenues(); // ✅ Hata vermemesi için fonksiyon aşağıda tanımlandı
      }
    }
  }, [navigate]);

  // ✅ Eksik olan createApiKey fonksiyonunu ekledik
  const createApiKey = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("❌ No auth token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "My API Key" }),
      });

      if (!response.ok) throw new Error("Failed to create API Key");

      const data = await response.json();
      console.log("✅ API Key created:", data.data.key);

      localStorage.setItem("apiKey", data.data.key);
    } catch (error) {
      console.error("❌ Error creating API Key:", error);
    }
  };

  // ✅ Eksik olan fetchVenues fonksiyonunu ekledik
  const fetchVenues = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found!");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch venues");
      }

      const data = await response.json();
      setVenues(data.data); // 📌 Gelen venue listesini state'e kaydet
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  // ✅ Eksik olan handleBecomeVenueManager fonksiyonunu ekledik
  const handleBecomeVenueManager = async () => {
    if (!user) return;

    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!token || !apiKey) {
      console.error("❌ Missing access token or API key!");
      alert("❌ API Key is missing! Please refresh the page or log in again.");
      return;
    }

    const encodedUserName = encodeURIComponent(user.name);
    const apiUrl = `https://v2.api.noroff.dev/holidaze/profiles/${encodedUserName}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ venueManager: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(errorData.errors?.[0]?.message || "Failed to become a Venue Manager.");
      }

      // Kullanıcı bilgilerini güncelle
      const updatedUser = { ...user, venueManager: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsVenueManager(true); // State güncellemesi

      alert("✅ You are now a Venue Manager!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Dashboard</h1>
      <p><strong>Username:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Venue Manager:</strong> {isVenueManager ? "Yes" : "No"}</p>

      {!isVenueManager ? (
        <button
          onClick={handleBecomeVenueManager}
          style={{
            backgroundColor: "#EA6659",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Venue Manager
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
      {/* Eğer Venue Manager ise venues listesini göster */}
{isVenueManager && venues.length > 0 ? (
  <div>
    <h3>Your Venues</h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {venues.map((venue) => (
        <li key={venue.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
          <strong>{venue.name}</strong>
        </li>
      ))}
    </ul>
  </div>
) : (
  isVenueManager && <p>You have no venues yet.</p>
)}

    </div>
  );
}

export default Dashboard;
