import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Slide/Slide'
import Introduce from '../../components/Introduce/Introduce'
import Commitment from '../../components/Commitment/Commitment'
import BlogNews from '../../components/BlogNews/BlogNews'


const Home = () => {
  return (
    <div className='home-whole-container'>
      <Header />
      <div className="home-container">
        <Slide />
        <Introduce/>
        <Commitment/>
        <BlogNews/>
      </div>
      <Footer />
    </div>
  )
}

export default Home