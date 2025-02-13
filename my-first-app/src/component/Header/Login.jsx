import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      // ✅ Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("authToken", data.data.accessToken);

      // ✅ Header güncellemesi için event tetikle
      window.dispatchEvent(new Event("storage"));

      // ✅ Başarılı giriş sonrası yönlendirme
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",

      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "5px", color: "#333", fontSize: "22px" }}>Welcome Back!</h2>
        <p style={{ marginBottom: "20px", color: "#777", fontSize: "14px" }}>Please login to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            transition: "border 0.3s ease-in-out",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #EA6659")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            transition: "border 0.3s ease-in-out",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #EA6659")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#EA6659",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#d45548")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#EA6659")}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#EA6659",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
