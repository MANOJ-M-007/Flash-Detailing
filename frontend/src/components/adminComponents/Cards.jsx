import React, { useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Card, CardMedia, CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Card1 from "../../assets/silver-wash.jpg";
import Card2 from "../../assets/gold-wash.jpg";
import Card3 from "../../assets/platinum-wash.jpg";
import Card4 from "../../assets/internal-clean.jpg";
import Card5 from "../../assets/rubbing.jpg";
import Card6 from "../../assets/teflon-coating.jpg";
const Cards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const cardNames = [
    { name: "silver-wash", image: Card1 },
    { name: "gold-wash", image: Card2 },
    { name: "platinum-wash", image: Card3 },
    { name: "internal-clean", image: Card4 },
    { name: "rubbing", image: Card5 },
    { name: "teflon-coating", image: Card6 },
  ];

  return (
    <>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: 1 }}
      >
        {cardNames.map((value, index) => {
          return (
            <Grid
              xs={12}
              sm={6}
              lg={4}
              item
              key={index}
              sx={{ borderRadius: 5 }}
            >
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
                  image={value.image}
                  sx={{
                    height: { xs: 200, sm: 250 },
                    opacity: hoveredIndex === index ? 0.8 : 1,
                  }}
                />

                {hoveredIndex === index && (
                  <CardActions
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Button variant="contained" color="inherit">
                      Book Now
                    </Button>
                  </CardActions>
                )}
                <CardContent>
                  <Typography
                    color="chocolate"
                    variant="h6"
                    fontWeight={{ xs: 550 }}
                  >
                    {value.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Cards;
