import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";

// Styling 
import './OrganiserLogin.css';


function OrganiserLogin(props) {
    const {loginState, setLoginState} = props;

    const [code, setCode] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [password, setPassword] = useState();

    const [showError, setShowError] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const login = async () => {
        // validate inputs 
        if (code == null|| firstname == null|| lastname == null || password == null) {
            setShowError(1);
            setErrorMessage("Missing Fields!");
        }
        else {
            try{
                const res = await Axios({
                    method:'POST',
                    withCredentials:true,
                    data:{
                        code : code,
                        firstname:firstname,
                        lastname:lastname,
                        password:password
                    },
                    url : 'http://localhost:5000/organiserlogin'
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
                localStorage.setItem("loginState", 2);

                navigate('/');
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='organiser-login-wrapper'>
            <div className='organiser-login-modal'>
                <h1 className='login-text'>Enter Organiser Credentials</h1>

                <div className='organiser-login-form'>
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
                    <input 
                        className='form-input' 
                        type='password' 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='form-submit-btn' onClick={() => login()}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default OrganiserLogin;