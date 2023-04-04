import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";

// Styling 
import './GuestLogin.css';



function GuestLogin(props) {

    const {loginState, setLoginState} = props;

    const [code, setCode] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();

    const [showError, setShowError] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const submitGuest = async () => {
        // Sanitize Inputs
        if (code == null|| firstname == null|| lastname == null){
            setShowError(1);
            setErrorMessage("Missing Fields!");
        } else {
            try {
                const res = await Axios({
                    method: "POST",
                    withCredentials: true,
                    data:{
                        code:code,
                        firstname:firstname,
                        lastname:lastname
                    },
                    url : 'http://localhost:5000/guestlogin'
                })
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
                navigate('/');
            } catch (err) {
                setShowError(1);    
                setErrorMessage("Invalid Credentials!");
            }
        }
    }

    return (
        <div className='guest-login-wrapper'>
            <div className='guest-login-modal'>
                <h1 className='login-text'>Enter Guest Credentials</h1>

                { showError == 1 &&
                    <h2 className='form-error-msg'>{errorMessage}</h2>
                }

                <div className='guest-login-form'>
                    <input 
                        className='form-input' 
                        type='text' 
                        placeholder='First Name'
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input 
                        className='form-input' 
                        type='text' 
                        placeholder='Last Name'
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <input 
                        className='form-input' 
                        type='text' 
                        placeholder='Invitation Code'
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className='form-submit-btn' onClick={()=> submitGuest()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default GuestLogin;