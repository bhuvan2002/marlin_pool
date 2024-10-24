import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import MemberList from "./components/Member/MemberList";
import NewMemberRegistration from "./components/Member/NewMemberRegistration";
import GuestScreen from "./components/Guest/GuestScreen";
import Package from "./components/Packages/packages";
import Scheduler from "./components/Schedular/Scheduler";
import AdminConfigurationForm from "./components/AdminConfiguration/AdminConfigurationForm";
import PaymentReportGenerator from "./components/Reports/PaymentReportGenerator";
import ReportGenerator from "./components/Reports/ReportGenerator";
import UserProfileScreen from "./components/UserProfile/userProfile";
import UserProfileDashboard from "./components/UserProfile/userProfiledashbord";
import "./App.css";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <Header />
        </header>
        <div className="main-content-wrapper">
          <Sidebar sidebarVisible={sidebarVisible} onToggleSidebar={toggleSidebar} />
          <div className={`main-content ${sidebarVisible ? "expanded" : "collapsed"}`}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<MemberList />} />
              <Route path="/newmemberregistration" element={<NewMemberRegistration />} />
              <Route path="/guestscreen" element={<GuestScreen />} />
              <Route path="/packages" element={<Package />} />
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/adminconfigurationform" element={<AdminConfigurationForm />} />
              <Route path="/reportgenerator" element={<ReportGenerator />} />
              <Route path="/paymentreportgenerator" element={<PaymentReportGenerator />} />
              <Route path="/UserProfileScreen" element={<UserProfileScreen />} />
              <Route path="/UserProfiledashbord" element={<UserProfileDashboard />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
