import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login butonuna basıldı!"); // ✅ Bu satır çalışıyor mu?
  
    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("Please use a valid @stud.noroff.no email address.");
      console.log("Geçersiz e-posta!"); // ✅ E-posta yanlışsa buraya düşecek
      return;
    }
  
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      console.log("API'ye istek atıldı!"); // ✅ API'ye istek gidiyor mu?
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Giriş hatası:", errorData);
        throw new Error(errorData.errors?.[0]?.message || "Invalid login credentials.");
      }
  
      const data = await response.json();
      console.log("API Yanıtı:", data); // ✅ API'den gelen veri
  
      localStorage.setItem("authToken", data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));
  
      console.log("Token kaydedildi:", localStorage.getItem("authToken")); // ✅ Token var mı?
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Login işlemi başarısız:", error);
      setError(error.message);
    }
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", padding: "20px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }} />
        <button type="submit" style={{ backgroundColor: "#EA6659", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" }}>Login</button>
        <Link to="/register" style={{ color: "#EA6659", textDecoration: "none" ,textAlign:"center",marginTop:"10px"}}>
  Dont have an account.Register here
        </Link>
      </form>
    
      {error && <div style={{ marginTop: "15px", color: "red", padding: "10px", border: "1px solid red", borderRadius: "5px", backgroundColor: "#ffe6e6" }}>{error}</div>}
   
    </div>
  );
}

export default Login;
