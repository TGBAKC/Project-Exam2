import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // Token'ı temizle
      navigate("/login"); // Giriş sayfasına yönlendir
    }
  };

  return (
    <header
      style={{
        display: "flex",
      
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#EA6659",
        color: "#fff",
      }}
    >
        <Link to="/venueList" style={{ color: "#fff", textDecoration: "none" }}>
     HOLIDAZE
        </Link>
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/venueList" style={{ color: "#fff", textDecoration: "none" }}>
          Venues
        </Link>
        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
      Login
        </Link>
  
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>
      
    </header>
  );
};

export default Header;
