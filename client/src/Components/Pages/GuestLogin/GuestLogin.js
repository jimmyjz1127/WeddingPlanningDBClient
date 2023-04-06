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
import "./GuestLogin.css";

// Config 
import {full_url, port} from './../../../Config';

function GuestLogin(props) {
    const { loginState, setLoginState, getDietaryRequirements } = props;

    const [code, setCode] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();

    const [showError, setShowError] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    /**
     * Sends user data to backend for validation - request sends all user data in response
     */
    const submitGuest = async () => {
        // Sanitize Inputs
        if (code == null || firstname == null || lastname == null) {
            setShowError(1);
            setErrorMessage("Missing Fields!");
        } else {
            try {
                const res = await Axios({
                    method: "POST",
                    withCredentials: true,
                    data: {
                        code: code.trim(),
                        firstname: firstname.trim(),
                        lastname: lastname.trim(),
                    },
                    url: full_url + "/guestlogin",
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
                localStorage.setItem("loginState", 1);

                let diet_requirements = await getDietaryRequirements(data.id);
                localStorage.setItem("diet",diet_requirements);
                
                navigate("/");
            } catch (err) {
                console.log(err)
                setShowError(1);
                setErrorMessage("Invalid Credentials!");
            }
        }
    };

    // Handles user clicking enter button keyboard to login
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            submitGuest();
        }
    };


    return (
        <div className="guest-login-wrapper">
            <div className="guest-login-modal">
                <h1 className="login-text">Enter Guest Credentials</h1>

                {showError == 1 && <h2 className="form-error-msg">{errorMessage}</h2>}

                <div className="guest-login-form">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstname(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setLastname(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Invitation Code"
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="form-submit-btn" onClick={() => submitGuest()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GuestLogin;
