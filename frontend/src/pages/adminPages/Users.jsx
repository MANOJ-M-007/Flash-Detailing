import { Box } from "@mui/system";
import React from "react";
import Sidebar from "../../Layouts/adminLayouts/Sidebar";
import Userdetails from "../../components/adminComponents/Userdetails";
const Users = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Userdetails />
    </Box>
  );
};

export default Users;
