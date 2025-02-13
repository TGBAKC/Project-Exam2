import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VenueDetails from "./component/Header/VenueDetails";
import VenueList from "./component/Header/VenueList";
import CreateVenue from "./component/Header/CreateVenue";
import Header from "./component/Header";
import Login from "./component/Header/Login";
import Register from "./component/Header/Register";
import Footer from "./component/Header/Footer";
import ConfirmPage from "./component/Header/ConfirmPage";
import Dashboard from "./component/Header/Dashboard";
import EditVenue from "./component/Header/EditVenue";
import RegisterVenue from "./component/Header/RegisterVenue";
import EditBooking from "./component/Header/EditBooking";

function App() {
  return (
    <Router>
      {/* Sayfanın yüksekliğini en az ekran boyutunda olacak şekilde ayarladık */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        <Header />

        {/* İçeriğin footer'ı aşağı itmesi için flex: 1 ekledik */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/venueList" />} />
            <Route path="/venueList" element={<VenueList />} />
            <Route path="/edit-venue/:id" element={<EditVenue />} />
            <Route path="/create-venue" element={<CreateVenue />} />
            <Route path="/details/:id" element={<VenueDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/edit-booking" element={<EditBooking />} />
            <Route path="/registervenue" element={<RegisterVenue />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
