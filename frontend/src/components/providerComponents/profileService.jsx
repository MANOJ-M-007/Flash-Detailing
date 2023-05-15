import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction } from "../../actions/userActions";
import { providerDetailsAction } from "../../actions/providerAction";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InfoIcon from "@mui/icons-material/Info";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
const ProfileService = () => {
  const dispatch = useDispatch();
  const { providerDetails } = useSelector((state) => state.providerDetails);
  const { userDetails } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(userDetailsAction());
    dispatch(providerDetailsAction());
  }, [dispatch]);

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "5px 5px 15px rgb(86, 74, 74)",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 4, md: 8 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      mb: { xs: 2, md: 2 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#7A75A1",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.15em",
                        lineHeight: "2.5",
                        alignItems: "center",
                      }}
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      <LocalCarWashIcon sx={{ color: "#AA77FF" }} /> YOUR
                      SERVICES
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#757575",
                        marginBottom: "0.5rem",
                        lineHeight: "1.5",
                      }}
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      Selected Services : {userDetails?.serviceType}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#7A75A1",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.15em",
                        lineHeight: "2.5",
                        alignItems: "center",
                      }}
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      <CurrencyRupeeIcon
                        sx={{ color: "#AA77FF", marginTop: "50px" }}
                      />{" "}
                      YOUR PAYMENTS
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#757575",
                        marginBottom: "0.5rem",
                        lineHeight: "1.5",
                      }}
                    >
                      Payment For Suv : {providerDetails?.suv}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#757575",
                        marginBottom: "0.5rem",
                        lineHeight: "1.5",
                      }}
                    >
                      Payment For Sedan : {providerDetails?.sedan}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#757575",
                        marginBottom: "0.5rem",
                        lineHeight: "1.5",
                      }}
                    >
                      Payment For Hatchback : {providerDetails?.hatchback}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    ></div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  p: { xs: 4, md: 8 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      mb: { xs: 2, md: 2 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#7A75A1",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.15em",
                        lineHeight: "2.5",
                        alignItems: "center",
                      }}
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      <VerifiedUserIcon sx={{ color: "#AA77FF" }} /> YOUR ID
                      PROOF
                    </Typography>
                    <CardHeader
                      avatar={
                        <Avatar
                          variant="square"
                          src={providerDetails?.aadhar?.url}
                          sx={{
                            boxShadow: "4px 4px 5px rgba(190, 133, 255,.5)",
                            width: {
                              xs: "250px",
                              sm: "255px",
                              md: "275px",
                              lg: "360px",
                            },
                            height: {
                              xs: "140px",
                              sm: "180px",
                              md: "185px",
                              lg: "230px",
                            },
                          }}
                        />
                      }
                    />
                    <Typography
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#7A75A1",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.15em",
                        lineHeight: "2.5",
                        alignItems: "center",
                      }}
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      <InfoIcon sx={{ color: "#AA77FF" }} /> ABOUT
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                      sx={{
                        fontFamily: "sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        color: "#757575",
                        marginBottom: "0.5rem",
                        lineHeight: "1.5",
                      }}
                    >
                      : {providerDetails?.experience}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    ></div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ProfileService;
