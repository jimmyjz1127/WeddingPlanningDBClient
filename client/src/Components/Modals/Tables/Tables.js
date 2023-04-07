import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


// Styling 
import './Tables.css';

// Config
import { full_url } from '../../../Config';

function Tables(props) {

    const [tables, setTables] = useState([]);
    const [render, setRender] = useState(0);
 
    // Retrieves dinner table data from backend 
    const getTablesData = async () => {
        try {
            const res = await Axios({
                method:'POST',
                withCredentials:true,
                url: full_url +'/getstandardtables'
            })

            let data = res.data;
            return data;
        } catch (err) {
            return [];
        }
    }

    useLayoutEffect(() => {
        const setTableData = async () => {
            await setTables(await getTablesData());
            setRender(1);
        }
        setTableData();
    }, [])

    if (render == 1){
        return (
            <table className='table'>
                <tr>
                    <th>Table Number</th>
                    <th>Number of Standard Diet Guests</th>
                    <th>Capacity</th>
                </tr>
                {
                    tables.map((tableObj, index) => {
                        return (
                            <tr>
                                <td>{tableObj.table_number}</td>
                                <td>{tableObj.num_standard_diet}</td>
                                <td>{tableObj.capacity}</td>
                            </tr>
                        )
                    })
                }
            </table>
        )
    }
}

export default Tables;