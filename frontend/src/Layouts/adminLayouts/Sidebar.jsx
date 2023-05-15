import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MailIcon from '@mui/icons-material/Mail';
import DashboardCustomizeTwoToneIcon from "@mui/icons-material/DashboardCustomizeTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import MenuIcon from "@mui/icons-material/Menu";
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import EditNotificationsTwoToneIcon from '@mui/icons-material/EditNotificationsTwoTone';
import Toolbar from "@mui/material/Toolbar";

import { Link, useNavigate } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material";
import Logo from "../../assets/LOGO TRANS.png";
import { keyframes } from '@emotion/react';

import { useEffect } from "react";
// import { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { adminLogout } from "../../features/admin/adminLoginSlice";
// import { fontWeight } from "@mui/system";


const drawerWidth = 240;
///vibration
const vibrationAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px) rotate(-3deg);
  }
  40% {
    transform: translateX(4px) rotate(2deg);
  }
  60% {
    transform: translateX(-2px) rotate(-1deg);
  }
  80% {
    transform: translateX(1px) rotate(1deg);
  }
  100% {
    transform: translateX(0);
  }
`;



function ResponsiveDrawer(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminLogin = useSelector((state)=>state.adminLogin)
  const {adminInfo} = adminLogin;

  useEffect(() => {
  },[adminInfo]);

  const logoutHandler =()=>{
    dispatch(adminLogout());
    localStorage.removeItem('adminInfo');
    navigate('/admin')
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    {
      name: "Dashboard",
      icon: <DashboardCustomizeTwoToneIcon />,
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      icon: <PeopleTwoToneIcon />,
      path: "/admin/userlist",
    },
    {
      name: "Service providers",
      icon: <PeopleAltTwoToneIcon />,
      path: "/admin/providerlist",
    },
    {
      name: "Verification",
      icon: <VerifiedTwoToneIcon />,
      path: "/admin/providerVerification",
    },
    {
      name: "Services",
      icon: <DesignServicesTwoToneIcon />,
      path: "/admin/services/list",
    },
    {
      name: "Locations",
      icon: <AddLocationTwoToneIcon />,
      path: "/admin/location/list",
    },
    {
      name: "Orders",
      icon: <EditNotificationsTwoToneIcon />,
      path: "/admin/Orders/list",
    },
  ];

  const drawer = (
    <Box 
    sx={{ 
      height: "100%", 
      // backgroundImage: "linear-gradient(to top ,#ced4da, #adb5bd)", 
      backgroundImage: "linear-gradient(to right, #DEC2FF 0%, #F4F4F6 100%)", 
      }}>
      <Toolbar 
      sx={{ 
        // backgroundColor: "#adb5bd", 
        // backgroundColor: "#ffff", 
        backgroundImage: "linear-gradient(to right, #DEC2FF 0%, #F4F4F6 100%)", 
        color: "white",
        }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "30%", maxHeight: "30%" }}
        />
      </Toolbar>
      <Divider />
      <List >
        {navLinks.map(({ name, icon, path }) => (
          <ListItem  Button key={name} component={Link} to={path}>
            <ListItemButton>
              <ListItemIcon sx={{ color:'#642CFF' ,'&:hover': { animation: `${vibrationAnimation} 0.5s ease-in-out forwards` }}}>{icon}</ListItemIcon>
              <ListItemText sx={{ color: "#640093", fontWeight: 1000 }} primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar 
        sx={{ 
          backgroundImage: "linear-gradient(to top ,#ffff, #ffff)",
          // backgroundImage: "linear-gradient(to bottom ,#B1B1B1, #ffffff)", 
          height: '62px' }}>
          <IconButton
            color="white"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
          sx={{'&:hover': { animation: `${vibrationAnimation} 0.5s ease-in-out forwards` }}}
          color="white" aria-label="admin profile">
            <AccountCircle />
          </IconButton>
          <IconButton 
          sx={{'&:hover': { animation: `${vibrationAnimation} 0.5s ease-in-out forwards` }}}
          color="error" 
          aria-label="logout"
          onClick={()=>{
            logoutHandler();
          }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            // backgroundColor: 'red',
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
