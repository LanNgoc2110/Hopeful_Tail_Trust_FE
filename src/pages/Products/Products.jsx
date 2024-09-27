import React from 'react'
import './Products.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Products = () => {
  return (
    <div className='products-whole-container'>
        <Header />
        <div className="products-container">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Products