import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import image from "../../assets/Mustang.jpg";
const SmallBanner = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{ position: "relative" }}>
      <img
        src={image}
        alt="Placeholder"
        style={{
          width: "100%",
          maxHeight: matches ? "400px" : "none",
          maxWidth: matches ? "100%" : "none",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <Box sx={{ p: {xs:3, sm:5, lg:6} }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: matches ? "inherit" : "1rem",
              fontWeight: 800,
              color: "first.main",
            }}
          >
            We always do a spotless job.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontSize: matches ? "inherit" : "0.6rem",
              color: "second.main",
            }}
          >
            FLASH Detailing is a brand which is literally going to change the
            way people think about car cleaning. It is a unique mechanized car
            cleaning concept where cars are getting pampered by the latest
            equipments including high pressure cleaning machines, spray
            injection and extraction machines, high powered vacuum cleaners,
            steam cleaners and so on.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SmallBanner;
