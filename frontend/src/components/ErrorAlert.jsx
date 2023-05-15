import { Alert } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ErrorAlert = ({ children }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="outlined" severity="error">
        <h6 sx={{ color: "red" }}>{children}</h6>
      </Alert>
    </Stack>
  );
};

export default ErrorAlert;
