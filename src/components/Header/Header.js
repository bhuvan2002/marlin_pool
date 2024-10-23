import React, { useRef } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Link } from "react-router-dom";
import { PrimeIcons } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./Header.css";

const Header = () => {
  const op = useRef(null);

  return (
    <div className="header">
      <div className="logo-container">
        <img
          src="img/MARLIN.png"
          alt="Company Logo"
          className="company-logo"
        />
      </div>
      <div className="fonty">
        <h2>MARLIN AQUATIC CENTER MANAGEMENT</h2>
      </div>
      <img
        src="img/User.png"
        alt="Profile"
        className="profile-photo"
        onClick={(e) => op.current.toggle(e)}
        style={{ cursor: "pointer" }}
      />
      <OverlayPanel ref={op} dismissable className="profile-overlay">
        <ul className="profile-options">
          <li className="profile-option">
            <Link to="/UserProfileScreen">
              <Button
                icon={PrimeIcons.USER}
                label="Profile"
                className="p-button-text profile-btn"
              />
            </Link>
          </li>
          <li className="profile-option">
            <Link to="/UserProfiledashbord">
              <Button
                icon={PrimeIcons.HOME}
                label="Dashboard"
                className="p-button-text profile-btn"
              />
            </Link>
          </li>
          <li className="profile-option" onClick={() => alert("Logout")}>
            <Button
              icon={PrimeIcons.SIGN_OUT}
              label="Logout"
              className="p-button-text profile-btn"
            />
          </li>
        </ul>
      </OverlayPanel>
    </div>
  );
};

export default Header;