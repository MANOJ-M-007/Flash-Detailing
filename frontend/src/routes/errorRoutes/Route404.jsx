import React from "react";
import {  Route, Routes } from "react-router-dom";
import Page404 from "../../pages/page404";

const Route404 = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
      </Routes>
    // </BrowserRouter>
  );
};

export default Route404;
