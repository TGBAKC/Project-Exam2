import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateVenue = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [],
  });
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // Kullanıcının rolünü kontrol et
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/holidaze/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data.");
        const data = await response.json();

        // Sadece Venue Manager kullanıcılarına izin ver
        if (data.role !== "Venue Manager") {
          alert("You must be a Venue Manager to create venues.");
          navigate("/dashboard");
        } else {
          setUserRole(data.role);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  // Form değişikliklerini yönet
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.maxGuests) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          maxGuests: Number(formData.maxGuests),
          media: formData.media.split(","), // Virgülle ayrılmış medya URL'lerini diziye çevir
        }),
      });

      if (response.ok) {
        alert("Venue created successfully!");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create venue.");
      }
    } catch (err) {
      console.error("Error creating venue:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Create Venue</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {userRole === "Venue Manager" && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label>
            <strong>Venue Name:</strong>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>

          <label>
            <strong>Description:</strong>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>

          <label>
            <strong>Price per Night:</strong>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>

          <label>
            <strong>Max Guests:</strong>
            <input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>

          <label>
            <strong>Media (comma-separated URLs):</strong>
            <input
              type="text"
              name="media"
              value={formData.media}
              onChange={handleChange}
              placeholder="e.g., https://example.com/image1.jpg,https://example.com/image2.jpg"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Create Venue
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateVenue;
