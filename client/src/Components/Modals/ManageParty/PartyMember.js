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
import './ManageParty.css';

// Assets 
import SaveIcon from './../../../Assets/save.png'
import ResetIcon from './../../../Assets/reset.png'

// Config 
import {full_url} from './../../../Config';

// Components
import DietCheckBox from "../DietSelection/DietCheckBox";

function PartyMember(props) {

    const {member, getDietaryRequirements, allDiet, setAllDiet} = props;

    const diet_names = allDiet.map((obj) => obj.short_name);

    const [response, setResponse] = useState(member.response);
    const [diet, setDiet] = useState([]);
    const [notes, setNotes] = useState(member.notes);

    // Handler for reset button - resets all inputs to original state
    const reset = async () => {
        setNotes(member.notes)
        setResponse(member.response)
        setDiet(await getDietaryRequirements(member.id)) 
    }

    // Handles checkbox events to update the user reponse 
    const handleResponseCheck = (value) => {
        setResponse(value);
    }

    // Handles checkbox events to update 'diet' array variable
    const handleDietCheck = (checkbox, short_name) => {
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

    // Submits changes to member details to database
    const submitMemberChanges = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data: {
                    id : member.id,
                    diet:diet,
                    notes:notes,
                    response:response
                },
                url: full_url + '/updatememberdetails'
            })
            let data = res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const [showAddDiet, setShowAddDiet] = useState(false);
    const [newDietName, setNewDietName] = useState(null);
    const [addDietSymbol, setAddDietSymbol] = useState("+");

    // To retrieve member dietary requirements from db on component render
    useEffect(() => {
        const retrieveDiet = async () => {
            setDiet(await getDietaryRequirements(member.id)) 
        }
        retrieveDiet();
    }, [])

    return (
        <div className="party-member">
            <h2>{member.full_name}</h2>
            <div className="member-details">
                <div className="member-response">
                    <h3 className="member-section-header">Response</h3>
                    <div className="member-response-grid">
                        <div className="checkbox-container">
                            <input 
                                type='checkbox' 
                                checked={response == 1} 
                                className='check' 
                                onChange={() => {response==1 ? setResponse(3) : setResponse(1)}}
                            />
                            <label>Going</label>
                        </div> 
                        <div className="checkbox-container">
                            <input 
                                type='checkbox' 
                                checked={response == 0} 
                                className='check' 
                                onChange={() => {response==0 ? setResponse(3) : setResponse(0)}}
                            />
                            <label>Not Going</label>
                        </div>
                    </div>
                </div>

                <div className="member-diet">
                    <h3 className="member-section-header">
                        Dietary Requirements
                        <button 
                            className="add-diet-btn" 
                            onClick={() => {
                                            setShowAddDiet(!showAddDiet) 
                                            setAddDietSymbol(addDietSymbol == "+" ? "-" : "+")
                                            }}
                        >
                                {addDietSymbol}
                        </button>
                    </h3>
                    
                    <div className="member-diet-grid">
                        {
                            diet_names.map((short_name, index) => {
                                return (
                                    <DietCheckBox handleDietCheck={handleDietCheck} short_name={short_name} diet={diet}/>
                                )
                            })
                        }
                        <div></div>
                        {showAddDiet  &&
                            <div className="checkbox-container">
                                <input 
                                    type='checkbox' 
                                    checked={diet.includes(newDietName)} 
                                    className='check new-diet-check'
                                    onChange={(e) => handleDietCheck(e.target, newDietName)}
                                /> 
                                <input
                                    className="new-diet-name-input"
                                    type='text'
                                    onChange={(e) => setNewDietName(e.target.value)}
                                    placeholder='New diet name'
                                />
                            </div>

                        }
                    </div><br/>
                </div>

                <div className="member-notes">
                    <h3 className="member-section-header">Notes</h3>
                    <textarea 
                        className="member-notes-input" 
                        type='textarea'
                        value={notes.length == 0 ? 'Add notes...' : notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <div className="member-buttons">
                    <button className="member-save-btn" onClick={()=>submitMemberChanges()}>
                        <img src={SaveIcon}/>
                    </button>

                    <button className="member-save-btn" onClick={()=>reset()}>
                        <img src={ResetIcon}/>
                    </button>
                </div>
            </div>
        </div>
    )
    
}

export default PartyMember;