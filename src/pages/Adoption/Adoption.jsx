import React from 'react'
import './Adoption.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Pet from '../../components/Pet/Pet'
import { Outlet } from 'react-router-dom'

const Adoption = () => {
  return (
    <div className='adoption-whole-container'>
      <Header />
      <div className="adoption-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Adoption