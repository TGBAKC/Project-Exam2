import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #EA6659;
  color: #fff;
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  width: 180px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
`;

const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
  color: ${(props) => (props.logout ? "red" : "inherit")};
`;

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  useEffect(() => {
    console.log("Dark Mode LocalStorage Güncelleniyor:", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    console.log("Dark Mode Toggled:", !darkMode);
  };

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
    <HeaderContainer>
      <Link to="/venueList" style={{ color: "#fff", textDecoration: "none" }}>
        HOLIDAZE
      </Link>

      <Nav>
        {!user ? (
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
            Login
          </Link>
        ) : (
          <div style={{ position: "relative" }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <UserAvatar src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="User Avatar" />
            </button>

            {menuOpen && (
              <DropdownMenu>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <MenuItem onClick={() => navigate("/dashboard")}>🏠 Dashboard</MenuItem>
                  <MenuItem onClick={() => navigate("/venueList")}>🏨 Venues</MenuItem>
                  <MenuItem onClick={toggleDarkMode}>{darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}</MenuItem>
                  <MenuItem onClick={handleLogout} logout>🔓 Logout</MenuItem>
                </ul>
              </DropdownMenu>
            )}
          </div>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
