import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import apiCalls from "../../EndPoints/userApiCalls";
import userApiCalls from "../../EndPoints/userApiCalls";

//////pagenation
const rowsPerPageOptions = [5, 10, 25];

const OrdersList = () => {
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
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    async function handleOrders() {
      const Data = await apiCalls.listOrders(userInfo);
      setOrders(Data);
    }
    handleOrders();
  }, []);

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

  ///Dialog box for comment
  const [provider, setProvider] = useState();
  const [comment, setComment] = useState("");
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => {
    setOpen2(true);
  };

  const resetHandler = () => {
    setComment("");
    setOpen2(false);
  };

  const handleClose = () => {
    resetHandler();
    setOpen2(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(provider);

    if (!comment) return;
    const Data = await apiCalls.addComment(comment, provider, userInfo);
    toast.error(Data.data.message);
    toast.success(Data.data.messageSuccess);
    handleClose();
  };

  const handleChat = async (senderId) => {
    const Data = await userApiCalls.createChat(userInfo?._id, senderId);
    if (Data?.members?.length === 2) {
      navigate(`/chat?receiverId=${senderId}`);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
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
            Name : {orders[hoveredIndex]?.providerId.user.name}
          </Typography>
          <Card
            sx={{
              backgroundColor: "#ffffff",
              marginTop: "10px",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  variant="square"
                  src={orders[hoveredIndex]?.providerId.profile.url}
                  sx={{
                    marginLeft: { xs: "15px", sm: "40px", md: "15px" },
                    width: {
                      xs: "200px",
                      sm: "205px",
                      md: "290px",
                      lg: "290px",
                    },
                    height: {
                      xs: "200px",
                      sm: "205px",
                      md: "290px",
                      lg: "290px",
                    },
                  }}
                />
              }
            />
          </Card>

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
                  Name : {orders[hoveredIndex]?.providerId.user.name}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Email : {orders[hoveredIndex]?.providerId.user.email}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Mobile NO : {orders[hoveredIndex]?.providerId.user.mobile}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Location : {orders[hoveredIndex]?.providerId.user.location}
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
                  Address :{" "}
                  {orders[hoveredIndex]?.providerId.user.address.addressName}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  City : {orders[hoveredIndex]?.providerId.user.address.city}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  State : {orders[hoveredIndex]?.providerId.user.address.state}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  PIN Code:{orders[hoveredIndex]?.providerId.user.address.pin}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  country :{" "}
                  {orders[hoveredIndex]?.providerId.user.address.country}
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
                  About Me : {orders[hoveredIndex]?.providerId.experience}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <Dialog open={open2} onClose={handleClose}>
        <DialogTitle>ADD YOUR REVIEWS HERE</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="comment"
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <>
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
                <>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "7%" }}>SL NO</TableCell>
                      <TableCell sx={{ width: "10%" }}>IMAGE</TableCell>
                      <TableCell sx={{ width: "13%" }}>PROVIDER</TableCell>
                      <TableCell sx={{ width: "13%" }}>SERVICE</TableCell>
                      <TableCell sx={{ width: "10%" }}>VEHICLE</TableCell>
                      <TableCell sx={{ width: "9%" }}>TOTAL</TableCell>
                      <TableCell sx={{ width: "11%" }}>DATE</TableCell>
                      <TableCell sx={{ width: "6%" }}>TIME</TableCell>
                      <TableCell sx={{ width: "7%" }}>STATUS</TableCell>
                      <TableCell sx={{ width: "4%" }}>INFO</TableCell>
                      <TableCell sx={{ width: "4%" }}>CHAT</TableCell>
                      <TableCell sx={{ width: "4%" }}>REVIEW</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredOrders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((order, index) => (
                        <TableRow key={order._id}>
                          <TableCell>
                            {index + 1 + page * rowsPerPage}
                          </TableCell>
                          <img
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "20px",
                              maxWidth: "100%",
                              objectFit: "cover",
                            }}
                            src={order.providerId.profile.url}
                            alt="services"
                          />
                          <TableCell>{order.providerId.user.name}</TableCell>
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
                              sx={{
                                boxShadow: "1px 1px 5px rgb(66, 105, 213)",
                              }}
                              variant="contained"
                              color="primary"
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
                                handleChat(order?.providerId?.user?._id);
                              }}
                            >
                              <ChatTwoToneIcon />
                            </IconButton>
                          </TableCell>
                          {order.status === "completed" ? (
                            <TableCell>
                              <IconButton
                                sx={{
                                  boxShadow: "1px 1px 5px rgb(60, 159, 76)",
                                  color: "#3C9F4C",
                                }}
                                variant="contained"
                                onClick={() => {
                                  handleOpen();
                                  setProvider(order.providerId._id);
                                }}
                              >
                                <RateReviewTwoToneIcon />
                              </IconButton>
                            </TableCell>
                          ) : (
                            ""
                          )}
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={2} />
                      </TableRow>
                    )}
                  </TableBody>
                </>
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
      </>
    </>
  );
};

export default OrdersList;
