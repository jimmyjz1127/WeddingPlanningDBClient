import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import Axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// Styling
import "./OrganiserLogin.css";

// Config 
import {full_url, port} from './../../../Config'

function OrganiserLogin(props) {
    const { loginState, setLoginState } = props;

    const [id, setID] = useState();
    const [password, setPassword] = useState();

    const [showError, setShowError] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

     /**
     * Retrieves the dietary requirements of the user logging in as an array
     */
     const getDietaryRequirements = async () => {
      try {
          const res = await Axios({
              method: "POST",
              withCredentials: true,
              data: {
                  id: localStorage.getItem("id"),
              },
              url: full_url + "/guestdiet",
          });
          let data = res.data;
          const diet_requirements = data.map((obj) => obj.short_name);
          localStorage.setItem("diet", diet_requirements);
      } catch (err) {
          console.log("FALIURE")
          localStorage.setItem("diet", "");
      }
  };

    // Sends user credentials to backend for validation - sets user details into local storage for use 
    const login = async () => {
        // validate inputs
        if (id == null || password == null) {
          setShowError(1);
          setErrorMessage("Missing Fields!");
        } else {
            try {
              const res = await Axios({
                  method: "POST",
                  withCredentials: true,
                  data: {
                      id : id,
                      password: password,
                  },
                  url: full_url + "/organiserlogin",
              });

              let data = res.data[0];

              setShowError(0);
              localStorage.setItem("full_name", data.full_name);
              localStorage.setItem("id", data.id);
              localStorage.setItem("address", data.address);
              localStorage.setItem("response", data.response);
              localStorage.setItem("date_sent", data.date_sent);
              localStorage.setItem("invitation_code", data.invitation_code);
              localStorage.setItem("notes", data.notes);
              localStorage.setItem("table_no", data.table_no);
              localStorage.setItem("loginState", 2);
              await getDietaryRequirements();

              navigate("/");
          } catch (err) {
              console.log(err);
          }
        }
    };

    // Handles user clicking enter button keyboard to login
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            login();
        }
    };

    return (
        <div className="organiser-login-wrapper">
            <div className="organiser-login-modal">
                <h1 className="login-text">Enter Organiser Credentials</h1>

                <div className="organiser-login-form">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="ID"
                        onChange={(e) => setID(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="form-submit-btn" onClick={() => login()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrganiserLogin;
