import React, { useState, useContext } from "react";

// CSS
import "./Auth.css";

// Context
import AuthContext from "../context/auth-context";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// Env
const { REACT_APP_API } = process.env;

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authenticationContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    let requestBody;
    if (email.trim().length === 0 && password.trim().length === 0) {
      return toast("Invalid Password or Invalid Email", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // Sending req to backend
    if (!isLogin) {
      requestBody = {
        query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
        `,
      };
    } else {
      requestBody = {
        query: `
        query{
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
        `,
      };
    }

    fetch( REACT_APP_API, {
      method: "Post",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.data.login.token) {
          const { userId, tokenExpiration, token } = resData.data.login;
          authenticationContext.login(userId, tokenExpiration, token);
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
            name=""
            id=""
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
