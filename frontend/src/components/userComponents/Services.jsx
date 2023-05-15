import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { DialogContent, DialogTitle, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Dialog,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  usersServiceListAction,
  bannerSearchServiceAction,
} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceslist = useSelector((state) => state.userServiceList);
  const { services } = serviceslist;

  useEffect(() => {
    dispatch(usersServiceListAction());
  }, [dispatch]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const selectedLocation =
    JSON.parse(localStorage.getItem("selectedLocation")) || "null";
  const [isDispatched, setIsDispatched] = useState(false);
  const handleServicesChange = (service) => {
    dispatch(bannerSearchServiceAction({ label: service }, selectedLocation));
    setIsDispatched(true);
  };
  useEffect(() => {
    if (isDispatched) {
      navigate("/booking");
    }
  }, [navigate, isDispatched]);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Typography
          variant="h5"
          color="GrayText"
          fontWeight={{ xs: 600 }}
          mt={{ xs: 1, sm: 1.3, md: 1.6, lg: 2 }}
        >
          OUR SERVICES
        </Typography>
      </Stack>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: 2 }}
      >
        {services.map((value, index) => {
          return (
            <Grid xs={12} sm={6} item key={index} sx={{ borderRadius: 3 }}>
              <Card
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  position: "relative",
                  margin: "20px",
                  borderRadius: 3,
                  bgcolor: "white",
                  color: "#343a40",
                }}
              >
                <CardMedia
                  image={value.image.url}
                  sx={{
                    height: { xs: 150, sm: 150 },
                    opacity: hoveredIndex === index ? 0.8 : 1,
                  }}
                />

                {hoveredIndex === index && (
                  <CardActions
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Button
                      onClick={() => handleServicesChange(value.serviceName)}
                      variant="contained"
                      color="inherit"
                      sx={{ width: 80 }}
                    >
                      Book
                    </Button>

                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ width: 80 }}
                      onClick={handleOpenDialog}
                    >
                      Details
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleCloseDialog}
                      PaperProps={{
                        style: {
                          backgroundColor: "#f2f2f2",
                          borderRadius: 10,
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <DialogTitle
                        sx={{
                          textAlign: "center",
                          color: "#6B66A3",
                          fontFamily: "cursive",
                          fontWeight: 800,
                          fontSize: "1.5rem",
                          letterSpacing: 2,
                        }}
                      >
                        {value.serviceName}
                      </DialogTitle>
                      <DialogContent style={{ paddingBottom: 20 }}>
                        <Typography style={{ fontSize: 16 }}>
                          <ul>
                            {/* {value.serviceDetails} */}
                            {value.serviceDetails
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line
                                    .split("+")
                                    .map(
                                      (part, index) =>
                                        part.trim() && (
                                          <li key={index}>{part.trim()}</li>
                                        )
                                    )}
                                </React.Fragment>
                              ))}
                          </ul>
                        </Typography>
                      </DialogContent>
                    </Dialog>
                  </CardActions>
                )}
                <CardContent>
                  <Typography
                    color="chocolate"
                    variant="h6"
                    fontWeight={{ xs: 550 }}
                  >
                    {value.serviceName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* for details */}
    </>
  );
};

export default Services;
