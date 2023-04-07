import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

// Styling 
import './ManageDiet.css';

// Assets 
import SaveIcon from './../../../Assets/save.png'
import ResetIcon from './../../../Assets/reset.png'
import DeleteIcon from './../../../Assets/delete.png'

// Config 
import { full_url } from '../../../Config';


function DietItem(props) {
    const {short_name, description, allDiet, setAllDiet} = props;

    const [name, setName] = useState(short_name);
    const [desc, setDesc] = useState(description);


    /**
     * Saves the diet changes to database 
     */
    const saveChange = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data : {
                    short_name:short_name,
                    description:desc
                },
                url : full_url + '/updatediet'
            })

            let data = res.data;
            console.log(data);
        } catch (err) {
            console.log (err)
        }
    }


    const deleteDiet = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data : {
                    short_name:short_name,
                    description:desc
                },
                url : full_url + '/deletediet'
            })
        } catch (err) {
            console.log(err)
        }
    }

    const reset = () => {
        setDesc(description);
    }

    const [showConfirm, setShowConfirm] = useState(0);

    const handleDelete = async () => {
        setShowConfirm(1);

    }

    return (
        <div className='diet-obj'>
            <h2>{name}</h2>
            <textarea 
                className='diet-input-area'
                value={desc}
                rows='3'
                onChange={(e) => setDesc(e.target.value)}
            />

            <div className="member-buttons diet-member-btns">
                <button className="member-save-btn" onClick={() => saveChange()}>
                    <img src={SaveIcon}/>
                </button>

                <button className="member-save-btn" onClick={() => reset()}>
                    <img src={ResetIcon}/>
                </button>
            </div>

            {showConfirm == 0 &&
                <button className='diet-delete-btn' onClick={() => handleDelete()}>
                    <img src={DeleteIcon}/>
                </button>
            }
            {showConfirm == 1 &&
                <div className='confirmation-wrapper'>
                    <h3>Are you sure?</h3>
                    <div className='confirmation-btns-wrapper'>
                        <button className='confirmation-btn' onClick={() => deleteDiet()}>
                            Yes 
                        </button>
                        <button className='confirmation-btn' onClick={() => setShowConfirm(0)}>
                            No
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default DietItem;