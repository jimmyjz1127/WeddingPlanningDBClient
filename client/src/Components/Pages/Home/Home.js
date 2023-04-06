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
import Flowers from './../../../Assets/Flowers.png'

function Home(props) {
    const {getDietaryRequirements, allDiet, setAllDiet} = props;


    const [loginState, setLoginState] = useState(localStorage.getItem("loginState"));

    const [tab, setTab] = useState(0); // 0 : personal details, 1 : , 2 : about

    return (
        <div className='home'>
            <div className='welcome-modal'>
                <h1 className='welcome-msg'>Welcome to My Wedding</h1>
                <img src={Flowers} className='flower'/> 
                <Nav type={loginState} tab={tab} setTab={setTab}/>

                {loginState == 0 &&
                    <img className='welcome-img' src={WeddingPhoto}/>
                }
                {loginState != 0 &&
                    <GuestModal 
                        tab={tab} 
                        setTab={setTab} 
                        getDietaryRequirements={getDietaryRequirements}
                        allDiet={allDiet}
                        setAllDiet={setAllDiet}
                    />
                }               
                
            </div>
        </div>
    )
}

export default Home;