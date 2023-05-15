import React, { useEffect } from "react";
import { Box } from "@mui/system";
import MainBanner from "../../assets/Banner1.jpg";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { usersServiceListAction } from "../../actions/userActions";
import { bannerSearchServiceAction , userDetailsAction} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";


const Banner = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceslist = useSelector((state) => state.userServiceList);
  const { services } = serviceslist;
  
  const options = services.map((data) => ({
    label: data.serviceName,
  }));

  //location
  const selectedLocation = JSON.parse(localStorage.getItem('selectedLocation')) || 'null'

   const handleServicesChange = (event, service) => {
     dispatch(bannerSearchServiceAction(service,selectedLocation));
     navigate('/booking')
   };

  
  useEffect(() => {
    dispatch(usersServiceListAction(selectedLocation));
  }, [dispatch]);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);

  return (
    <>
      <Box
       sx={{ position: "relative" }}>
        <Box
          component="img"
          src={MainBanner}
          alt="banner-main"
          sx={{
            filter: "brightness(80%)",
            maxWidth: "100%",
            width: "100%",
            objectFit: "cover",
            marginTop: { xs: 0.1, sm: 0.1, md: 0.1, lg: 0.1 },
            height: { xs: 400, sm: 500, md: "auto", lg: "auto" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50%", sm: "50%", md: "50%", lg: "50%" },
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: { xs: "70%", sm: "60%", md: "50%", lg: "50%" },
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: 2,
            p: 1,
          }}
        >
            <Autocomplete
              fullWidth
              id="services"
              onChange={handleServicesChange}
              options={options}
              getOptionLabel={(option) => option.label}
              sx={{
                width: {xs :'200px',sm:'350px',md:'450px',lg:'600px'},
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiPaper-root": {
                  border: "none",
                },
                marginRight:
                  "10px" /* Remove the border of the Autocomplete component */,
                "& .MuiAutocomplete-inputRoot": {
                  // height: 40,
                  border: "none" /* Remove the border of the input field */,
                },
                "& .MuiAutocomplete-listbox": {
                  // height: 200,
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
              renderInput={(params) => <TextField {...params} 
              label="Search Services"
               />}
            />
        </Box>
      </Box>
    </>
  );
};

export default Banner;
