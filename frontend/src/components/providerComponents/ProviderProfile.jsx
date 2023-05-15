import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const ProviderProfile = () => {
  const providerindividual = useSelector(
    (state) => state.providerProfileDetail
  );
  const { Data, loadingAction, success } = providerindividual;

  useEffect(() => {}, [success, Data]);

  return (
    <>
      <Box sx={{ bgcolor: "#f5f5f5", p: 1 }}>
        {loadingAction && <Loading />}
        <Grid container spacing={1} sx={{ display: "flex" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#757575",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                PROFILE
              </Typography>
              <CardHeader
                avatar={
                  <Avatar
                    variant="square"
                    src={Data.profile.url}
                    sx={{
                      boxShadow: "4px 4px 10px rgba(190, 133, 255,1)",
                      width: {
                        xs: "250px",
                        sm: "255px",
                        md: "260px",
                        lg: "340px",
                      },
                      height: {
                        xs: "250px",
                        sm: "255px",
                        md: "260px",
                        lg: "340px",
                      },
                    }}
                  />
                }
              />
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#757575",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                AADHAR
              </Typography>
              <CardHeader
                avatar={
                  <Avatar
                    variant="square"
                    src={Data.aadhar.url}
                    sx={{
                      boxShadow: "4px 4px 10px rgba(190, 133, 255,1)",
                      width: {
                        xs: "290px",
                        sm: "255px",
                        md: "275px",
                        lg: "360px",
                      },
                      height: {
                        xs: "180px",
                        sm: "180px",
                        md: "185px",
                        lg: "230px",
                      },
                    }}
                  />
                }
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  marginTop: "30px",
                  fontFamily: "revert",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#757575",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                PERSONAL DETAILS
              </Typography>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 1, md: 3 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "100%" },
                    mb: { xs: 1, md: 0 },
                    lineHeight: "3",
                    minHeight: "596px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "revert",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#757575",
                      marginBottom: "0.5rem",
                    }}
                    variant="h6"
                    color="textSecondary"
                    component="p"
                  >
                    Name : {Data.name}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Email : {Data.email}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Mobile NO : {Data.mobile}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Location : {Data.location}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Address : {Data.address.addressName}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    City : {Data.address.city}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    State : {Data.address.state}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    PIN Code:{Data.address.pin}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    country : {Data.address.country}
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "3",
                      fontSize: "1rem",
                      fontWeight: 650,
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      width: "310px",
                    }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    About Me : {Data.experience}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  marginTop: "30px",
                  fontFamily: "revert",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#757575",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                WORK DETAILS
              </Typography>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 1, md: 3 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "100%" },
                    mb: { xs: 1, md: 0 },
                    lineHeight: "2",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "revert",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#757575",
                      marginBottom: "0.5rem",
                    }}
                    variant="h6"
                    color="textSecondary"
                    component="p"
                  >
                    Service Type : {Data.serviceType}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {/* Phone = {value.mobile} */}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    textAlign="center"
                  >
                    Payments For Each Models
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    SUV : {Data.suv}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Sedan : {Data.sedan}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Hatchback : {Data.hatchback}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProviderProfile;
