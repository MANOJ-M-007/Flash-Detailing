import React from "react";

const Address = () => {
  return (
    <div>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "5px 5px 15px rgb(86, 74, 74)",
          alignItems: "center",
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
          ADDRESS
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
              HOME : {userInfo.name}
            </Typography>
            <Typography
              sx={{
                lineHeight: "3",
                fontSize: "1rem",
                fontWeight: 600,
              }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Email : {userInfo.email}
            </Typography>
            <Typography
              sx={{
                lineHeight: "3",
                fontSize: "1rem",
                fontWeight: 600,
              }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Mobile NO : {userInfo.mobile}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Address;
