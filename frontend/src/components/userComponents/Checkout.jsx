import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import apiCalls from "../../EndPoints/userApiCalls";
import { useSelector } from "react-redux";
import { format } from "date-fns"; // Import format function from date-fns library
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import axios from "axios";
import { axiosInstance } from "../../utility/axios";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  //Alert
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAutoClose = () => {
    setTimeout(() => {
      handleClose();
    }, 3000); // close dialog after 3 seconds
  };

  //datas from booking page
  const { savedBookingFilter } = useSelector(
    (state) => state.savedBookingFliterData
  );
  //list user Address
  const { userDetails } = useSelector((state) => state.userDetails);
  //list all providers
  const { providers } = useSelector((state) => state.userProvidersList);
  //find selected provider
  const selectedProvider = providers.find(
    (user) => user.user === savedBookingFilter.providerId
  );
  //list all service
  const { services } = useSelector((state) => state.userServiceList);
  //find selected service
  const selectedService = services.find(
    (data) => data.serviceName === savedBookingFilter.serviceSelect
  );
  //selected date
  const selectedDate = savedBookingFilter.date;
  //selected time
  const selectedTime = savedBookingFilter.time;
  //total
  const VehicleType = savedBookingFilter.selectedVehicle;
  const Total = selectedProvider[VehicleType];

  //Datas
  const providerId = savedBookingFilter.provider;
  const Service = savedBookingFilter.serviceSelect;

  //payment related
  const elements = useElements();
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  //payment button show
  const [buttonShow, setButtonShow] = useState(false);
  const startPayment = () => {
    const fetchClientSecret = async () => {
      const data = await axiosInstance.post("/api/users/payment/create", {
        amount: Total,
      });
      setClientSecret(data.data.clientSecret);
    };
    fetchClientSecret();
    setButtonShow(true);
  };

  const confirmPayment = async (e) => {
    e.preventDefault();
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        setOpen(true);
        handleAutoClose();
        placeOrder();
        navigate("/");
      })
      .catch((err) => console.warn(err));
  };
  const { userInfo } = useSelector((state) => state.userLogin);
  const placeOrder = async () => {
    const data = {
      userId: userInfo._id,
      providerId: providerId,
      service: Service,
      vehicle: VehicleType,
      date: selectedDate,
      time: selectedTime,
      total: Total,
    };
    const response = await apiCalls.placeOrder(data);
  };

  return (
    <Box sx={{ marginTop: "75px", p: 2, bgcolor: "#f5f5f5" }}>
      <Card
        sx={{
          p: { xs: "1", sm: "1.5", md: "2", lg: "3" },
          backgroundColor: "#ffffff",
          display: "flex",
        }}
      >
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiDialog-paper": {
                width: "450px",
                maxWidth: "90%",
                borderRadius: "10px",
                backgroundColor: "#F7F7F7",
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                color: "#957777",
                fontSize: "30px",
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
            >
              Payment Successfull
            </DialogTitle>
            <DialogContent sx={{ margin: "10px" }}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontFamily: "monospace",
                  fontWeight: 500,
                  color: "#B0A4A4",
                }}
              >
                You have scheduled the service {selectedService.serviceName}{" "}
                with {selectedProvider.name} for{" "}
                {format(new Date(selectedDate), "dd-MM-yyyy")} at {selectedTime}
              </p>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </>
        <Grid container spacing={1} sx={{ display: "flex" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ height: "100%" }}>
              <Typography
                variant="h6"
                color="textSecondary"
                component="p"
                sx={{
                  fontFamily: "sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 550,
                  color: "#757575",
                  marginBottom: "10px",
                  lineHeight: "2",
                  textAlign: "center",
                  letterSpacing: 2,
                }}
              >
                YOUR ADDRESS
              </Typography>

              <Card
                sx={{
                  minHeight: "100%",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, md: 4 },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      mb: { xs: 2, md: 2 },
                    }}
                  >
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
                        lineHeight: "2",
                      }}
                    >
                      HOME : {userDetails?.address?.addressName}
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
                        lineHeight: "2",
                      }}
                    >
                      CITY : {userDetails?.address?.city}
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
                        lineHeight: "2",
                      }}
                    >
                      PIN : {userDetails?.address?.pin}
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
                        lineHeight: "2",
                      }}
                    >
                      {/* LOCATION : {userDetails?.address?.country} */}
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
                        lineHeight: "2",
                      }}
                    >
                      STATE : {userDetails?.address?.state}
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
                        lineHeight: "2",
                      }}
                    >
                      COUNTRY : {userDetails?.address?.country}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 550,
                  color: "#757575",
                  marginBottom: "10px",
                  lineHeight: "2",
                  textAlign: "center",
                  letterSpacing: 2,
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                SELECTED PROVIDER
              </Typography>
              <Card
                sx={{
                  height: "200px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Provider"
                      src={selectedProvider.profile.url}
                      sx={{
                        width: { xs: "70px", md: "95px" },
                        height: { xs: "70px", md: "95px" },
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
                        mb: { xs: 1, md: 1 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                        }}
                        variant="h6"
                        color="textSecondary"
                        component="p"
                      >
                        Name :{selectedProvider.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Phone :{selectedProvider.mobile}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Email :{selectedProvider.email}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Service :{selectedProvider.serviceType}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 550,
                  color: "#757575",
                  marginBottom: "10px",
                  lineHeight: "2",
                  textAlign: "center",
                  letterSpacing: 2,
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                SELECTED SERVICE
              </Typography>
            </Box>
            <Box sx={{ height: "398px" }}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={selectedService.serviceName}
                      src={selectedService?.image?.url}
                      sx={{
                        width: { xs: "70px", md: "95px" },
                        height: { xs: "70px", md: "95px" },
                      }}
                    />
                  }
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
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
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                        }}
                        variant="h6"
                        color="textSecondary"
                        component="p"
                      >
                        Name :{selectedService.serviceName}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                        }}
                        variant="h6"
                        color="textSecondary"
                        component="p"
                      >
                        Details :
                        <Typography
                          sx={{
                            fontFamily: "sans-serif",
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: "#757575",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {selectedService.serviceDetails}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: { xs: 1, md: 3 },
                  }}
                >
                  <Card
                    sx={{
                      p: 1,
                      backgroundColor: "#F6F5F4",
                      display: "flex", // Add this property to display items in a row
                      flexDirection: "row",
                      flexWrap: "wrap", // Add this line to wrap the options to the next line if needed
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "50%", md: "50%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Selected service
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Selected Location
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Vehicle Type
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Selected Provider
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "50%", md: "50%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {savedBookingFilter.serviceSelect}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {selectedProvider.location}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {savedBookingFilter.selectedVehicle}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {selectedProvider.name}
                      </Typography>
                    </Box>
                  </Card>
                  <Card
                    sx={{
                      p: 1,
                      marginTop: "5px",
                      backgroundColor: "#F6F5F4",
                      display: "flex", // Add this property to display items in a row
                      flexDirection: "row",

                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "50%", md: "50%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex", // Add this property to display items in a row
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Selected Date
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Selected Time
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "50%", md: "50%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {format(new Date(selectedDate), "dd-MM-yyyy")}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {selectedTime}
                      </Typography>
                    </Box>
                  </Card>
                  <Card
                    sx={{
                      p: 1,
                      marginTop: "5px",
                      backgroundColor: "#F6F5F4",
                      display: "flex", // Add this property to display items in a row
                      flexDirection: "row",
                      flexWrap: "wrap", // Add this line to wrap the options to the next line if needed
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "50%", md: "50%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        TOTAL
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "50%", md: "50%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {Total}
                      </Typography>
                    </Box>
                  </Card>
                  <Card
                    sx={{
                      p: 1,
                      marginTop: "5px",
                      backgroundColor: "#F6F5F4",
                    }}
                  >
                    <Button
                      onClick={startPayment}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ backgroundColor: "#B5D6B1" }}
                    >
                      Proceeed To Payment
                    </Button>
                    {buttonShow === true ? (
                      <>
                        <Typography
                          sx={{
                            fontFamily: "sans-serif",
                            fontSize: "1rem",
                            fontWeight: 550,
                            color: "#757575",
                            marginBottom: "0.5rem",
                            lineHeight: "2",
                          }}
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Choose Payment
                        </Typography>
                        <Box>
                          <Typography
                            sx={{ marginTop: "10px", marginBottom: "10px" }}
                          >
                            Card Details
                          </Typography>
                          <CardElement />
                        </Box>
                        <Button
                          onClick={confirmPayment}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Confirm Payment
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    <Link to="/booking" style={{ textDecoration: "none" }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 0.5, mb: 0.5 }}
                      >
                        BACK TO BOOKING
                      </Button>
                    </Link>
                  </Card>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Checkout;
