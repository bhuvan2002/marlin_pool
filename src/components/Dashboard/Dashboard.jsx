import React from 'react';
import { Card } from 'primereact/card';
import './Dashboard.css';  // Custom CSS for styling

const Dashboard = () => {
  const cardData = [
    { title: "New Registrations Today      ", count: 100 },
    { title: "Current Month Registrations  ", count: 100},
    { title: "Total Active Members         ", count: 100},
    { title: "Members with Expired Packages", count: 100},
    { title: "Total Guests                 ", count: 100},
    { title: "Payments Collected Today     ", count: 100},
    { title: "Total Payments Pending       ", count: 100},
    { title: "Total Payments Received      ", count: 100},
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="grid">
        {cardData.map((card, index) => (
          <Card key={index} className="dashboard-card">
            <div className="card-content">
              <span className="card-title">{card.title}</span>
              <div className="card-count">{card.count}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
