import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

// Styling
import './ManageDiet.css';

//Componenets 
import DietItem from './DietItem'

// Config
import {full_url} from './../../../Config';

function ManageDiet(props) {

    const {allDiet, setAllDiet} = props;

    const [newDietName, setNewDietName] = useState(null);
    const [newDesc, setNewDesc] = useState(null);

    const [error, setError] = useState("");
    const [showError, setShowError] = useState(0);

    // Sends new diet to backend to be inserted into databse
    const submitNewDiet = async () => {
        if (newDietName != null && newDietName.length != 0) {
            try {
                const res = await Axios({
                    method:'POST',
                    withCredentials:true,
                    data : {
                        short_name : newDietName,
                        description : newDesc
                    },
                    url : full_url + '/addnewdiet'
                })
                setShowError(0);
                setAllDiet([...allDiet, {short_name:newDietName, description:newDesc}])
                setNewDietName(null);
                setNewDesc(null);
            } catch (err) {
                console.log(err)
                setError("Invalid Diet");
                setShowError(1);
            }
        } else {
            setError("Invalid Diet - Make sure diet name is filled!");
            setShowError(1);
        }
    }

    return (
        <div className='manage-diet'>
            {
                allDiet.map((dietObj, index) => {
                    return (
                        <DietItem 
                            short_name={dietObj.short_name} 
                            description={dietObj.description} 
                            allDiet={allDiet}
                            key={index}
                            setAllDiet={setAllDiet}
                        />
                    )
                })
            }
            <div className='add-new-diet-wrapper'>  
                <input 
                    type='text' 
                    className='add-new-diet-input'
                    onChange={(e) => setNewDietName(e.target.value)}
                    placeholder='New Diet Name'
                />
                <textarea 
                    className='add-new-diet-area'
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder='Add Diet Description'
                    rows='3'
                    cols='30'
                />
                <button className='diet-submit-btn' onClick={() => submitNewDiet()}>Add New Diet</button>
                
            </div>
            {showError == 1 && <h2 className='error-msg'>{error}</h2>}
        </div>


    )    
}

export default ManageDiet;