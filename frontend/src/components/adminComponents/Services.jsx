import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createServiceAction,
  listServicesAction,
  blockServiceAction,
} from "../../actions/adminActions";
import ErrorMessage from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
const drawerWidth = 240;

const Services = ({ history }) => {
  const [name, setName] = useState("");
  const [servicename, setServicename] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [details, setDetails] = useState("");
  const [image, setImage] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceCreate = useSelector((state) => state.adminServiceCreate);
  const { loading, error } = serviceCreate;

  const serviceList = useSelector((state) => state.adminServiceList);
  const { servicesLoading, services, servicesError } = serviceList;

  const serviceBlock = useSelector((state) => state.adminServiceBlock);
  const { ssuccess } = serviceBlock;

  useEffect(() => {
    dispatch(listServicesAction());
  }, [dispatch, ssuccess]);
  const resetHandler = () => {
    setName("");
    setDetails("");
  };

  //for dialog box
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetHandler();
    setOpen(false);
  };
  //add service
  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (!name || !details || !image) return;

    dispatch(createServiceAction(name, details, image));
    // navigate('/admin/services')
    resetHandler();
    handleClose();
    // setresult(true);
  };

  const blockHandler = (id, status, servicename) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-dialog">
            <h2>Are You Sure?</h2>

            <p>
              Do You Want To {status === false ? "unblock" : "block"}{" "}
              {servicename}
            </p>
            <div className="confirm-dialog-buttons">
              <button
                className="yes"
                onClick={() => {
                  dispatch(blockServiceAction(id, status));
                  setIsBlocked(status); // Update block status
                  onClose();
                  navigate("/admin/services/list");
                }}
              >
                Yes
              </button>
              <button className="no" onClick={onClose}>
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  useEffect(() => {});

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
          ADD SERVICE
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <DialogTitle>ADD SERVICE HERE</DialogTitle>
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
            <TextField
              name="Details"
              label="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Input
              sx={{ marginTop: "10px" }}
              type="file"
              name="image"
              onChange={handleImage}
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
          SERVICES
        </Typography>
        {servicesError && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {servicesLoading ? <Loading /> : ""}
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
              <TableCell sx={{ width: "10%" }}>SERVICES</TableCell>
              <TableCell sx={{ width: "10%" }}>IMAGE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          {services.map((service, index) => (
            <TableBody key={index}>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    maxWidth: "250px",
                  }}
                  component="th"
                  scope="row"
                >
                  {service.serviceName}
                </TableCell>
                <TableCell sx={{ width: "100px", height: "100px" }}>
                  <img
                    style={{
                      width: "100px",
                      height: "60px",
                      borderRadius: "5px",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    src={service.image.url}
                    alt="services"
                  />
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    maxWidth: "500px",
                  }}
                >
                  {service.serviceDetails}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    padding: "8px",
                    margin: "0",
                  }}
                >
                  <Button
                    sx={{
                      boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                      width: "90px",
                      backgroundColor: service.isBlocked
                        ? "#C2FFC2"
                        : "#FFC2C2",
                      color: service.isBlocked ? "#000000" : "#000000",
                    }}
                    variant={service.isBlocked ? "#FFC2C2" : "#C2FFC2"}
                    onClick={async () => {
                      setServicename(service.name);
                      blockHandler(
                        service._id,
                        !service.isBlocked,
                        service.name
                      );
                    }}
                  >
                    {service.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Services;
