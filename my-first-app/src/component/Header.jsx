import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // ✅ App.css, `src/` klasörünün içinde olduğu için bir seviye yukarı çıkıyoruz


const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  // ✅ Kullanıcı bilgisi localStorage'dan her değişiklikte güncelleniyor
  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    updateUser(); // İlk başta çalıştır

    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  // ✅ Dark Mode değiştiğinde body class'ını güncelle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ✅ Dark Mode'u Aç/Kapat
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // ✅ Kullanıcı çıkış yaptığında işlemleri yap
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/login");

      window.dispatchEvent(new Event("storage"));
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
        position: "relative",
      }}
    >
      <Link to="/venueList" style={{ color: "#fff", textDecoration: "none" }}>
        HOLIDAZE
      </Link>

      <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {!user ? (
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
            Login
          </Link>
        ) : (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="User Avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                  width: "180px",
                  background: "#fff",
                  color: "#333",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  zIndex: 10,
                }}
              >
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <li
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={() => navigate("/dashboard")}
                  >
                    🏠 Dashboard
                  </li>
                  <li
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={() => navigate("/venueList")}
                  >
                    🏨 Venues
                  </li>
                  <li
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={toggleDarkMode} // 🔥 Dark Mode'u aç/kapat
                  >
                    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                  </li>
                  <li
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "red",
                    }}
                    onClick={handleLogout}
                  >
                    🔓 Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
