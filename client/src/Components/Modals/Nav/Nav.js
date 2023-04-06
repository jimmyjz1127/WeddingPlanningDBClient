import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


// Styling
import './Nav.css';

function Nav(props) {

    const {type, tab, setTab} = props;

    // Logout button handler
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    if (type == 0){ // Logged out nav bar
        return (
            <div className='nav'>
                <div className='link'>
                    <Link to={'/GuestLogin'}>
                        <h2>GUEST LOGIN</h2>
                    </Link>
                </div>

                <div className='link'>
                    <Link to={'/OrganiserLogin'}>
                        <h2>ORGANISER LOGIN</h2>
                    </Link>
                </div>
            </div>
        )
    } else if (type == 1) { // guest nav bar 
        return (
            <div className='nav'>
                <div className='link'>
                    <button className='nav-btn' onClick={() => setTab(0)}>
                        PERSONAL DETAILS
                    </button>
                </div>

                <div className='link'>
                    <button className='nav-btn' onClick={() => setTab(1)}>
                        MANAGE PARTY
                    </button>
                </div>
                <div className='link'>
                    <button className='nav-btn' onClick={() => logout()}>LOGOUT</button>
                </div>
            </div>
        )
    } else if (type == 2) { // organiser nav bar
        return (
            <div className='nav'>
                <div className='link'>
                    <button className='nav-btn' onClick={() => setTab(0)}>
                        PERSONAL DETAILS
                    </button>
                </div>

                <div className='link'>
                    <button className='nav-btn' onClick={() => setTab(1)}>
                        MANAGE PARTY
                    </button>
                </div>

                <div className='link'>
                    <button className='nav-btn' onClick={() => setTab(3)}>
                        GUEST LIST
                    </button>
                </div>

                <div className='link'>
                    <button className='nav-btn' onClick={() => logout()}>LOGOUT</button>
                </div>
            </div>
        )
    }

}

export default Nav;