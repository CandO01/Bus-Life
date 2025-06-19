import React from 'react'
import About from './Pages/About'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Vans from './Pages/Vans/Vans.jsx'
import './App.css'
import VansDetail from './Pages/Vans/VansDetail.jsx'
import Layouts from './components/Layouts.jsx'
import HostLayout from './components/HostLayout.jsx'
import Dashboard from './Pages/Host/Dashboard.jsx'
import Income from './Pages/Host/Income.jsx'
import Reviews from './Pages/Host/Reviews.jsx'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} />
        <Route path="vans/:id" element={<VansDetail />} />

        {/* Host Nested Routes */}
        <Route path='host' element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
    
      </Route>
    </Routes>
  </BrowserRouter>

  )
}

export default App