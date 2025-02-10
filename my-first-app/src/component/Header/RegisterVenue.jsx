import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterVenue() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    maxGuests: 1,
    price: 1,
    media: [],
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.venueManager) {
      alert("You must be a Venue Manager to create a venue!");
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevState) => {
      if (name.startsWith("location.")) {
        const field = name.split(".")[1];
        return {
          ...prevState,
          location: {
            ...prevState.location,
            [field]: value,
          },
        };
      } else if (name === "media") {
        return {
          ...prevState,
          media: value ? value.split(",").map((url) => ({ url: url.trim() })) : [],
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...venueData,
      maxGuests: Number(venueData.maxGuests),
      price: Number(venueData.price),
      location: venueData.location,
    };

    console.log("✅ API'ye Gönderilecek Veri:", JSON.stringify(dataToSend, null, 2));

    let token = localStorage.getItem("authToken");
    let apiKey = localStorage.getItem("apiKey");

    if (!token || !apiKey) {
      alert("❌ API Key is missing! Please refresh the page or log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      console.log("🟢 API Yanıtı:", responseData);

      if (responseData.errors) {
        alert(`❌ API Hatası: ${responseData.errors[0]?.message || "Bilinmeyen hata"}`);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        alert(responseData.errors?.[0]?.message || "Failed to create venue.");
        setLoading(false);
        return;
      }

      const venueId = responseData?.data?.id || responseData?.id;
      if (!venueId) {
        console.error("❌ Venue ID alınamadı!", responseData);
        alert("❌ Venue ID alınamadı! Lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }

      alert("✅ Venue created successfully!");
      setTimeout(() => {
        navigate(`/details/${venueId}`); // Başarıyla oluşturulan venue sayfasına yönlendir
      }, 500);
    } catch (error) {
      console.error("❌ Error creating venue:", error);
      alert("❌ Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Register Venue</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid grey",
          borderRadius: "10px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        <input type="text" name="name" placeholder="Venue Name" value={venueData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={venueData.description} onChange={handleChange} required />
        <input type="number" name="maxGuests" placeholder="Max Guests" value={venueData.maxGuests} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price per Night" value={venueData.price} onChange={handleChange} required />
        <input type="text" name="media" placeholder="Add Media URLs (comma separated)" value={venueData.media.map(m => m.url).join(", ") || ""} onChange={handleChange} required />
        <input type="text" name="location.address" placeholder="Address" value={venueData.location.address} onChange={handleChange} required />
        <input type="text" name="location.city" placeholder="City" value={venueData.location.city} onChange={handleChange} required />
        <input type="text" name="location.zip" placeholder="ZIP Code" value={venueData.location.zip} onChange={handleChange} required />
        <input type="text" name="location.country" placeholder="Country" value={venueData.location.country} onChange={handleChange} required />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", backgroundColor: "#EA6659", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          {loading ? "Processing..." : "REGISTER VENUE"}
        </button>
      </form>
    </div>
  );
}

export default RegisterVenue;
