import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Components
import Nav from './../../Modals/Nav/Nav';
import GuestModal from './../../Modals/GuestModal/GuestModal'

// Styling 
import './Home.css'

// Assets
import WeddingPhoto from './../../../Assets/Wedding.jpeg'

function Home(props) {
    const [loginState, setLoginState] = useState(localStorage.getItem("loginState"));

    return (
        <div className='home'>
            <div className='welcome-modal'>
                <h1 className='welcome-msg'>Welcome to My Wedding</h1>
                <Nav type={loginState}/>

                {loginState == 0 &&
                    <img className='welcome-img' src={WeddingPhoto}/>
                }
                {loginState == 1 &&
                    <GuestModal/>
                }
                {loginState == 2 &&
                    <>

                    </>
                }

                
                
            </div>
        </div>
    )
}

export default Home;