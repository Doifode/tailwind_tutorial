import React, { useEffect, useState } from 'react'
import Navbar from './Componunts/Navbar/Navbar'
import Home from './Componunts/NavOption/Home';
import Feedback from './Componunts/NavOption/Feedback';
import About from './Componunts/NavOption/About';
import QrGenerator from './Componunts/NavOption/QrGenerator';
import { Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TreeDetails from './Componunts/Navbar/TreeDetails';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');

  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => { localStorage.setItem('current_theme', theme) }, [theme])


  return (
    <div className={`container__ ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className='container2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Feedback' element={<Feedback />} />
          <Route path='/About' element={<About />} />
          <Route path='/QrGenerator' element={<QrGenerator />} />
          <Route path='/tree/:id' element={<TreeDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App