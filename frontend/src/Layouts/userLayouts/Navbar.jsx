import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { keyframes } from "@emotion/react"; 
import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";
import Logo from "../../assets/LOGO TRANS.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userLoginSlice";
import { Autocomplete, TextField } from "@mui/material";
import {
  usersLocationsListAction,
  userLocationAddAction,
} from "../../actions/userActions";
const moveAnimation = keyframes`
  0% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(5px) scale(1.1);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const pages = ["HOME", "SERVICES", "BOOKINGS"];
  const links = ["/", "/services", "/booking"];

  const locationlist = useSelector((state) => state.userLocationsList);
  const { locations } = locationlist;

  const addLocation = useSelector((state) => state.userLocationAdd);
  const { locationAddSuccess } = addLocation;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutHandler = () => {
    dispatch(userLogout());
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  //location purpose

  const options = locations.map((data) => ({
    label: data.location,
  }));
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event, location) => {
    localStorage.setItem("selectedLocation", JSON.stringify(location.label));
    dispatch(userLocationAddAction(location.label));
  };

  useEffect(() => {
    dispatch(usersLocationsListAction());
  }, [dispatch, locationAddSuccess]);

  useEffect(() => {
    const location = JSON.parse(localStorage.getItem("selectedLocation")) || "";
    setSelectedLocation(location);
  }, [locationAddSuccess]);

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "#ced4da" }}
      sx={{
        opacity: "0.8",
        borderRadius: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="LoGo"
            src={Logo}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              opacity: "0.8",
              width: "5rem",
              height: "5rem",
              animation: `${moveAnimation} 2s linear infinite`,
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", opacity: "0.8" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    key={index}
                    to={`${links[index]}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{ "&:hover": { transform: "scale(1.1)" } }}
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            alt="LoGo"
            src={Logo}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              width: "5rem",
              height: "5rem",
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <Link
                key={index}
                to={`${links[index]}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "flex",
                    fontWeight: "bold",
                    marginRight: "20px",
                    "&:hover": {
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease-out",
                    },
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Autocomplete
            id="location"
            onChange={handleLocationChange}
            value={addLocation?.LocationAdd || selectedLocation || ""}
            options={options}
            sx={{
              width: { xs: "50px", sm: "100", md: "150px", lg: "200px" },
              height: 40,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiPaper-root": {
                border: "none",
              },
              marginRight:
                "10px" /* Remove the border of the Autocomplete component */,
              "& .MuiAutocomplete-inputRoot": {
                height: 40,
                border: "none" /* Remove the border of the input field */,
              },
              "& .MuiAutocomplete-listbox": {
                height: 200,
              },
              "& .MuiAutocomplete-groupLabel": {
                backgroundColor: "#f5f5f5",
                color: "#A66A6F",
                fontWeight: "bold",
              },
              "& .MuiAutocomplete-option": {
                '&[data-focus="true"]': {
                  backgroundColor: "#f5f5f5",
                },
              },
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <Link to="/chat">
            <ChatTwoToneIcon sx={{ color: "#9000B8", paddingRight: "10px" }} />
          </Link> */}
          {userInfo ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Box
                    textAlign="center"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      marginRight: "10px",
                      "& > first-of-type": {
                        marginBottom: "5px",
                        color: "#AA77FF",
                      },
                      "& > :last-child": {
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#AA77FF",
                      },
                      "& > :last-child:hover": {
                        color: "red",
                      },
                    }}
                  >
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{ "&:hover": { transform: "scale(1.1)" } }}
                      >
                        Profile
                      </Typography>
                    </Link>
                    <Typography
                      sx={{ "&:hover": { transform: "scale(1.1)" } }}
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box color="black">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "#293462",
                    borderRadius: "10px",
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: "normal",
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    lineHeight: "1.5",
                    bgcolor: "#DAF5FF",
                    "&:hover": {
                      bgcolor: "#B9E9FC",
                      boxShadow: "none",
                    },
                    "&:active": {
                      boxShadow: "none",
                      bgcolor: "#B0DAFF",
                    },
                    "&:focus": {
                      boxShadow: "0 0 0 0.2rem rgb(178, 164, 255)",
                    },
                  }}
                >
                  LogIn{" "}
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
