import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken"); // Giriş kontrolü

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Tokeni temizle
    navigate("/login"); // Login sayfasına yönlendir
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      {/* Sol tarafa Holidaze bağlantısı */}
      <Link
        to="/VenueList"
        style={{
          marginRight: "15px",
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        Holidaze
      </Link>

      {/* Sağ tarafa dinamik bağlantılar */}
      <div>
        {isLoggedIn ? (
          // Kullanıcı giriş yaptıysa
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/customer-dashboard"
              style={{
                marginRight: "15px",
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
          <i
    className="fa fa-user-circle"
    style={{
      marginRight: "8px", // Metin ile ikon arasında boşluk
      fontSize: "30px",
      color:"white", // İkon boyutu
    }}
  ></i>
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          // Kullanıcı giriş yapmamışsa
          <div>
            <Link
              to="/login"
              style={{
                marginRight: "15px",
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
