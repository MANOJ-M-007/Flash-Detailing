import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image from "../../assets/Banner1.jpg";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/adminActions";
const theme = createTheme();

const Login = () => {

  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin;


  useEffect(() => {
    // const userInfo = localStorage.getItem("userInfo");
    if (adminInfo) {
      Navigate("/admin/dashboard");
    }
  }, [adminInfo, Navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          // padding: "1rem",
          
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            filter: "brightness(40%)",
            zIndex: -1,
          }}
        />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 10,
              // backgroundColor: "white",
              backgroundImage:
                "linear-gradient(to bottom right, #AA77FF, #62CDFF)",
              borderRadius: "0.5rem",
              padding: "2rem",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            )}
            <Typography component="h1" variant="h5">
              Admin Sign in
            </Typography>
            {error ? <ErrorAlert>{error}</ErrorAlert> : ""}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {/* <Link to="/admin/dashboard"> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              {/* </Link> */}
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to ='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default Login;
