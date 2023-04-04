import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";


// Styling 
import './GuestModal.css';

function GuestModal(props) {
    const {tab, setTab} = props;

    const [response, setResponse] = useState(localStorage.getItem('response'));
    const [firstname, setFirstName] = useState(localStorage.getItem('full_name').split(' ')[0]);
    const [lastname, setLastname] = useState(localStorage.getItem('full_name').split(' ')[1]);
    const [address, setAddress] = useState(localStorage.getItem('address'));
    const [code, setCode] = useState(localStorage.getItem('invitation_code'));
    const [date, setDate] = useState(localStorage.getItem('date_sent').slice(0,9));
    const [notes, setNotes] = useState(localStorage.getItem('notes'));
    const [table, setTable] = useState(localStorage.getItem('table_no'));
    const [diet, setDiet] = useState(localStorage.getItem('diet').split(','));

    const [errorMsg, setErrorMsg] = useState("")
    const [showError, setShowError] = useState(0);

    // Checks whether a diet restriction applies 
    const checkDiet = (short_name) => {
        return diet.includes(short_name);
    }

    // Handles checkbox events to update 'diet' array variable 
    const handleCheck = (checkbox, short_name) => {
        if (checkbox.checked){
            if (!diet.includes(short_name)) {setDiet([...diet, short_name])}
        } else{
            if (diet.includes(short_name)) {setDiet(diet.filter(name => name !== short_name))}
        }
    }

    // Submits users changes 
    const submitChanges = async () => {
        if (address.split(',').length < 3){
            setErrorMsg("Invalid Address")
            setShowError(1);
        } else if (date.length < 9 || !date.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/)){
            setErrorMsg("Invalid Date")
            setShowError(1);
        } else {
            localStorage.setItem('response', response);
            localStorage.setItem('address', address);
            localStorage.setItem('diet', diet);
            localStorage.setItem('notes', notes);

            try {
                const res = await Axios({
                    method: 'POST',
                    withCredentials : true,
                    data: {
                        address : address,
                        diet : diet,
                        notes : notes,
                        response:response
                    },
                    url : 'http://localhost:5000/updateguest'
                })
            } catch (err) {

            }
        }
    }

    return (
        <div className='guest-modal'>
            {tab == 0 &&
                <div className='personal-details'>
                    <h1>Hello {firstname} {lastname}!</h1>
                    <div className='personal-details-row'>
                        <h2>Invitation Code</h2>
                        <h3 className='date'>{code}</h3>
                    </div>

                    <div className='personal-details-row'>
                        <h2>Date Sent</h2>
                        <h3 className='date'>{date}</h3>
                    </div>

                    <div className='personal-details-row'>
                        <h2>Address</h2>
                        <input 
                            type='text' 
                            className='form-txt-input' 
                            placeholder={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='personal-details-row'>
                        <h2>Table Number</h2>
                        <h3 className='date'>{table}</h3>
                    </div>

                    <div className='personal-details-row'>
                        <h2>Dietary Requirements</h2><br/><br/><br/>
                        <div className='check-box-wrapper'>
                            <input type="checkbox" className='check' checked={checkDiet('Vegan')} onChange={(e) => handleCheck(e.target, 'Vegan')} />
                            <label >Vegan</label>

                            <input type="checkbox" className='check' checked={checkDiet('Vegetarian')} onChange={(e) => handleCheck(e.target, 'Vegetarian')}/>
                            <label >Vegetarian</label>

                            <input type="checkbox" className='check' checked={checkDiet('Gluten-free')} onChange={(e) => handleCheck(e.target, 'Gluten-free')}/>
                            <label>Gluten-free</label>

                            <input type="checkbox" className='check' checked={checkDiet('Halal')} onChange={(e) => handleCheck(e.target, 'Halal')}/>
                            <label>Halal</label>
                        </div>
                    </div>

                    <div className='personal-details-row'>
                        <h2>Notes</h2>
                        <input 
                            type='textarea' 
                            className='form-txt-input' 
                            placeholder={notes.length == 0 ? "Add notes..." : notes}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='personal-details-row'>
                        <h2>RSVP</h2><br/>
                        <div className='check-box-wrapper'>
                            <input type="checkbox" className='check going-check'/>
                            <label for='going-check'>Going</label>

                            <input type="checkbox" className='check notgoing-check'/>
                            <label for='going-check'>Not Going</label>
                        </div>
                    </div>

                    <div className='form-btns'>
                        <button className='form-btn submit-btn'>Submit</button>
                        <button className='form-btn reset-btn'>Reset</button>
                    </div>

                </div>
            }
            {tab == 1 &&
                <div className=''>
                    <h1>HELLO PLANET</h1>
                </div>
            }
            {tab == 2 &&
                <div className='about'>
                    <h1>HELLO THERe</h1>
                </div>
            }
        </div>
    )
}

export default GuestModal;