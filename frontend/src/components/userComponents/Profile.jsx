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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { providerDetailsAction } from "../../actions/providerAction";
import {
  userDetailsAction,
  userAddressAddAction,
  profileEditAction,
} from "../../actions/userActions";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";

const Profile = () => {
  //for show details
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.userDetails);
  /// for add address dailog box
  const { addressAddSuccess } = useSelector((state) => state.userAddressAdd);

  const { providerDetails } = useSelector((state) => state.providerDetails);

  const { profileEditSuccess } = useSelector((state) => state.profileEditData);
  //add address
  const [addressName, setAddressName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  //edit profile

  const [name2, setName2] = useState();
  const [email2, setEmail2] = useState();
  const [mobile2, setMobile2] = useState();
  const [password2, setPassword2] = useState();
  const [addressName2, setAddressName2] = useState();
  const [city2, setCity2] = useState();
  const [state2, setState2] = useState();
  const [pin2, setPin2] = useState();
  const [country2, setCountry2] = useState();

  const resetHandler = () => {
    setAddressName("");
    setCity("");
    setState("");
    setPin("");
    setCountry("");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetHandler();
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (!addressName || !city || !state || !pin || !country) return;
    const Data = { addressName, city, state, pin, country };
    dispatch(userAddressAddAction(Data));
    handleClose();
    resetHandler();
  };

  //edit profile
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    resetHandler();
    setOpen2(false);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    // Handle form submission here
    const Data = {
      name2,
      email2,
      mobile2,
      password2,
      addressName2,
      city2,
      state2,
      pin2,
      country2,
    };
    dispatch(profileEditAction(Data));
    handleClose2();
  };

  useEffect(() => {
    dispatch(providerDetailsAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch, addressAddSuccess, profileEditSuccess]);

  return (
    <div>
      <Card
        sx={{
          height: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "5px 5px 15px rgb(86, 74, 74)",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Dialog open={open2} onClose={handleClose2}>
          <DialogTitle>ADD ADDRESS HERE</DialogTitle>
          <form onSubmit={handleSubmit2}>
            <DialogContent>
              <TextField
                name="name"
                label="Name"
                defaultValue={userDetails?.name}
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="Email"
                defaultValue={userDetails?.email}
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="Mobile"
                defaultValue={userDetails?.mobile}
                value={mobile2}
                onChange={(e) => setMobile2(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="Home"
                defaultValue={userDetails?.address?.addressName}
                value={addressName2}
                onChange={(e) => setAddressName2(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="City"
                    defaultValue={userDetails?.address?.city}
                    value={city2}
                    onChange={(e) => setCity2(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="Pin"
                    defaultValue={userDetails?.address?.pin}
                    value={pin2}
                    onChange={(e) => setPin2(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="State"
                    defaultValue={userDetails?.address?.state}
                    value={state2}
                    onChange={(e) => setState2(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="Country"
                    defaultValue={userDetails?.address?.country}
                    value={country2}
                    onChange={(e) => setCountry2(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="warning">
                Cancel
              </Button>
              <Button type="submit" color="success">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>EDIT YOUR DETAILS</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                name="name"
                label="Home"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="Pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                name="name"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="warning">
                Cancel
              </Button>
              <Button type="submit" color="success">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
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
                    <AccountCircleIcon
                      sx={{ color: "#AA77FF", marginBottom: "10px" }}
                    />
                    {userDetails?.role === "provider" ? (
                      <CardHeader
                        avatar={
                          <Avatar
                            variant="square"
                            src={providerDetails?.profile?.url}
                            sx={{
                              boxShadow: "4px 4px 5px rgba(190, 133, 255,.5)",
                              width: {
                                xs: "100px",
                                sm: "150px",
                                md: "200px",
                                lg: "250px",
                              },
                              height: {
                                xs: "100px",
                                sm: "150px",
                                md: "200px",
                                lg: "250px",
                              },
                            }}
                          />
                        }
                      />
                    ) : null}
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
                      NAME : {userDetails?.name}
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
                      EMAIL : {userDetails?.email}
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
                      MOBILE NO : {userDetails?.mobile}
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
                      LOCATION : {userDetails?.location}
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
                          marginTop: "35px",
                          backgroundColor: "#C2FFC2",
                          boxShadow: "5px 5px 15px rgba(191, 215, 234,1)",
                          width: "100px",
                          marginRight: "2.5px",
                        }}
                        onClick={handleOpen2}
                      >
                        EDIT
                      </Button>
                    </div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

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
                    {userDetails?.role === "provider" ? (
                      <Card
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #79A1FF 0%, #B999FF 100%)",
                          boxShadow: "1px 1px 5px rgba(204, 204, 204)",
                          marginBottom: "100px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "revert",
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            color: "#ffffff",
                            marginBottom: "0.5rem",
                            paddingLeft: "10px",
                          }}
                          variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          REVENUE
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "inherit",
                            fontWeight: "bold",
                            fontSize: "40px",
                            color: "#ffffff",
                            marginBottom: "0.5rem",
                            paddingLeft: "10px",
                          }}
                          variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          <CurrencyRupeeTwoToneIcon
                            sx={{
                              color: "#FFE500",
                              fontWeight: "bold",
                              fontSize: "48px",
                            }}
                          />{" "}
                          {providerDetails?.income}
                        </Typography>
                      </Card>
                    ) : (
                      ""
                    )}
                    <MapsHomeWorkIcon
                      sx={{ color: "#AA77FF", marginBottom: "10px" }}
                    />
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
                        lineHeight: "1.5",
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
                        lineHeight: "1.5",
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
                        lineHeight: "1.5",
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
                        lineHeight: "1.5",
                      }}
                    >
                      COUNTRY : {userDetails?.address?.country}
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
                          backgroundColor: "#D1D0DC",
                          boxShadow: "5px 5px 15px rgba(191, 215, 234,1)",
                          width: "150px",
                          marginLeft: "10px",
                        }}
                        onClick={handleOpen}
                      >
                        ADD ADDRESS
                      </Button>
                    </div>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Profile;
