import React, { useState } from "react";

function CreateVenue() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      country: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        meta: { ...formData.meta, [name]: checked },
      });
    } else if (name in formData.location) {
      setFormData({
        ...formData,
        location: { ...formData.location, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || formData.price <= 0) {
      alert("Please fill out all required fields.");
      return;
    }
    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Venue created:", data);
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter Destination"
        value={formData.name}
        onChange={handleChange}
        required
      />
    
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="maxGuests"
        placeholder="Max Guests"
        value={formData.maxGuests}
        onChange={handleChange}
      />
      <div>
       
      </div>
    
      <input
        type="search"
        name="country"
        placeholder="Country"
        value={formData.location.country}
        onChange={handleChange}
      />
      <button type="submit">Create Venue</button>
    </form>
  );
}

export default CreateVenue;
