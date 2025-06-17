import React from 'react'
import About from './Pages/About'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Vans from './Pages/Vans.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
          <Link className="site-logo" to="/">#VanLife</Link>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/vans'>Vans</Link>
          </nav>
      </header>
      <Routes>
          <Route 
            path='/' 
            element={<Home />} 
          />
          <Route 
            path='/about'
            element={<About />}
          />
          <Route
            path='/vans'
            element={<Vans />}
          />

      </Routes>
    </BrowserRouter>
  )
}

export default App