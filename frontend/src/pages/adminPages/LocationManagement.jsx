import React from "react";
import Sidebar from "../../Layouts/adminLayouts/Sidebar";
import Locations from "../../components/adminComponents/Locations";
import { Box } from "@mui/material";


const LocationManagement = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Locations />
    </Box>
  );
};

export default LocationManagement;
