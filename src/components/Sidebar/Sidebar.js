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
      className: "menu-item-dashboard" // Unique class for Dashboard
    },
    {
      label: "Reports",
      icon: "pi pi-fw pi-chart-line",
      items: [
        {
          label: "Member & Guests",
          icon: "pi pi-users",
          command: () => navigate("/reportgenerator"),
          className: "submenu-item-reports-members-guests" // Unique class for "Member & Guests"
        },
        {
          label: "Payments",
          icon: "pi pi-indian-rupee",
          command: () => navigate("/paymentreportgenerator"),
          className: "submenu-item-reports-payments" // Unique class for Payments
        },
      ],
      className: "menu-item-reports" // Unique class for Reports
    },
    {
      label: "Members",
      icon: "pi pi-fw pi-users",
      command: () => navigate("/members"),
      className: "menu-item-members" // Unique class for Members
    },
    {
      label: "Scheduler",
      icon: "pi pi-fw pi-calendar",
      command: () => navigate("/scheduler"),
      className: "menu-item-scheduler" // Unique class for Scheduler
    },
    {
      label: "Guest",
      icon: "pi pi-users",
      command: () => navigate("/guestscreen"),
      className: "menu-item-guest" // Unique class for Guest
    },
    {
      label: "Packages",
      icon: "pi pi-tag",
      command: () => navigate("/packages"),
      className: "menu-item-packages" // Unique class for Packages
    },
    {
      label: "Admin Configuration",
      icon: "pi pi-user",
      command: () => navigate("/adminconfigurationform"),
      className: "menu-item-admin-configuration" // Unique class for Admin Configuration
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
        <PanelMenu
          model={items}
          style={{ width: "100%" }}
          className="panel-menu-container" // Class for PanelMenu container
        />
      ) : (
        <div className="collapsed-menu">
          {items.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              className={`collapsed-menu-icon ${item.className}`} // Dynamic class for each collapsed icon
              onClick={item.command}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
