import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VenueDetails from './component/Header/VenueDetails';
import VenueSearch from './component/Header/VenueSearch';
import VenueList from './component/Header/VenueList';
import CreateVenue from './component/Header/CreateVenue';
import Header from './component/Header';
import Login from './component/Header/Login';
import Register from './component/Header/Register';
import Footer from './component/Header/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/venueList" element={<VenueList />} />
          <Route path="/search" element={<VenueSearch />} />
          <Route path="/create-venue" element={<CreateVenue />} />
          <Route path="/details/:id" element={<VenueDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
