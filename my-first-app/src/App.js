import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VenueDetails from "./component/Header/VenueDetails";
import VenueList from "./component/Header/VenueList";
import CreateVenue from "./component/Header/CreateVenue";
import Header from "./component/Header";
import Login from "./component/Header/Login";
import Register from "./component/Header/Register";
import Footer from "./component/Header/Footer";
import ConfirmPage from "./component/Header/ConfirmPage";
import Dashboard from "./component/Header/Dashboard";
import SearchBar from "./component/Header/SearchBar";
import EditVenue from "./component/Header/EditVenue";
import ProtectedRoute from "./component/Header/ProtectedRoute"; // ProtectedRoute eklendi
import RegisterVenue from "./component/Header/RegisterVenue";
import EditBooking from "./component/Header/EditBooking";
function App() {
  return (
    <Router>
      <div className="App">
    
        <Header />

        <Routes>
      
          <Route
            path="/venueList"
            element={
              <>
       
                <VenueList />
              </>
            }
          />

          {/* Diğer rotalar */}
          <Route path="/edit-venue/:id" element={<EditVenue />} />
          <Route path="/create-venue" element={<CreateVenue />} />
          <Route path="/details/:id" element={<VenueDetails />} /> {/* ✅ Yeni rota eklendi */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<ConfirmPage />} />

          <Route path="/edit-booking" element={<EditBooking />} /> 
          <Route path="/registervenue" element={<RegisterVenue />} />
          <Route path="/edit-venue/:id" element={<EditVenue />} />

          {/* Korunan rota */}
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
