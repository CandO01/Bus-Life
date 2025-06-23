import React from 'react'
import About from './Pages/About'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Vans from './Pages/Vans/Vans.jsx'
import VansDetail from './Pages/Vans/VansDetail.jsx'
import Layouts from './components/Layouts.jsx'
import HostLayout from './components/HostLayout.jsx'
import Dashboard from './Pages/Host/Dashboard.jsx'
import Income from './Pages/Host/Income.jsx'
import Reviews from './Pages/Host/Reviews.jsx'
import Yesterday from './Pages/Income/Yesterday.jsx'
import Today from './Pages/Income/Today.jsx'
import Tomorrow from './Pages/Income/Tomorrow.jsx'
import HostVansList from "./Pages/Host/HostVansList"
import HostVanDetails from "./Pages/Host/HostVanDetails"
import Details from './Pages/VansDetails/Details.jsx'
import Pricing from './Pages/VansDetails/Pricing.jsx'
import Photos from './Pages/VansDetails/Photos.jsx'
import NotFound from './Pages/NotFound.jsx'
import Login from './Pages/Login.jsx'
import Auth from './Pages/Auth.jsx'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} />
        <Route path="vans/:id" element={<VansDetail />} />

        {/* {For login form} */}
        <Route path='login' element={<Login />} />

        {/* {Authentication route for the van host} */}
        <Route element={<Auth />}>
          {/* Host Nested Routes */}
          <Route path='host' element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            {/* {Income Nested Routes} */}
              <Route path="income" element={<Income />}>
                <Route path='yesterday-income' element={<Yesterday />} />
                <Route path='today-income' element={<Today />} />
                <Route path='tomorrow-income' element={<Tomorrow />} />
              </Route>
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVansList />} />
            {/* {VanDetails nested Route} */}
            <Route path="vans/:id" element={<HostVanDetails />}>
              <Route index element={<Details />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='photos' element={<Photos />} />
            </Route>
          </Route>
        </Route>
        {/* {Page not foound route} */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>

  )
}

export default App