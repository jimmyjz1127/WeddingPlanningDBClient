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
import './ManageGuests.css';

// Components
import GuestItem from "./GuestItem";

// Config 
import {full_url} from './../../../Config';

function ManageGuests(props) {

    const [guests, setGuests] = useState([]);
    const [canRender, setCanRender] = useState(0);
    const [addGuest, setAddGuest] = useState(0);

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [code, setCode] = useState(null);
    const [table, setTable] = useState(null);
    const [address, setAddress] = useState(null);
    const [notes, setNotes] = useState("");
    const date = new Date();

    const [filter, setFilter] = useState(0); // 0 : default, 1 : No response, 2 : Dietary Requirements

    // Retrieves all data for all guests of the wedding
    const getAllGuests = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data:{id:localStorage.getItem('id')},
                url: full_url + '/getallguests'
            })

            let data = res.data;
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    // Retrieves all guests with special diet
    const getGuestsWithDiet = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                url:full_url+'/getguestswithdiet'
            })

            let data = res.data;
            return data;
        } catch (err) {

        }
    }


    const [showError, setShowError] = useState(0);
    const [error, setError] = useState("");

    /**
     * Sends new guest data to backend to be inserted into database
     */
    const submitNewGuest = async () => {
        if (firstname == null || lastname == null || address == null || code == null || table == null) {
            setShowError(1);
            setError("Invalid Credentials!")
        } else {
            try {
                const res = await Axios({
                    method : 'POST',
                    withCredentials:true,
                    data:{
                        full_name : firstname.trim() + " " + lastname.trim(),
                        code : code.trim(),
                        date:date,
                        address : address,
                        table:table,
                        response:3,
                        notes:notes
                    },
                    url: full_url + '/addnewguest'
                })
                setShowError(0);
                setAddGuest(0);
            } catch (err) {
                setShowError(1);
                setError("Table at max capacity!");
            }
        }
    }

    // Handler for changing filter
    const handleFilterChange = async (value) => {
        setFilter(value);

        if (value == 2) {
            setCanRender(0);
            await setGuests(await getGuestsWithDiet());
            setCanRender(1); 
        } else {
            setCanRender(0);
            await setGuests(await getAllGuests());
            setCanRender(1); 
        }    
    }
    
    useLayoutEffect(() => {
        const initiateGuests = async () => {
            await setGuests(await getAllGuests());  
            setCanRender(1);     
        }
        initiateGuests();
        
    }, [])

    if (canRender == 1) {
        return (
            <div className="manage-guests">
                <div className="add-guest">
                    {addGuest == 0 && 
                        <div className="add-guest-btn-wrapper">
                            <button className="add-guest-btn" onClick={()=>setAddGuest(1)}>Add Guest</button>
                        </div>
                    }
                    {addGuest == 1 && 
                        <div className="add-guest-menu">
                            <h2 className="add-guest-menu-title">Enter New Guest Details</h2>
                            {showError == 1 && <h3 className="error-msg">{error}</h3>}
                            <input 
                                className="add-guest-input" 
                                type="text" 
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder='First Name'
                            />
                            <input 
                                className="add-guest-input" 
                                type="text" 
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder='Last Name'
                            />
                            <input 
                                className="add-guest-input" 
                                type="text" 
                                onChange={(e) => setCode(e.target.value)}
                                placeholder='Invitation Code'
                            />
                            <input 
                                className="add-guest-input" 
                                type="text" 
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Address'
                            />
                            <input 
                                className="add-guest-input" 
                                type="text" 
                                onChange={(e) => setTable(e.target.value)}
                                placeholder='Table Number'
                            />
                            <textarea 
                                className="member-notes-input" 
                                rows='4'
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder='Notes'
                            />

                            <button className="close-add-guest" onClick={() => submitNewGuest()}>Submit</button>
                            <button className="close-add-guest" onClick={() => setAddGuest(0)}>Close</button>
                        </div>
                    }
                </div>
                <div className="filter-wrapper">
                    <select className="filter-select" onChange={(e) => handleFilterChange(e.target.value)}>
                        <option value={0}>All Guests</option>
                        <option value={1}>Awaiting Response</option>
                        <option value={2}>Special Diet</option>
                    </select>
                </div>
                {
                    guests.map((guest, index) => {
                        if (filter==0 || filter ==2){
                            return (
                                <GuestItem guest={guest} key={index} filter={filter}/>
                            )
                        } else if (filter == 1 && guest.response != 1 && guest.response != 0) {
                            return (
                                <GuestItem guest={guest} key={index} filter={filter}/>
                            )
                        } 
                    })
                }
            </div>
        )
    }
}

export default ManageGuests;