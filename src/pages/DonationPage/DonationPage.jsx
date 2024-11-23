import React from 'react'
import './DonationPage.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Donation from '../../components/Donation/Donation'

const DonationPage = () => {
  return (
    <div className='donation_page-whole-container'>
      <Header/>
      <div className="donation_page-container">
        <Donation/>
      </div>
      <Footer/>
    </div>
  )
}

export default DonationPage