import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Image from "../../assets/background.jpg";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import ProfileService from "../providerComponents/profileService";
import OrdersList from "./OrdersList";
import ProviderOrderList from "../providerComponents/ProviderOrderList";
import ProviderOrdersGraph from "../providerComponents/ProviderOrdersGraph";
const UserProfile = () => {
  //userdetails
  const { userDetails } = useSelector((state) => state.userDetails);
  const [activeButton, setActiveButton] = useState("profile");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // for tabs styles
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        position="relative"
        sx={{
          filter: "brightness(50%)",
          width: "100%",
          height: "40vh",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "600px",
          borderRadius: ".5rem",
        }}
      />
      {userDetails?.role === "user" ? (
        <>
          <Box
            position="absolute"
            sx={{
              marginTop: "100px",
              right: "50px",
            }}
          >
            <Typography
              sx={{
                opacity: "0.8",
                marginLeft: "40px",
                textAlign: "end",
                fontSize: matches ? "1rem" : "0.8rem",
                fontWeight: 500,
                color: "first.main",
              }}
            >
              Click the bellow 'Click Here' button to fill out the form and join
              our community of providers offering high-quality services to our
              users
            </Typography>
          </Box>
          <Box
            position="absolute"
            sx={{
              marginTop: matches ? "160px" : "175px",
              right: "50px",
            }}
          >
            <Button
              sx={{
                opacity: "0.8",
                marginLeft: "850px",
                textAlign: "end",
                fontSize: matches ? "0.8" : "0.7rem",
                fontWeight: 500,
                color: "#000000",
                backgroundColor: "#85FF89",
                "&:hover": {
                  backgroundColor: "#58B7FF",
                },
                boxShadow: "5px 5px 15px rgb(87, 17, 121)",
                width: matches ? "120px" : "90px",
                textDecoration: "none",
              }}
              component={Link}
              to="/serviceProvider"
            >
              Click Here
            </Button>
          </Box>
        </>
      ) : null}

      <Box position="absolute" sx={{ width: "90%", maxWidth: "1200px", p: 1 }}>
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center", // center horizontally
            alignItems: "center", // center vertically
            marginTop: "200px",
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color={activeButton === "profile" ? "primary" : "default"}
                  onClick={() => handleButtonClick("profile")}
                  sx={{
                    color: activeButton === "profile" ? "#ffffff" : "#BAB9CB",
                    fontWeight: activeButton === "profile" ? "bold" : "normal",
                  }}
                >
                  PROFILE
                </Button>
                {userDetails?.role === "provider" ? (
                  <>
                    <Button
                      color={
                        activeButton === "services" ? "primary" : "default"
                      }
                      onClick={() => handleButtonClick("services")}
                      sx={{
                        color:
                          activeButton === "services" ? "#ffffff" : "#BAB9CB",
                        fontWeight:
                          activeButton === "services" ? "bold" : "normal",
                      }}
                    >
                      Your Services
                    </Button>
                    <Button
                      color={activeButton === "sales" ? "primary" : "default"}
                      onClick={() => handleButtonClick("sales")}
                      sx={{
                        color: activeButton === "sales" ? "#ffffff" : "#BAB9CB",
                        fontWeight:
                          activeButton === "sales" ? "bold" : "normal",
                      }}
                    >
                      Your Sales
                    </Button>
                  </>
                ) : null}
                {userDetails && userDetails.role === "provider" ? (
                  <Button
                    color={
                      activeButton === "providerOrder" ? "primary" : "default"
                    }
                    onClick={() => handleButtonClick("providerOrder")}
                    sx={{
                      color:
                        activeButton === "providerOrder"
                          ? "#ffffff"
                          : "#BAB9CB",
                      fontWeight:
                        activeButton === "providerOrder" ? "bold" : "normal",
                    }}
                  >
                    ORDERS
                  </Button>
                ) : (
                  userDetails && (
                    <Button
                      color={
                        activeButton === "userOrders" ? "primary" : "default"
                      }
                      onClick={() => handleButtonClick("userOrders")}
                      sx={{
                        color:
                          activeButton === "userOrders" ? "#ffffff" : "#BAB9CB",
                        fontWeight:
                          activeButton === "userOrders" ? "bold" : "normal",
                      }}
                    >
                      ORDERS
                    </Button>
                  )
                )}

                {/* shows tables */}
              </Box>
              {activeButton === "profile" && <Profile />}
              {activeButton === "services" && <ProfileService />}
              {activeButton === "providerOrder" && <ProviderOrderList />}
              {activeButton === "userOrders" && <OrdersList />}
              {activeButton === "sales" && <ProviderOrdersGraph />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
