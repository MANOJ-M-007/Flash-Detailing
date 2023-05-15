import React from "react";
import { Box } from "@mui/material";
import Providerprofile from "../../components/providerComponents/ProviderProfile";
import Sidebar from "../../Layouts/adminLayouts/Sidebar";
const drawerWidth = 240;

const ProviderProfilePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginTop: "65px",
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Providerprofile />
      </Box>
    </Box>
  );
};

export default ProviderProfilePage;
