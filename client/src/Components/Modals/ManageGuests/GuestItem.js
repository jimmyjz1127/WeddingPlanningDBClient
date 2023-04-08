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

// Assets 
import SaveIcon from './../../../Assets/save.png'
import DeleteIcon from './../../../Assets/delete.png'
import EditIcon from './../../../Assets/edit.png'

function GuestItem(props){
    const {guest, filter} = props;

    const [table, setTable] = useState(guest.table_no);
    const [diet, setDiet] = useState(filter == 2 ? guest.dietary_requirements.split(',') : []);
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
                    table:table,
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
        <>
            <h2 className="guest-name">{guest.full_name}</h2>
            <div className="guest-item">
                
                <div className="table-wrapper">
                    <div className="edit-header-container">
                        <h3>Table Number </h3>
                        <img className='edit-icon' src={EditIcon}/>
                    </div>
                    <input 
                        type='text'
                        className="table-input"
                        value={table}
                        onChange={(e) => setTable(e.target.value)}
                    />
                </div>

                { filter != 2 &&
                    <div className="guest-response-wrapper">
                        <h3>RSVP</h3>
                        { guest.response  == 1 && <p className="response-text">Going</p>}
                        { guest.response == 0 && <p className="response-text">Not Going</p>}
                        { guest.response != 0 && guest.response != 1 && <p className="response-text">Awaiting Response</p>}
                    </div>
                }
                

                { filter == 2 &&
                    <div className="guest-item-diet">
                        <h3>Dietary Requirements</h3>
                        {
                            diet.map((short_name, index) => {
                                return (
                                    <p className="guest-diet-label">{short_name}</p>
                                )
                            })
                        }
                    </div>
                }

                <div className="guest-details-btn-wrapper">
                    <button className="manage-guest-btn " onClick={() => changeTable()}>
                        {showError == 1 ? "Table at max capacity!" : <img src={SaveIcon}/>}
                    </button>

                    { deleteMsg == 0 && guest.id != localStorage.getItem('id') ?
                        <button className="manage-guest-btn " onClick={() => setDeleteMsg(1)}>
                            <img src={DeleteIcon}/>
                        </button> : ( guest.id != localStorage.getItem('id') &&
                            <div className="delete-confirm">
                                <h3>Are you sure?</h3>
                                <div className="delete-confirm-wrapper">
                                    <button className="delete-confirm-btn" onClick={()=>{
                                                                                            deleteGuest();
                                                                                            setDeleteMsg(0);
                                                                                        }
                                    }>
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
            </div>
        </>
    )
}

export default GuestItem;