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
import "./GuestModal.css";

// Components
import GuestDetails from './../GuestDetails/GuestDetails';
import ManageParty from "../ManageParty/ManageParty";
import ManageGuests from "../ManageGuests/ManageGuests";

// Config 
import {full_url, port} from './../../../Config';

function GuestModal(props) {
    const { tab, setTab, getDietaryRequirements, allDiet, setAllDiet } = props;

    const loginState = localStorage.getItem('loginState');

    return (
        <div className="guest-modal">
            {tab == 0 && (
                <GuestDetails getDietaryRequirements={getDietaryRequirements} allDiet={allDiet} setAllDiet={setAllDiet}/>
            )}
            {tab == 1 && (
                <ManageParty getDietaryRequirements={getDietaryRequirements} allDiet={allDiet} setAllDiet={setAllDiet}/>
            )}
            {tab == 3 && loginState == 2 && 
                <ManageGuests allDiet={allDiet} setAllDiet={setAllDiet}/>
            }
        </div>
    );
}

export default GuestModal;
