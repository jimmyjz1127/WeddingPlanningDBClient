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
import './ManageGuests.css'

// Config 
import {full_url} from './../../../Config';

function GuestItem(props){
    const {guest} = props;

    const [table, setTable] = useState(guest.table_no);
    const [deleteMsg, setDeleteMsg] = useState(0);

    // Sends request to backend to delete guest from database 
    const deleteGuest = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data:{
                    id:guest.id
                },
                url : full_url + '/deleteguest'
            })
            let data =res.data;
        } catch (err) {
            console.log(err)
        }
    }

    // Handles changing table number 
    const changeTable = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data:{
                    id:guest.id,
                    table:table
                },
                url : full_url + '/changetable'
            })
            setShowError(0);
        } catch (err) {
            setShowError(1);
        }
    }

    const [showError, setShowError] = useState(0);
    const [error, setError] = useState("");

    return (
        <div className="guest-item">
            <h2 className="guest-name">{guest.full_name}</h2>
            <div className="table-wrapper">
                <h3>Table Number : </h3>
                <input 
                    type='text'
                    className="table-input"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                />
            </div>

            <button className="submit-guest-btn" onClick={() => changeTable()}>
                
                {showError == 1 ? "Table at max capacity!" : "Submit"}
            </button>

            { deleteMsg == 0 && guest.id != localStorage.getItem('id') ?
                <button className="manage-guest-btn" onClick={() => setDeleteMsg(1)}>
                    Delete Guest
                </button> : ( guest.id != localStorage.getItem('id') &&
                    <div className="delete-confirm">
                        <h3>Are you sure?</h3>
                        <div className="delete-confirm-wrapper">
                            <button className="delete-confirm-btn" onClick={()=>deleteGuest()}>
                                Yes
                            </button>

                            <button className="delete-confirm-btn" onClick={()=>setDeleteMsg(0)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default GuestItem;