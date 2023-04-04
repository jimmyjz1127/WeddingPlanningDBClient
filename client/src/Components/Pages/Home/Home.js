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

    const [tab, setTab] = useState(0); // 0 : personal details, 1 : , 2 : about

    return (
        <div className='home'>
            <div className='welcome-modal'>
                <h1 className='welcome-msg'>Welcome to My Wedding</h1>
                <Nav type={loginState} tab={tab} setTab={setTab}/>

                {loginState == 0 &&
                    <img className='welcome-img' src={WeddingPhoto}/>
                }
                {loginState == 1 &&
                    <GuestModal tab={tab} setTab={setTab}/>
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