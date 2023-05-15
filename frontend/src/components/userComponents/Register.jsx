import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image from "../../assets/background.jpg";
import { useState } from "react";
import Loading from "../Loading";
import ErrorAlert from "../ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

//for otp
import OtpInput from "otp-input-react";
import { auth } from "../../utility/firebaseConfig";
import { toast, Toaster } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect } from "react";

const theme = createTheme();

const Register = () => {
  const Navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [Otploading, setOtploading] = useState(false);

  /////for register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const{error,userInfo} = userRegister; 
  ////for OTP

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup(event) {
    event.preventDefault();
    setOtploading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + mobile;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtploading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setOtploading(false);
      });
  }

  function onOTPVerify() {
    setOtploading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setShowOTP(false);
        handleSubmit();
      })
      .catch((err) => {
        console.log(err);
        setOtploading(false);
      });
  }

  useEffect(() => {
    if (userInfo) {
      Navigate("/");
    }
  }, [userInfo,Navigate]);

  //for register
  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmpassword|| !mobile) {
      setMessage("All fields are mandatory");
      return;
    }
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(name, email,mobile, password));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: "1rem",
        }}
      >
        <div id="recaptcha-container"></div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Toaster toastOptions={{ duration: 4000 }} />

          {showOTP ? (
            <Box
              sx={{
                marginTop: 25,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 2,
                backgroundImage:
                  "linear-gradient(to bottom right, #ced4da, #635985)",
                padding: "2rem",
                borderRadius: "0.5rem",
              }}
            >
              {Otploading ? (
                <Loading />
              ) : (
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              )}
              <Typography component="h1" variant="h5">
                OTP
              </Typography>

              <Grid
                container
                sx={{
                  marginTop: ["20px", "30px"], // responsive margin top
                  justifyContent: "center",
                  marginLeft: "20px",
                  alignItems: "center",
                }}
              >
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                  sx={{
                    color: "#635985",
                    width: ["70%", "50%", "40%"], // responsive width
                    margin: ["10px 0", "10px", "0"], // responsive margin
                  }}
                ></OtpInput>
              </Grid>

              <Button
                onClick={onOTPVerify}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify OTP
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 2,
                backgroundImage:
                  "linear-gradient(to bottom right, #ced4da, #635985)",
                padding: "2rem",
                borderRadius: "0.5rem",
              }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              {/* )} */}
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              {message ? <ErrorAlert>{message}</ErrorAlert> : ""}
              {error ? <ErrorAlert>{error}</ErrorAlert> : ""}
              <Box
                component="form"
                noValidate
                onSubmit={onSignup}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="given-name"
                      name="Name"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      name="mobile"
                      autoComplete="mobile"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={confirmpassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirm Password"
                      type="password"
                      id="confirm-password"
                      autoComplete="confirm-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
