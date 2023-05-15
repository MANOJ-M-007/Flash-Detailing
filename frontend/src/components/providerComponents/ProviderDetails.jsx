import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { providerReq } from "../../actions/providerAction";
import {
  usersServiceListAction,
  usersLocationsListAction,
} from "../../actions/userActions";

const ProviderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [washMethod, setWashMethod] = useState("");
  const [describe, setDescribe] = useState("");
  const [suv, setSuv] = useState("");
  const [sedan, setSedan] = useState("");
  const [hatchback, setHatchback] = useState("");
  const [aadhar, setAadhar] = useState([]);
  const [profile, setProfile] = useState([]);
  const handleImage1 = (e) => {
    const file1 = e.target.files[0];
    setFileToBase1(file1);
  };
  const setFileToBase1 = (file) => {
    const reader1 = new FileReader();
    reader1.readAsDataURL(file);
    reader1.onloadend = () => {
      setAadhar(reader1.result);
    };
  };
  const handleImage2 = (e) => {
    const file2 = e.target.files[0];
    setFileToBase2(file2);
  };
  const setFileToBase2 = (file) => {
    const reader2 = new FileReader();
    reader2.readAsDataURL(file);
    reader2.onloadend = () => {
      setProfile(reader2.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !location ||
      !address ||
      !city ||
      !state ||
      !pin ||
      !country ||
      !washMethod ||
      !describe ||
      !suv ||
      !sedan ||
      !hatchback ||
      !aadhar ||
      !profile
    )
      return;
    dispatch(
      providerReq(
        location,
        address,
        city,
        state,
        pin,
        country,
        washMethod,
        describe,
        suv,
        sedan,
        hatchback,
        aadhar,
        profile
      )
    );
    navigate("/");
  };

  /// wash type show
  const serviceslist = useSelector((state) => state.userServiceList);
  const { services } = serviceslist;
  /// locations
  const locationlist = useSelector((state) => state.userLocationsList);
  const { locations } = locationlist;
  useEffect(() => {
    dispatch(usersServiceListAction());
    dispatch(usersLocationsListAction());
  }, [dispatch]);
  return (
    <Box
      sx={{
        padding: "40px",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: "8px",
          boxShadow: "5px 5px 40px rgba(0.1, 0.1, 0.1, 0.3)",
          backgroundColor: "#F5EBEB",
          maxWidth: { lg: "900px", md: "700px" }, // Add this line to limit the width in lg screens
          mx: "auto", // Center the form horizontally
        }}
      >
        <Typography variant="h6" gutterBottom>
          DETAILS
        </Typography>

        <Grid
          container
          spacing={3}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="location-label">Choose Location</InputLabel>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                labelId="location-label"
                id="Location"
                name="Location"
                label="Location"
                defaultValue=""
                required
                autoComplete=""
              >
                {locations.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value.location}>
                      {value.location}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              id="address1"
              name="address1"
              label="Address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="city address-line1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              id="state"
              name="state"
              label="State"
              fullWidth
              autoComplete="state "
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              id="Zip"
              name="Zip"
              label="PIN Code"
              fullWidth
              autoComplete="Zip "
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              id="Country"
              name="Country"
              label="Country"
              fullWidth
              autoComplete="Country "
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="service-label">Washing Method</InputLabel>
              <Select
                value={washMethod}
                onChange={(e) => setWashMethod(e.target.value)}
                labelId="service-label"
                id="service"
                name="service"
                label="service"
                defaultValue=""
                required
                autoComplete=""
              >
                {services.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value.serviceName}>
                      {value.serviceName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              required
              id="describe"
              name="describe"
              label="Describe Yourself"
              fullWidth
              autoComplete="Describe Yourself"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              value={suv}
              onChange={(e) => setSuv(e.target.value)}
              required
              id="suv"
              name="suv"
              label="Charges For SUV"
              fullWidth
              autoComplete="suv"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={sedan}
              onChange={(e) => setSedan(e.target.value)}
              required
              id="sedan"
              name="sedan"
              label="Charges For Sedan"
              fullWidth
              autoComplete="sedan"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              value={hatchback}
              onChange={(e) => setHatchback(e.target.value)}
              required
              id="hatchback"
              name="hatchback"
              label="Charges For Hatchback"
              fullWidth
              autoComplete="hatchback"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ marginTop: "5px" }} htmlFor="upload-image">
              Upload aadhar card
            </InputLabel>
            <Input
              onChange={handleImage1}
              type="file"
              id="upload-image"
              name="uploadImage"
              fullWidth
              autoComplete="upload-image"
              sx={{
                height: "55px",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                "&:hover": {
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel sx={{ marginTop: "5px" }} htmlFor="upload-image">
              Upload Profile
            </InputLabel>
            <Input
              onChange={handleImage2}
              type="file"
              id="upload-image"
              name="uploadImage"
              fullWidth
              autoComplete="upload-image"
              sx={{
                height: "55px",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                "&:hover": {
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                },
              }}
            />
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <Button variant="outlined" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProviderDetails;
