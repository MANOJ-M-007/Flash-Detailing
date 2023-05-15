import React from 'react'
import Checkout from '../../components/userComponents/Checkout'
import Navbar from '../../Layouts/userLayouts/Navbar'
import Footer from '../../Layouts/userLayouts/Footer'

const CheckoutPage = () => {
  return (
    <>
      <Navbar />
      <Checkout/>
      <Footer />
    </>
  )
}

export default CheckoutPage
