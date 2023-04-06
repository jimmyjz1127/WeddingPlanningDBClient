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
import './DietCheckBox.css';

function DietCheckBox(props) {
    const {diet, handleDietCheck, short_name} = props;

    return (
        <div className="checkbox-container">
            <input 
                type='checkbox' 
                checked={diet.includes(short_name)} 
                className='check'
                onChange={(e) => handleDietCheck(e.target, short_name)}
            /> 
            <label>{short_name}</label>
        </div>
    )
}

export default DietCheckBox;