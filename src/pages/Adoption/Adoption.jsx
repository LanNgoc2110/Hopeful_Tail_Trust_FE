import React from 'react'
import './Adoption.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Pet from '../../components/Pet/Pet'

const Adoption = () => {
  return (
    <div className='adoption-whole-container'>
        <Header/>
        <div className="adoption-container">
            <Pet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Adoption