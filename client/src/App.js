import React from 'react';
import {useEffect, useLayoutEffect, useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route} from "react-router-dom";


// Components
import Home from './Components/Pages/Home/Home';
import GuestLogin from './Components/Pages/GuestLogin/GuestLogin'
import OrganiserLogin from './Components/Pages/OrganiserLogin/OrganiserLogin'

// Styling 
import './App.css';

function App() {

  const [render, setRender] = useState(0);

  useLayoutEffect(() => {
    if (localStorage.getItem("loginState") == null) {
      localStorage.setItem("loginState", 0)
    }
    setRender(1);
  }, [])

  if (render == 1)
  {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route 
              path='/' 
              element={
                        <Home 
                        />
                      }
            />
            <Route 
              path='/GuestLogin' 
              element={
                        <GuestLogin 
                        />
                      }
            />
            <Route 
              path='/OrganiserLogin' 
              element={
                        <OrganiserLogin 
                        />
                      }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
