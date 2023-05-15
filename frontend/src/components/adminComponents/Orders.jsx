import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Loading from "../Loading";
import { ordersListAction } from "../../actions/adminActions";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import { format } from "date-fns";
//////pagenation
const rowsPerPageOptions = [5, 10, 25];

const drawerWidth = 240;
const Orders = () => {
  const dispatch = useDispatch();
  const { orders, ordersLoading } = useSelector((state) => state.ordersList);
  ///pagenation
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

  useEffect(() => {
    dispatch(ordersListAction());
  }, [dispatch]);
  /// Dailog box for provider details
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

  return (
    <Box
      component="main"
      sx={{
        marginTop: "50px",
        flexGrow: 1,
        p: 3,
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      {/* Dailog box starts here */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogContent
          sx={{
            borderRadius: "50px",

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
            SERVICE PROVIDER : {orders[hoveredIndex]?.providerId.user.name}
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
              PROVIDER DETAILS
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
                  Address :
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
                  country :
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
          {/* userDetails */}
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
              USER DETAILS
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
                  minHeight: "460px",
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
                  Address :{orders[hoveredIndex]?.userId.address.addressName}
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
                  country :{orders[hoveredIndex]?.userId.address.country}
                </Typography>
              </Box>
            </CardContent>
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
              ORDER DETAILS
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
                  minHeight: "460px",
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
                  Service : {orders[hoveredIndex]?.service}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Vehicle Type : {orders[hoveredIndex]?.vehicleType}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Date: {orders[hoveredIndex]?.date}
                </Typography>
                <Typography
                  sx={{ lineHeight: "3", fontSize: "1rem", fontWeight: 600 }}
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
                  TOTAL:
                  <CurrencyRupeeTwoToneIcon
                    sx={{ height: "15px", color: "#E0D500" }}
                  />
                  {orders[hoveredIndex]?.total}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* table starts here */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
          borderRadius: "8px",
          overflowX: "auto",
          maxWidth: "1210px",
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
        {/* {servicesError && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
        {ordersLoading ? <Loading /> : ""}
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
              <TableCell sx={{ width: "13%" }}>USER</TableCell>
              <TableCell sx={{ width: "13%" }}>PROVIDER</TableCell>
              <TableCell sx={{ width: "13%" }}>SERVICE</TableCell>
              <TableCell sx={{ width: "12%" }}>TOTAL</TableCell>
              <TableCell sx={{ width: "12%" }}>DATE</TableCell>
              <TableCell sx={{ width: "12%" }}>TIME</TableCell>
              <TableCell sx={{ width: "9%" }}>STATUS</TableCell>
              <TableCell sx={{ width: "7%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{order.userId.name}</TableCell>
                  <TableCell>{order.providerId.user.name}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    {format(new Date(order.date), "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleMouseEnter(index);
                        handleOpenDialog();
                      }}
                    >
                      info
                    </Button>
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
  );
};

export default Orders;
