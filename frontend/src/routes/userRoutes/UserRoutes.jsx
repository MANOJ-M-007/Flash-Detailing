import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHome from "../../pages/userPages/userHome";
import Login from "../../pages/userPages/Login";
import Services from "../../pages/userPages/Services";
import Register from "../../pages/userPages/Register";
import ProviderRequest from "../../pages/providerPages/ProviderRequest";
import ProfilePage from "../../pages/userPages/ProfilePage";
import Bookings from "../../pages/userPages/Bookings";
import CheckoutPage from "../../pages/userPages/CheckoutPage";
// import NotFound from '../../pages/page404'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
const promise = loadStripe(
  'pk_test_51Mx3EVSGyTtRFghzlq1WKQbEtwja93yo9QbisdkHVDjdnutaIqyn5kNDFLlGEqkX8bPylAJh1QfNq8aFc6JqSQJ80092UYIRaU'
)


const UserRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/serviceProvider" element={<ProviderRequest />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/checkout" element={<Elements stripe={promise}><CheckoutPage/></Elements>} />
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default UserRoutes;
