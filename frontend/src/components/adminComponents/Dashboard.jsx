import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminDetailsAction } from "../../actions/adminActions";
import { useSelector } from "react-redux";
import OrdersGraph from "./ChartComponent";
import ServiceChart from "./ServiceChart";
const drawerWidth = 240;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminDetails } = useSelector((state) => state.adminDetails);

  useEffect(() => {
    dispatch(adminDetailsAction());
  }, [dispatch]);

  return (
    <Box
      component="main"
      sx={{
        marginTop: "50px",
        flexGrow: 1,
        p: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Box sx={{ bgcolor: "#ffffff", p: 1 }}>
        <Grid container spacing={2} sx={{ display: "flex" }}>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #79A1FF 0%, #ADC6FF 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
                // display: "flex",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  // color: "#757575",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                BOOKED REVENUE
              </Typography>
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1.5rem",
                  fontWeight: 1000,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                <CurrencyRupeeTwoToneIcon sx={{ color: "#FF4A4B" }} />{" "}
                {adminDetails?.Data?.hold}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #59BAC5 0%, #86CDD5 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
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
                  fontFamily: "revert",
                  fontSize: "1.5rem",
                  fontWeight: 1000,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                <CurrencyRupeeTwoToneIcon sx={{ color: "#FF4A4B" }} />{" "}
                {adminDetails?.Data?.income}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #82B08F 0%, #A2B9A2 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
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
                USERS
              </Typography>
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1.5rem",
                  fontWeight: 1000,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                <PeopleOutlineTwoToneIcon sx={{ color: "#FF4A4B" }} />{" "}
                {adminDetails?.userCount}
                {/* {adminDetails.hold} */}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #C087AE 0%, #CEA1C0 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
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
                PROVIDERS
              </Typography>
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1.5rem",
                  fontWeight: 1000,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                <PersonSearchTwoToneIcon sx={{ color: "#FF4A4B" }} />{" "}
                {adminDetails?.providerCount}
                {/* {adminDetails.hold} */}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        {/* newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww */}
        <Grid container spacing={2} sx={{ display: "flex" }}>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #79A1FF 0%, #ADC6FF 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
                // display: "flex",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                COMPLETED ORDERS : {adminDetails?.completedOrders}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #59BAC5 0%, #86CDD5 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                PENDING ORDERS : {adminDetails?.pendingOrders}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #82B08F 0%, #A2B9A2 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                SERVICE COUNT : {adminDetails?.serviceCount}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Card
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #C087AE 0%, #CEA1C0 100%)",
                boxShadow: "2px 2px 15px rgba(150, 133, 121)",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "revert",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  paddingLeft: "10px",
                }}
                variant="h6"
                color="textSecondary"
                component="p"
              >
                PROVIDERS REQUESTS : {adminDetails?.providerRequests}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Card
            sx={{
              backgroundColor: "#ffffff",
              marginTop: "10px",
              marginLeft: { sm: "25px", md: "25px" },
              width: { xs: "350px", sm: "350px", md: "400px", lg: "500px" },
              height: { xs: "450px", sm: "450px", md: "500px", lg: "600px" },
            }}
          >
            <Typography
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#957777",
                fontFamily: "fantasy",
                fontSize: "20px",
              }}
            >
              CATEGORY
            </Typography>
            <ServiceChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card
            sx={{
              alignItems: "center",
              marginLeft: { sm: "25px", md: "30px" },
              backgroundColor: "#ffffff",
              marginTop: "10px",
              width: { xs: "350px", sm: "550px", md: "600px", lg: "700px" },
              height: { xs: "450px", sm: "500px", md: "550px", lg: "600px" },
            }}
          >
            <Typography
              sx={{
                marginTop: "10px",
                marginBottom: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#957777",
                fontFamily: "fantasy",
                fontSize: "20px",
              }}
            >
              DAILY ORDERS
            </Typography>
            <OrdersGraph />
          </Card>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
