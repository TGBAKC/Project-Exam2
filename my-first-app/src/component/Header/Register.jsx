import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("Lütfen geçerli bir @stud.noroff.no e-posta adresi kullanın.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Kayıt işlemi başarısız.");
      }

      const data = await response.json();
      setSuccess("Kayıt başarılı! Yönlendiriliyor...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "2rem", color: "#333" }}>Register</h1>
      <form style={{ display: "flex", flexDirection: "column", width: "300px", backgroundColor: "#fff", padding: "20px 30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }} />
        <label style={{ marginBottom: "15px", fontSize: "16px", color: "#333" }}>
          <input type="checkbox" name="venueManager" checked={formData.venueManager} onChange={handleChange} style={{ marginRight: "10px" }} />
          Are you a Venue Manager?
        </label>
        <button type="submit" style={{ backgroundColor: "#4CAF50", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" }}>
          Register
        </button>
      </form>
      {loading && <p style={{ color: "blue", marginTop: "15px", fontSize: "14px" }}>Kayıt işlemi yapılıyor...</p>}
      {error && <p style={{ color: "red", marginTop: "15px", fontSize: "14px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "15px", fontSize: "14px" }}>{success}</p>}
    </div>
  );
}

export default Register;
