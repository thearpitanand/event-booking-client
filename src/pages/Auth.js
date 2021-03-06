import React, { useState, useContext } from "react";

// CSS
import "./Auth.css";

// Context
import AuthContext from "../context/auth-context";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastInfo } from "./helper/eventsHelper";
import { authentication } from "./helper/authHelper";
toast.configure();

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authenticationContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (email.trim().length === 0 && password.trim().length === 0) {
      return toast("Invalid Password or Invalid Email", toastInfo);
    }
    authentication({ email, password, isLogin })
      .then((resData) => {
        if (!!resData.errors) {
          return resData.errors.map((error) => {
            return toast(`${error.message}`, toastInfo);
          });
        }
        if (!!resData.data?.login?.token) {
          const { userId, tokenExpiration, token } = resData.data.login;
          return authenticationContext.login(userId, tokenExpiration, token);
        }
        if (!!resData.data?.createUser?._id) {
          return toast(
            `You have successfully created an account "${resData.data.createUser.email}"`,
            toastInfo
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="authenticate-form__login-div">
      <div className="authenticate-form__logo"></div>
      <div className="authenticate-form__title">Event Management</div>
      <div className="authenticate-form__sub-title">Book your event now!</div>
      <form className="authenticate-form__fields" onSubmit={submitHandler}>
        <div className="authenticate-form__email">
          <i className="fas fa-user authenticate-form__svg"></i>
          <input
            type="email"
            className="authenticate-form__email-input"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="authenticate-form__password">
          <i className="fas fa-key authenticate-form__svg"></i>
          <input
            type="password"
            className="authenticate-form__pass-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="authenticate-form__signin-button">
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>
      <div className="authenticate-form__link">
        <button
          className="authenticate-form__switch-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          Switch to {!isLogin ? "Log In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
