import { Box } from "@mui/material";
import React from "react";
import Verfication from "../../components/adminComponents/Verfication";
import Sidebar from "../../Layouts/adminLayouts/Sidebar";

const ProviderVerification = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Verfication />
    </Box>
  );
};

export default ProviderVerification;
