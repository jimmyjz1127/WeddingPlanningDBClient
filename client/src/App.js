import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./Components/Pages/Home/Home";
import GuestLogin from "./Components/Pages/GuestLogin/GuestLogin";
import OrganiserLogin from "./Components/Pages/OrganiserLogin/OrganiserLogin";

// Styling
import "./App.css";

// Config 
import {port, full_url, host_url} from './Config';

function App() {
  const [render, setRender] = useState(0);
  const [allDiet, setAllDiet] = useState([]);

  useLayoutEffect(() => {
    if (localStorage.getItem("loginState") == null) {
      localStorage.setItem("loginState", 0);
    }

    const setAllDiets = async () => {
      setAllDiet(await  getAllDietaryRequirements());
      setRender(1);
    }

    setAllDiets();
  }, []);

  /**
     * Retrieves the dietary requirements of the user logging in as an array
    */
  const getDietaryRequirements = async (id) => {
    try {
        const res = await Axios({
            method: "POST",
            withCredentials: true,
            data: {
                id: id,
            },
            url: full_url + "/guestdiet",
        });
        let data = res.data;
        const diet_requirements = data.map((obj) => obj.short_name);
        return diet_requirements;
    } catch (err) {
        console.log("FALIURE")
        return "";
    }
  };

  // Retrieves all dietary requirements from database
  const getAllDietaryRequirements = async () => {
    try {
      const res = await Axios({
        method:'POST',
        withCredentials:true,
        url:full_url+'/getalldiet'
      })
      let data = res.data;
      return data;
    } catch(err) {
      console.log(err)
      return [];
    }
  }

  

  if (render == 1) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home getDietaryRequirements={getDietaryRequirements} allDiet={allDiet} setAllDiet={setAllDiet}/>} />
            <Route path="/GuestLogin" element={<GuestLogin getDietaryRequirements={getDietaryRequirements}/>} />
            <Route path="/OrganiserLogin" element={<OrganiserLogin getDietaryRequirements={getDietaryRequirements}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
