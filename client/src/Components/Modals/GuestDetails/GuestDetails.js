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
import './GuestDetails.css';

// Assets
import EditIcon from './../../../Assets/edit.png'

// Config 
import {full_url, port} from './../../../Config';

function GuestDetails(props){
    const {allDiet, setAllDiet} = props;

    const [response, setResponse] = useState(localStorage.getItem("response"));
    const [firstname, setFirstName] = useState(localStorage.getItem("full_name").split(" ")[0]);
    const [lastname, setLastname] = useState(
    localStorage.getItem("full_name").split(" ")[1]);
    const [address, setAddress] = useState(localStorage.getItem("address"));
    const [code, setCode] = useState(localStorage.getItem("invitation_code"));
    const [date, setDate] = useState(
    localStorage.getItem("date_sent").slice(0, 10));
    const [notes, setNotes] = useState(localStorage.getItem("notes"));
    const [table, setTable] = useState(localStorage.getItem("table_no"));
    const [diet, setDiet] = useState(
    localStorage.getItem("diet") == "" ? [] : localStorage.getItem("diet").split(","));

    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(0);

    // Checks whether a diet restriction applies
    const checkDiet = (short_name) => {
        return diet.includes(short_name);
    };

    // Handles checkbox events to update 'diet' array variable
    const handleCheck = (checkbox, short_name) => {
        console.log(response)
        if (checkbox.checked) {
            if (!diet.includes(short_name)) {
                setDiet([...diet, short_name]);
            }
        } else {
            if (diet.includes(short_name)) {
                setDiet(diet.filter((name) => name !== short_name));
            }
        }
    };

    // Handler for reset button - reloads the page
    const reset = () => {
        window.location.reload();
    };

    // Submits users changes
    const submitChanges = async () => {
        console.log(diet);

        if (address.split(",").length < 3) { // Check Address Format
            setErrorMsg("Invalid Address");
            setShowError(1);
        } else if (!date.match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/)) { // Check date format
            setErrorMsg("Invalid Date");
            setShowError(1);
        } else {
            localStorage.setItem("response", response);
            localStorage.setItem("address", address);
            localStorage.setItem("diet", diet);
            localStorage.setItem("notes", notes);

            if (response != 1 && response != 0){
                setResponse(null);
            }

            try {
                const res = await Axios({
                    method: "POST",
                    withCredentials: true,
                    data: {
                        id:localStorage.getItem('id'),
                        address: address,
                        diet: diet,
                        notes: notes,
                        response: response,
                    },
                    url: full_url + "/updateguestdetails",
                });
                let data = res.data;
            } catch (err) {
                setErrorMsg("Invalid Input - Please Double Check Fields");
                setShowError(1);
            }
        }
    };

    return (
        <div className="personal-details">
            <h1> Hello {firstname} {lastname}!</h1>
            {showError == 1 && <h2 className="error-msg">{errorMsg}</h2>}
            <div className="personal-details-row">
                <h2>Invitation Code</h2>
                <h3 className="date">{code}</h3>
            </div>

            <div className="personal-details-row">
                <h2>Date Sent</h2>
                <h3 className="date">{date}</h3>
            </div>

            <div className="personal-details-row">
                <div className="edit-header-container">
                    <h2>Address </h2>
                    <img className='edit-icon' src={EditIcon}/>
                </div>
                <input
                    type="text"
                    className="form-txt-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                /><br/>
            </div>

            <div className="personal-details-row">
                <h2>Table Number</h2>
                <h3 className="date">{table}</h3><br/>
            </div>


            <div className="personal-details-row">
                <h2 className="diet-header">Dietary Requirements</h2>
                <div className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="check"
                        checked={checkDiet("Vegan")}
                        onChange={(e) => handleCheck(e.target, "Vegan")}
                    />
                    <label>Vegan</label>

                    <input
                        type="checkbox"
                        className="check"
                        checked={checkDiet("Vegetarian")}
                        onChange={(e) => handleCheck(e.target, "Vegetarian")}
                    />
                    <label>Vegetarian</label>

                    <input
                        type="checkbox"
                        className="check"
                        checked={checkDiet("Gluten-free")}
                        onChange={(e) => handleCheck(e.target, "Gluten-free")}
                    />
                    <label>Gluten-free</label>

                    <input
                        type="checkbox"
                        className="check"
                        checked={checkDiet("Halal")}
                        onChange={(e) => handleCheck(e.target, "Halal")}
                    />
                    <label>Halal</label>
                </div>
            </div>
            <div className="personal-details-row">
                 <div className="edit-header-container">
                    <h2>Notes </h2>
                    <img className='edit-icon' src={EditIcon}/>
                </div>
                <input
                    type="textarea"
                    className="form-txt-input"
                    value={notes.length == 0 ? "Add notes..." : notes}
                    onChange={(e) => setNotes(e.target.value)}
                /><br/>
            </div>


            <div className="personal-details-row">
                <h2 className="rsvp-header">RSVP</h2>
                <div className="checkbox-wrapper">
                    <input 
                        type="checkbox" 
                        className="check going-check" 
                        checked={response == 1}
                        onChange={() => {response==1 ? setResponse(3) : setResponse(1)}}
                    />
                    <label for="going-check" >Going</label>

                    <input 
                        type="checkbox" 
                        className="check notgoing-check" 
                        checked={response == 0}
                        onChange={() => {response==0 ? setResponse(3) : setResponse(0)}}
                    />
                    <label for="going-check">Not Going</label>
                </div>
            </div>


            <div className="form-btns">
                <button className="form-btn submit-btn" onClick={() => submitChanges()}>
                    Submit
                </button>

                <button className="form-btn reset-btn" onClick={() => reset()}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default GuestDetails;