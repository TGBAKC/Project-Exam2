import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    "name": "my_username",
  "email": "user@stud.noroff.no",
  "password": "securepassword",
  "venueManager": true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("You must use a @stud.noroff.no email to register.");
      return;
    }
  
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
  
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ...(formData.avatarUrl && { avatar: formData.avatarUrl }), // Sadece varsa ekler
          venueManager: formData.venueManager,
        }),
        
      });
  
      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const data = await response.json();
        console.error("API Error Response:", data.errors); // Hata detayları
        setError(data.errors ? data.errors[0].message : "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid grey",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Register</h1>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "20px",
          }}
        >
          <label>
            <strong>Name:</strong>
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
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formData.email}
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
            <strong>Password:</strong>
            <input
              type="password"
              name="password"
              value={formData.password}
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
            <strong>Venue Manager:</strong>
            <input
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleChange}
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#EA6659",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
