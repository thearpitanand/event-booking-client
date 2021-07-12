import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Style
import "./MainNavigation.css";

// Context
import AuthContext from "../../context/auth-context";

const MainNavigation = (props) => {
  const authenticationContext = useContext(AuthContext);
  return (
    <header className="main-navigation">
      <div className="main=navigation__logo">
        <h1>Eventing</h1>
      </div>
      <div className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {!!authenticationContext.token && (
            <React.Fragment>
              <li>
                <NavLink to="/bookings">Booking</NavLink>
              </li>
              <li>
                <button onClick={authenticationContext.logout}>Sign Out</button>
              </li>
            </React.Fragment>
          )}
          {!authenticationContext.token && (
            <li>
              <NavLink to="/auth">Sign In</NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
