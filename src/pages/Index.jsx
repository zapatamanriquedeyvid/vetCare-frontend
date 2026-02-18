import React from 'react'
import NavigationBar from '../components/NavigationBar'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import Nosotros from '../components/Nosotros'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import '../assets/css/index.css'

function Index() {
  return (
    <div >
      <NavigationBar/>
      <HeroSection/>
      <ServicesSection/>
      <Nosotros/>
      <Contacto/>
      <Footer/>
    </div>
  )
}

export default Index
