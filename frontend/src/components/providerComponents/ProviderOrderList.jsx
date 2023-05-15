import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { format } from "date-fns";
import Paper from "@mui/material/Paper";
import apiCalls from "../../EndPoints/providerApiCall";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";

//////otp
import OtpInput from "otp-input-react";
import Loading from "../Loading";
import { auth } from "../../utility/firebaseConfig";
import { toast, Toaster } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import userApiCalls from "../../EndPoints/userApiCalls";
import { useNavigate } from "react-router-dom";

//////pagenation
const rowsPerPageOptions = [5, 10, 25];

const ProviderOrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const [activeButton, setActiveButton] = useState("completed");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filteredOrders = orders.filter((order) =>
    activeButton === "completed"
      ? order.status === "completed"
      : order.status === "Booked"
  );

  const [oid, setOid] = useState();
  const { userInfo } = useSelector((state) => state.userLogin);

  async function orderStatus(Oid) {
    const orderSuccess = await apiCalls.orderComplete(userInfo, Oid);
    setOrderstatus1(orderSuccess);
  }
  const [orderStatus1, setOrderstatus1] = useState(false);
  //for OTP
  const [showOTP, setShowOTP] = useState("");
  const [otp, setOtp] = useState("");
  const [Otploading, setOtploading] = useState(false);

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

  function onSignup(mobile) {
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
        setOtploading(false);
      });
  }

  function onOTPVerify() {
    setOtploading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setShowOTP(false);
        orderStatus(oid);
      })
      .catch((err) => {
        setOtploading(false);
      });
  }

  useEffect(() => {
    async function handleOrders() {
      const Data = await apiCalls.listOrders(userInfo);
      setOrders(Data);
    }
    handleOrders();
  }, [!orderStatus1]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  /// Dailog box for provider details
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleChat = async (senderId) => {
    const Data = await userApiCalls.createChat(senderId, userInfo?._id);
    if (Data?.members?.length === 2) {
      navigate(`/chat?receiverId=${senderId}`);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      {/* Dailog box starts here */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent
          sx={{
            borderRadius: "100px",

            overflow: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.1em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray",
            },
          }}
        >
          <Card
            sx={{
              backgroundColor: "#ffffff",
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{
                marginTop: "30px",
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
              PERSONAL DETAILS
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
                  minHeight: "596px",
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
                  Name : {orders[hoveredIndex]?.userId.name}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Email : {orders[hoveredIndex]?.userId.email}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Mobile NO : {orders[hoveredIndex]?.userId.mobile}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Location : {orders[hoveredIndex]?.userId.location}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "3",
                    fontSize: "1rem",
                    fontWeight: 650,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "310px",
                  }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Address : {orders[hoveredIndex]?.userId.address.addressName}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  City : {orders[hoveredIndex]?.userId.address.city}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  State : {orders[hoveredIndex]?.userId.address.state}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  PIN Code:{orders[hoveredIndex]?.userId.address.pin}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  country : {orders[hoveredIndex]?.userId.address.country}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "30px",
                    fontFamily: "revert",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#757575",
                    marginBottom: "0.5rem",
                    paddingLeft: "10px",
                  }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  ORDER DETAILS
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "3",
                    fontSize: "1rem",
                    fontWeight: 650,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "310px",
                  }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Vehicle Type : {orders[hoveredIndex]?.vehicleType}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "3",
                    fontSize: "1rem",
                    fontWeight: 650,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "310px",
                  }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Date : {orders[hoveredIndex]?.date}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "3",
                    fontSize: "1rem",
                    fontWeight: 650,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "310px",
                  }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Time : {orders[hoveredIndex]?.time}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "3",
                    fontSize: "1rem",
                    fontWeight: 650,
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "310px",
                  }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Total : {orders[hoveredIndex]?.total}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* otp  */}
      <Box
        sx={{
          alignItems: "center",
        }}
      >
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {showOTP ? (
          <Box
            sx={{
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
          ""
        )}
        {/* table starts here */}
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "5px 5px 15px rgb(86, 74, 74)",
            borderRadius: "8px",
            overflowX: "auto",
            maxWidth: "1200px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "revert-layer",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#339",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginLeft: "15px",
            }}
          >
            Orders
          </Typography>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => handleButtonClick("completed")}
                style={{
                  backgroundColor:
                    activeButton === "completed" ? "#788E78" : "#FFFFFF",
                  color: activeButton === "completed" ? "#FFFFFF" : "#000000",
                  borderRadius: "2",
                  transition: "background-color .8s ease",
                }}
              >
                Completed
              </Button>
              <Button
                onClick={() => handleButtonClick("pending")}
                style={{
                  backgroundColor:
                    activeButton === "pending" ? "#788E78" : "#FFFFFF",
                  color: activeButton === "pending" ? "#FFFFFF" : "#000000",
                  borderRadius: "2",
                  transition: "background-color .8s ease",
                }}
              >
                Pending
              </Button>
            </Box>
            <Box>
              <Table
                sx={{
                  minWidth: 450,
                  maxWidth: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "9%" }}>SL NO</TableCell>
                    <TableCell sx={{ width: "11%" }}>USER</TableCell>
                    <TableCell sx={{ width: "13%" }}>EMAIL</TableCell>
                    <TableCell sx={{ width: "12%" }}>SERVICE</TableCell>
                    <TableCell sx={{ width: "8%" }}>VEHICLE</TableCell>
                    <TableCell sx={{ width: "10%" }}>TOTAL</TableCell>
                    <TableCell sx={{ width: "10%" }}>DATE</TableCell>
                    <TableCell sx={{ width: "7%" }}>TIME</TableCell>
                    <TableCell sx={{ width: "6%" }}>STATUS</TableCell>
                    <TableCell sx={{ width: "6%" }}>INFO</TableCell>
                    <TableCell sx={{ width: "4%" }}>CHAT</TableCell>
                    <TableCell sx={{ width: "4%" }}>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order, index) => (
                      <TableRow key={order._id}>
                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell>{order.userId.name}</TableCell>
                        <TableCell>{order.userId.email}</TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.vehicleType}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          {format(new Date(order.date), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell
                          sx={{
                            color:
                              order.status === "completed" ? "green" : "red",
                          }}
                        >
                          {order.status}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            variant="contained"
                            color="primary"
                            sx={{ boxShadow: "1px 1px 5px rgb(66, 105, 213)" }}
                            onClick={() => {
                              handleMouseEnter(index);
                              handleOpenDialog();
                            }}
                          >
                            <InfoTwoToneIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            sx={{
                              boxShadow: "1px 1px 5px rgb(59, 199, 206)",
                              color: "#3bc7ce",
                            }}
                            onClick={() => {
                              handleChat(order?.userId?._id);
                            }}
                          >
                            <ChatTwoToneIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {order.status === "Booked" ? (
                            <IconButton
                              variant="contained"
                              sx={{
                                boxShadow: "1px 1px 5px rgb(60, 159, 76)",
                                color: "#3C9F4C",
                              }}
                              onClick={() => {
                                setOid(order._id);
                                onSignup(order.userId.mobile);
                              }}
                            >
                              <CheckCircleOutlineTwoToneIcon />
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={2} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Box>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default ProviderOrderList;
