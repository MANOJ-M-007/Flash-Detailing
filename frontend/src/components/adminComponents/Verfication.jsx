import React, { useEffect } from "react";
// import profile from'../../assets/profile.webp'
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
import {
  ProviderVerify,
  providerAcceptRejectAction,
  providerIndividualDetailsAction,
} from "../../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const Verfication = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // for request listing
  const providerReq = useSelector((state) => state.providersVerifyList);
  const { providers } = providerReq;
  //for request actions
  const providerAcceptReject1 = useSelector(
    (state) => state.providerAcceptReject
  );
  const { success } = providerAcceptReject1;

  //for req handling
  const handleAccept = (id, Yes) => {
    dispatch(providerAcceptRejectAction(id, Yes));
  };
  const handleInfo = async (id) => {
    await dispatch(providerIndividualDetailsAction(id));
    Navigate("/admin/Provider/Profile");
  };

  useEffect(() => {
    dispatch(ProviderVerify());
  }, [dispatch, success]);
  return (
    <Box
      component="main"
      sx={{
        marginTop: "30px",
        flexGrow: 1,
        p: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Box
        sx={{
          marginTop: "10px",
          p: 3,
        }}
      >
        <Grid container spacing={2}>
          {providers.map((value, index) => (
            <Grid item xs={12} md={12} lg={6} key={index}>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src={value.profile.url}
                      sx={{
                        boxShadow: "4px 4px 10px rgba(190, 133, 255,1)",
                        width: { xs: "100px", md: "150px" },
                        height: { xs: "100px", md: "150px" },
                      }}
                    />
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: { xs: 1, md: 1 },
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
                        mb: { xs: 2, md: 0 },
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
                        Name : {value.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Phone = {value.mobile}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Email = {value.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Location = {value.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Services = {value.serviceType}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Button
                          sx={{
                            color: "#000000",
                            backgroundColor: "#C2FFC2",
                            boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                            width: "70px",
                            marginRight: "2.5px",
                          }}
                          onClick={() => handleAccept(value.user, "1")}
                        >
                          Accept
                        </Button>

                        <Button
                          sx={{
                            color: "#000000",
                            backgroundColor: "#FFC2C2",
                            boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                            width: "70px",
                            marginLeft: "2.5px",
                          }}
                          onClick={() => handleAccept(value.user, "0")}
                        >
                          Reject
                        </Button>
                        <Button
                          sx={{
                            color: "#000000",
                            backgroundColor: "#C2C2C2",
                            boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                            width: "70px",
                            marginLeft: "5px",
                          }}
                          onClick={() => handleInfo(value.user)}
                        >
                          View
                        </Button>
                      </div>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Verfication;
