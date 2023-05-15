import { Box } from "@mui/material";
import React from "react";
import Providers from "../../components/adminComponents/Providers";
import Sidebar from "../../Layouts/adminLayouts/Sidebar";

const Serviceproviders = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Providers />
    </Box>
  );
};

export default Serviceproviders;
