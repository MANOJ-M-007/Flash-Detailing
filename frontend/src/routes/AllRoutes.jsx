import React from "react";
import { BrowserRouter, Outlet, Route, Routes, Navigate} from "react-router-dom";

// Admin Routes
import AdminLogin from "../pages/adminPages/Login";
import Dashboard from "../pages/adminPages/Dashboard";
import Users from "../pages/adminPages/Users";
import Serviceproviders from "../pages/adminPages/Serviceproviders";
import ProviderVerification from "../pages/adminPages/ProviderVerification";
import Service from "../pages/adminPages/ServiceManagement";
import ProviderProfilePage from "../pages/adminPages/ProviderProfilePage";
import LocationManagement from "../pages/adminPages/LocationManagement";
import OrdersList from "../pages/adminPages/OrdersList";
// Error page
import Page404 from "../pages/page404";
// User Routes
import UserHome from "../pages/userPages/userHome";
import Login from "../pages/userPages/Login";
import Services from "../pages/userPages/Services";
import Register from "../pages/userPages/Register";
import ProviderRequest from "../pages/providerPages/ProviderRequest";
import ProfilePage from "../pages/userPages/ProfilePage";
import Bookings from "../pages/userPages/Bookings";
import CheckoutPage from "../pages/userPages/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import Chat from "../pages/ChatPage";
const promise = loadStripe(
  "pk_test_51Mx3EVSGyTtRFghzlq1WKQbEtwja93yo9QbisdkHVDjdnutaIqyn5kNDFLlGEqkX8bPylAJh1QfNq8aFc6JqSQJ80092UYIRaU"
);

function UserProtected() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? <Outlet/> : <Navigate to ="/login"/>;
}

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* userRoutes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Bookings />} />
        <Route element={<UserProtected/>}>
        <Route path="/serviceProvider" element={<ProviderRequest />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout"element={<Elements stripe={promise}><CheckoutPage /></Elements>}/>
        </Route>

        {/* adminRoutes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/userlist" element={<Users />} />
        <Route path="/admin/providerlist" element={<Serviceproviders />} />
        <Route path="/admin/providerVerification"element={<ProviderVerification />}/>
        <Route path="/admin/services/list" element={<Service />} />
        <Route path="/admin/Provider/Profile" element={<ProviderProfilePage />} />
        <Route path="/admin/location/list" element={<LocationManagement />} />
        <Route path="/admin/Orders/list" element={<OrdersList />} />
        {/* chat */}
        <Route path ='/chat' element ={<Chat/>}/>
        {/* Error Route */}
        <Route path="*" element={<Page404/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
