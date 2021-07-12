import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// Pages
import AuthPage from "./pages/Auth.js";
import BookingsPage from "./pages/Booking";
import EventsPage from "./pages/Events";

// Components
import MainNavigation from "./components/Navigation/MainNavigation";

// Context
import AuthContext from "./context/auth-context";

const App = () => {
  const userInfo = () => {
    if (!!localStorage.getItem("userInfo")) {
      let userInfo = localStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      return userInfo;
    } else {
      return {
        token: null,
        userId: null,
      };
    }
  };

  const [token, setToken] = useState(userInfo().token);
  const [userId, setUserId] = useState(userInfo().userId);

  const login = (userId, tokenExpiration, token) => {
    setToken(token);
    setUserId(userId);
    const userDetail = {
      userId,
      token,
      tokenExpiration,
    };
    localStorage.setItem("userInfo", JSON.stringify(userDetail));
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/auth" to="/events" exact />}
              {!token && <Route path="/auth" component={AuthPage} />}
              <Route path="/events" component={EventsPage} />
              {!!token && <Route path="/bookings" component={BookingsPage} />}
              {!token && <Redirect to="/auth" exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
