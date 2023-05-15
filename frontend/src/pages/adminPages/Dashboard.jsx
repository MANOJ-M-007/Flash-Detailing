import React from "react";
import Sidebar from "../../Layouts/adminLayouts/Sidebar";
import Trial from "../../components/adminComponents/Dashboard";
import { Box } from "@mui/material";
const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Trial />
    </Box>
  );
};

export default Dashboard;
