import React, { useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // Make sure this file contains the necessary CSS styles

const Sidebar = ({ sidebarVisible, onToggleSidebar }) => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => navigate("/dashboard"),
    },
    {
      label: "Reports",
      icon: "pi pi-fw pi-chart-line",
      items: [
        {
          label: "Member & Guests",
          icon: "pi pi-users",
          command: () => navigate("/reportgenerator"),
        },
        {
          label: "Payments",
          icon: "pi pi-indian-rupee",
          command: () => navigate("/paymentreportgenerator"),
        },
      ],
    },
    {
      label: "Members",
      icon: "pi pi-fw pi-users",
      command: () => navigate("/members"), // Ensure it points to /members
    },
    {
      label: "Scheduler",
      icon: "pi pi-fw pi-calendar",
      command: () => navigate("/scheduler"),
    },
    {
      label: "Guest",
      icon: "pi pi-users",
      command: () => navigate("/guestscreen"),
    },
    {
      label: "Packages",
      icon: "pi pi-tag",
      command: () => navigate("/packages"),
    },
    {
      label: "Admin Configuration",
      icon: "pi pi-user",
      command: () => navigate("/adminconfigurationform"),
    },
  ];

  return (
    <div className={`sidebar ${sidebarVisible ? "expanded" : "collapsed"}`}>
      {/* Toggle Sidebar Button */}
      <Button
        icon="pi pi-bars"
        onClick={onToggleSidebar}
        className="toggle-button"
      />

      {/* Render PanelMenu or icons based on the visibility of the sidebar */}
      {sidebarVisible ? (
        <PanelMenu model={items} style={{ width: "100%" }} />
      ) : (
        <div className="collapsed-menu">
          {items.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              className="collapsed-menu-icon"
              onClick={item.command}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
