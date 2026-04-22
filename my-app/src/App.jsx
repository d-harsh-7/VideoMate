import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Components/HomePage"
import PageNotFound from "./Components/PageNotFound"

import LoginPage from './Components/LoginPage'


import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    

  )
  
}

export default App

// import { useEffect, useState } from "react";

// function App() {
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     fetch("/test/api")   // no full URL needed
//       .then(res => res.json())
//       .then(data => setMsg(data.message));
//   }, []);

//   return <h1>{msg}</h1>;
// }

// export default App;
