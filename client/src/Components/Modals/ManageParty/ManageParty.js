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

// Components 
import PartyMember from "./PartyMember";

// Config 
import {full_url} from './../../../Config';

function ManageParty(props){
    const {getDietaryRequirements, allDiet, setAllDiet} = props;

    const [members, setMembers] = useState([]);

    const [canRender, setCanRender] = useState(0);


 
    const getParty = async (code, id) => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                data : {
                    id:id,
                    code:code
                },
                url : full_url + '/getparty'
            })
            let data = res.data;
            
            setMembers(data);
            setCanRender(1);
        } catch (err) {
            
        }
    }

    useLayoutEffect(() => {
        getParty(localStorage.getItem("invitation_code"), localStorage.getItem("id"));
    }, [])

    if (canRender == 1) {
        if (members.length > 0) {
            return (
                <div className="manage-party">
                    {
                        members.map((member, index) => {
                            return (
                                <PartyMember 
                                    key={index}
                                    member={member}
                                    getDietaryRequirements={getDietaryRequirements}
                                    allDiet={allDiet}
                                    setAllDiet={setAllDiet}
                                />
                            )
                        })
                    }
                </div>
            )

        } else{
            return (
                <div className="empty-party">
                    <h1>No Other Guests in Party</h1>
                </div>
            )
        }
    }  
}

export default ManageParty;