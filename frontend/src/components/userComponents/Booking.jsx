import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { format } from "date-fns"; // Import format function from date-fns library

import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  providerListAction,
  usersServiceListAction,
  savedBookingFilterAction,
  userDetailsAction,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const useStyles = makeStyles((theme) => ({
  //for fixed height of provider container
  root: {
    height: 540,
    overflow: "auto",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: "0.1em",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#Ffffff", // set to an appropriate thumb color
    },
  },
  card: {
    height: 100, // Set the height of each card
    [theme.breakpoints.down("sm")]: {
      height: 200, // Set the height of each card on mobile view
      width: 200,
    },
  },
}));

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  //select type of service
  const [errorOpen, setErrorOpen] = useState(false);
  const handleClose = () => {
    setErrorOpen(false);
  };

  const [serviceSelect, setServiceSelect] = useState(); //service choose
  //select date
  const [date, setDate] = useState(null);
  //select time
  const handleTimeChange = (event) => {
    setTime(event.target.value); // Update the selected time state when a radio button is clicked
  };
  const [time, setTime] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  const providersList = useSelector((state) => state.userProvidersList);
  const { providers } = providersList;

  const SearchService = useSelector((state) => state.bannerSearchService);
  const { bannerSearchService, bannerServiceSuccess } = SearchService;

  const serviceslist = useSelector((state) => state.userServiceList);
  const { services } = serviceslist;

  const { LocationAdd } = useSelector((state) => state.userLocationAdd);

  /////////////////////////////////////////////location veri

  let data = [];
  if (bannerServiceSuccess) {
    if (serviceSelect == null) {
      data = bannerSearchService.filter(
        (provider) =>
          !provider.orders.some(
            (order) =>
              format(new Date(order.date), "dd-MM-yyyy") ===
                format(new Date(date), "dd-MM-yyyy") && order.time === time
          )
      );
    } else if (serviceSelect != null) {
      data = providers.filter(
        (provider) =>
          provider.serviceType === serviceSelect &&
          !provider.orders.some(
            (order) =>
              format(new Date(order.date), "dd-MM-yyyy") ===
                format(new Date(date), "dd-MM-yyyy") && order.time === time
          )
      );
    } else {
      data = providers.filter(
        (provider) =>
          !provider.orders.some(
            (order) => order.date === date && order.time === time
          )
      );
    }
  } else {
    if (serviceSelect != null) {
      data = providers.filter(
        (provider) =>
          provider.serviceType === serviceSelect &&
          !provider.orders.some(
            (order) =>
              format(new Date(order.date), "dd-MM-yyyy") ===
                format(new Date(date), "dd-MM-yyyy") && order.time === time
          )
      );
    } else {
      data = providers.filter(
        (provider) =>
          !provider.orders.some(
            (order) =>
              format(new Date(order.date), "dd-MM-yyyy") ===
                format(new Date(date), "dd-MM-yyyy") && order.time === time
          )
      );
    }
  }

  /// vehicle type filter
  const [selectedVehicle, setSelectedVehicle] = useState("hatchback");

  /// Dailog box for provider details

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  //for service selection

  const handleChangeService = (event) => {
    setServiceSelect(event.target.value);
  };

  //handleBooking

  const handleBooking = (
    providerId,
    provider,
    selectedVehicle,
    serviceSelect,
    date,
    time
  ) => {
    dispatch(
      savedBookingFilterAction(
        providerId,
        provider,
        selectedVehicle,
        serviceSelect,
        date,
        time
      )
    );
    let error = false;
    if (
      providerId == null ||
      provider == null ||
      selectedVehicle == null ||
      serviceSelect == null ||
      date == null ||
      time == null
    ) {
      error = true;
    }
    if (error) {
      setErrorOpen(true);
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    dispatch(usersServiceListAction());
    dispatch(userDetailsAction());
  }, [dispatch, LocationAdd]);

  useEffect(() => {
    const selectedLocation =
      JSON.parse(localStorage.getItem("selectedLocation")) || "null";
    if (selectedLocation) {
      dispatch(providerListAction(selectedLocation));
    }
  }, [dispatch, LocationAdd]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "1px 1px 3px rgba(0, 0, 0,.2)",
            maxWidth: "800px",
            marginLeft: { xs: "20px", md: "80px" },
            height: "550px",
            p: { xs: 1, md: 2 },
            marginTop: "100px",
            right: "50px",
            minWidth: "200px",
          }}
        >
          <Snackbar
            open={errorOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Error: Some required fields are not filled.
            </Alert>
          </Snackbar>
          <FormControl>
            <FormLabel
              sx={{ marginTop: "10px", fontWeight: 700 }}
              id="demo-radio-buttons-group-label"
            >
              Choose Your Vehicle Type
            </FormLabel>
            <FormControlLabel
              name="radio-buttons-group"
              control={<Radio />}
              label="hatchback"
              value="hatchback"
              checked={selectedVehicle === "hatchback"}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            />
            <FormControlLabel
              name="radio-buttons-group"
              control={<Radio />}
              label="sedan"
              value="sedan"
              checked={selectedVehicle === "sedan"}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            />
            <FormControlLabel
              name="radio-buttons-group"
              control={<Radio />}
              label="suv"
              value="suv"
              checked={selectedVehicle === "suv"}
              onChange={(e) => setSelectedVehicle(e.target.value)}
            />
          </FormControl>
          <Typography
            sx={{ marginTop: "10px", fontWeight: 700, color: "#796D67" }}
          >
            Choose Your Service
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={serviceSelect}
              onChange={handleChangeService}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {services.map((service) => (
                <MenuItem key={services._id} value={service.serviceName}>
                  {service.serviceName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              You can Choose Your Required service Here
            </FormHelperText>
          </FormControl>

          <Box
            sx={{
              width: { xs: "100%", md: "100%" },
              mb: { xs: 1, md: 0 },
              lineHeight: "2",
            }}
          >
            <FormControl>
              <FormLabel
                sx={{ marginTop: "10px", fontWeight: 700 }}
                id="demo-radio-buttons-group-label"
              >
                Choose Your Date
              </FormLabel>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={date}
                      disablePast="true"
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel
                sx={{ marginTop: "20px", fontWeight: 700 }}
                id="demo-radio-buttons-group-label"
              >
                Choose Your Time
              </FormLabel>
              <RadioGroup
                sx={{ flexDirection: "row" }}
                aria-labelledby="demo-radio-buttons-group-label"
                value={time} // Set the selected value from state
                onChange={handleTimeChange} // Handle change event and update state
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="8AM"
                  control={<Radio />}
                  label="8 AM "
                />
                <FormControlLabel
                  value="10AM"
                  control={<Radio />}
                  label="10 AM "
                />
                <FormControlLabel
                  value="2PM"
                  control={<Radio />}
                  label="2 PM "
                />
                <FormControlLabel
                  value="4PM"
                  control={<Radio />}
                  label="4 PM "
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        {/* the dailog box starts here */}

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogContent
            sx={{
              borderRadius: "100px",

              overflow: "scroll",
              "&::-webkit-scrollbar": {
                width: "0.1em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "gray",
              },
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
              Name : {data[hoveredIndex]?.name}
            </Typography>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                marginTop: "10px",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    variant="square"
                    src={data[hoveredIndex]?.profile.url}
                    sx={{
                      marginLeft: { xs: "15px", sm: "40px", md: "15px" },
                      width: {
                        xs: "200px",
                        sm: "205px",
                        md: "290px",
                        lg: "290px",
                      },
                      height: {
                        xs: "200px",
                        sm: "205px",
                        md: "290px",
                        lg: "290px",
                      },
                    }}
                  />
                }
              />
            </Card>

            <Card
              sx={{
                backgroundColor: "#ffffff",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #AD85FF, #C452BE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "30px",
                  fontFamily: "monospace",
                  fontSize: "1.25rem",
                  fontWeight: 800,
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
                      fontFamily: "monospace",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#757575",
                      marginBottom: "0.5rem",
                    }}
                    variant="h6"
                    color="textSecondary"
                    component="p"
                  >
                    Name : {data[hoveredIndex]?.name}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Email : {data[hoveredIndex]?.email}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Mobile NO : {data[hoveredIndex]?.mobile}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Location : {data[hoveredIndex]?.location}
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
                    Address : {data[hoveredIndex]?.address.addressName}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    City : {data[hoveredIndex]?.address.city}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    State : {data[hoveredIndex]?.address.state}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    PIN Code:{data[hoveredIndex]?.address.pin}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    country : {data[hoveredIndex]?.address.country}
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
                    About Me : {data[hoveredIndex]?.experience}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: "#ffffff",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #AD85FF, #C452BE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "30px",
                  fontFamily: "monospace",
                  fontSize: "1.25rem",
                  fontWeight: 800,
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
                    Service Type : {data[hoveredIndex]?.serviceType}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  ></Typography>
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
                    SUV : {data[hoveredIndex]?.suv}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Sedan : {data[hoveredIndex]?.sedan}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Hatchback : {data[hoveredIndex]?.hatchback}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                backgroundColor: "#ffffff",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #AD85FF, #CB67C6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "30px",
                  fontFamily: "monospace",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                REVIEWS
              </Typography>
              {data[hoveredIndex]?.comments != 0 ? (
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: { xs: 1, md: 3 },
                  }}
                >
                  {data[hoveredIndex]?.comments.map((comment) => (
                    <div key={comment._id}>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "monospace",
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginTop: "0.5rem",
                          paddingLeft: "10px",
                        }}
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#87AF83",
                            mr: 1,
                            width: 30,
                            height: 30,
                          }}
                        >
                          {comment.user.name.charAt(0)}
                        </Avatar>
                        <span>{comment.content}</span>
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontFamily: "revert",
                          justifyContent: "space-between",
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          color: "#9e9e9e",
                          marginTop: "0.25rem",
                          paddingLeft: "10px",
                          marginBottom: "10px",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <span style={{ marginRight: "auto" }}>
                          by {comment.user.name}
                        </span>
                        <span>
                          {format(
                            new Date(comment.createdAt),
                            "dd-MM-yyyy h:mm a"
                          )}
                        </span>
                      </Typography>
                    </div>
                  ))}
                </CardContent>
              ) : (
                <Typography
                  sx={{
                    backgroundImage:
                      "linear-gradient(to right, #B8336A, #C490D1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontFamily: "monospace",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    paddingLeft: "10px",
                  }}
                  variant="body1"
                  color="textSecondary"
                  component="p"
                >
                  No reviews...
                </Typography>
              )}
            </Card>
          </DialogContent>
        </Dialog>

        <Box
          sx={{
            marginLeft: { xs: "10px", md: "50px", lg: "100px" },
          }}
        >
          <Typography
            sx={{
              marginTop: "90px",
              fontFamily: "revert",
              fontSize: "1.25rem",
              fontWeight: 1000,
              color: "#757575",
              marginBottom: "0.5rem",
            }}
            variant="h6"
            color="textSecondary"
            component="p"
          >
            CHOOSE PROVIDERS
          </Typography>
          <Box
            className={classes.root}
            sx={{
              marginTop: "10px",
              p: 4,
            }}
          >
            <Grid container spacing={3}>
              {data.map((value, index) => (
                <Grid item xs={12} lg={6} key={value._id}>
                  <Card
                    sx={{
                      width: { lg: "435px", md: "435" },
                      backgroundColor: "#ffffff",
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          src={value.profile.url}
                          sx={{
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
                            mb: { xs: 2, md: 2 },
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
                            Name :{value.name}
                          </Typography>
                          {selectedVehicle === "suv" && (
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
                              <CurrencyRupeeIcon /> {value.suv}
                            </Typography>
                          )}
                          {selectedVehicle === "sedan" && (
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
                              <CurrencyRupeeIcon /> {value.sedan}
                            </Typography>
                          )}
                          {selectedVehicle === "hatchback" && (
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
                              <CurrencyRupeeIcon /> {value.hatchback}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Phone ={value.mobile}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Email ={value.email}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Location ={value.location}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Services ={value.serviceType}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                            {/* {userInfo ? ( */}
                            <Button
                              sx={{
                                color: "#000000",
                                backgroundColor: "#C2FFC2",
                                boxShadow: "5px 5px 15px rgba(191, 215, 234,1)",
                                width: "100px",
                                marginRight: "2.5px",
                              }}
                              onClick={() =>
                                handleBooking(
                                  value.user,
                                  value._id,
                                  selectedVehicle,
                                  serviceSelect,
                                  date,
                                  time
                                )
                              }
                            >
                              BOOK NOW
                            </Button>
                            <Button
                              sx={{
                                color: "#000000",
                                backgroundColor: "#C2C2C2",
                                boxShadow: "5px 5px 15px rgba(191, 215, 234,1)",
                                width: "100px",
                                marginLeft: "5px",
                                cursor: "auto",
                              }}
                              onClick={() => {
                                handleMouseEnter(index);
                                handleOpenDialog();
                              }}
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
      </Box>
    </>
  );
};

export default Booking;
