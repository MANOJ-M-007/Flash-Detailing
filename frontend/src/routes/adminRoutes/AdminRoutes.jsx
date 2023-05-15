import React from "react";
import Dashboard from "../../pages/adminPages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/adminPages/Login";
import Users from "../../pages/adminPages/Users";
import Serviceproviders from "../../pages/adminPages/Serviceproviders";
import ProviderVerification from "../../pages/adminPages/ProviderVerification";
import Service from "../../pages/adminPages/ServiceManagement";
import ProviderProfilePage from "../../pages/adminPages/ProviderProfilePage";
import LocationManagement from "../../pages/adminPages/LocationManagement";
import OrdersList from "../../pages/adminPages/OrdersList";
// import NotFound from '../../pages/page404'

const AdminRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/userlist" element={<Users />} />
        <Route path="/admin/providerlist" element={<Serviceproviders />} />
        <Route path="/admin/providerVerification" element={<ProviderVerification />} />
        <Route path="/admin/services/list" element={<Service />} />
        <Route path="/admin/Provider/Profile" element={<ProviderProfilePage />} />
        <Route path="/admin/location/list" element={<LocationManagement />} />
        <Route path ='/admin/Orders/list' element ={<OrdersList/>}/>
        {/* <Route path="/admin/*" element={<NotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoutes;
