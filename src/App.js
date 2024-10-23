import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import MemberList from "./components/Member/MemberList";
import GuestScreen from "./components/Guest/GuestScreen";
import Package from "./components/Packages/packages";
import Scheduler from "./components/Schedular/Scheduler"
import "./App.css";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content-wrapper">
          <Sidebar sidebarVisible={sidebarVisible} onToggleSidebar={toggleSidebar} />
          <div className={`main-content ${sidebarVisible ? "expanded" : "collapsed"}`}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<MemberList />} />
              <Route path="/guestscreen" element={<GuestScreen />} />
              <Route path="/packages" element={<Package />} />
              <Route path="/scheduler" element={<Scheduler />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
