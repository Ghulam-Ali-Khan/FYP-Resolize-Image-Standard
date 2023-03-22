import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Header from "./components/Header";
import Remover from "./pages/Remover";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Footer from "./components/Footer";
// import Particles from 'react-particles-js';


const App = () =>{

  



  return(
<>

<Navbar/>
<Routes>
<Route path="/"  element={<Home/>} />
<Route path="/editor"  element={<Editor/>} />
<Route path="/object-remover"  element={<Remover/>} />
</Routes>
<Footer/>
</>
  );
}

export default App;