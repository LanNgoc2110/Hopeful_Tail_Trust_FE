import React from 'react'
import './Introduction.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Slide/Slide'
import Vision from '../../components/Vision/Vision'
import Mission from '../../components/Mission/Mission'
import ContactUs from '../../components/ContactUs/ContactUs'

const Introduction = () => {
  return (
    <div className='introduction-whole-container'>
        <Header />
        <div className="introduction-container">
            <Vision/>
            <Mission/>
            <ContactUs/>
        </div>
        <Footer/>
    </div>
  )
}

export default Introduction