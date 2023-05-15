import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLocationAction } from "../../actions/adminActions";
import { listLocationsAction } from "../../actions/adminActions";
import ErrorMessage from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
const drawerWidth = 240;

//////pagenation
const rowsPerPageOptions = [5, 10, 25];

const Locations = ({ history }) => {
  const locationCreate = useSelector((state) => state.admiCreateLocation);
  const { loading, error } = locationCreate;

  const locationList = useSelector((state) => state.locationsList);
  const { locations, locationsLoading } = locationList;
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
    rowsPerPage - Math.min(rowsPerPage, locations.length - page * rowsPerPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const resetHandler = () => {
    setName("");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetHandler();
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (!name) return;

    dispatch(createLocationAction(name));
    resetHandler();
    handleClose();
  };

  useEffect(() => {
    dispatch(listLocationsAction());
  }, [dispatch]);

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
      <Box
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <Button
          sx={{
            color: "#000000",
            backgroundColor: "#C2C2C2",
            boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
            width: "150px",
          }}
          onClick={handleOpen}
        >
          ADD LOCATION
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <DialogTitle>ADD LOCATIONS HERE</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
          borderRadius: "8px",
          overflowX: "auto",
          maxWidth: "500px",
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
          LOCATIONS
        </Typography>
        {/* {servicesError && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
        {locationsLoading ? <Loading /> : ""}
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
              <TableCell sx={{ width: "10%" }}>SL NO</TableCell>
              <TableCell sx={{ width: "30%" }}>LOCATIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((location, index) => (
                <TableRow key={location._id}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{location.location}</TableCell>
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
          count={locations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Locations;
