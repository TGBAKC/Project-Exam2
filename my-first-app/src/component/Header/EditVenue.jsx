import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVenue = () => {
  const { id } = useParams(); // URL'den mekan ID'sini al
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Mevcut mekan bilgilerini çek
  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch venue details.");
        const data = await response.json();

        setFormData({
          name: data.data.name,
          description: data.data.description,
          price: data.data.price,
          maxGuests: data.data.maxGuests,
          media: data.data.media.join(","), // Dizi olarak gelen medya URL'lerini virgülle birleştir
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load venue details.");
      }
      setLoading(false);
    };

    fetchVenueDetails();
  }, [id]);

  // ✅ Formdaki değişiklikleri yönet
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Güncelleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
        alert("Venue updated successfully!");
        navigate("/dashboard"); // Başarılı düzenleme sonrası yönlendirme
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update venue.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Edit Venue</h1>

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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVenue;
