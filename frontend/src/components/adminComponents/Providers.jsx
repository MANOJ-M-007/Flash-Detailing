import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ErrorMessage from "../ErrorAlert";
import Loading from "../Loading";
import { Box, Button, Typography } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { providerList, blockProviderAction } from "../../actions/adminActions";
import { useEffect } from "react";
import "./Alertbox.css";
import { useState } from "react";
const drawerWidth = 240;

export default function DenseTable({ userSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useSelector((state) => state.providersList);
  const { loading, providers, error, success } = provider;
  const ProviderBlock = useSelector((state) => state.providerBlock);
  const { blocksuccess } = ProviderBlock;
  const [provider1, setProvider1] = useState();
  const [isBlocked, setIsBlocked] = useState(false);

  const blockHandler = (id, status, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-dialog">
            <h2>Are You Sure?</h2>

            <p>
              Do You Want To {status === false ? "unblock" : "block"} {name}
            </p>
            <div className="confirm-dialog-buttons">
              <button
                className="yes"
                onClick={() => {
                  dispatch(blockProviderAction(id, status));
                  setIsBlocked(status); // Update block status
                  onClose();
                  navigate("/admin/providerlist");
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

  useEffect(() => {
    dispatch(providerList());
  }, [dispatch, success, blocksuccess]);

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
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
          borderRadius: "8px",
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
          PROVIDERS
        </Typography>
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {!loading && !error && (
          <Table
            sx={{
              overflowX: "auto",
              minWidth: 800,
              justifyContent: "center",
              alignItems: "center",
            }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell sx={{ width: "10%" }}>IMAGE</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Washing Method</TableCell>
                <TableCell align="left">Mobile</TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    padding: "8px",
                    margin: "0",
                  }}
                  align="right"
                >
                  Actions&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            {providers.map((data, index) => (
              <TableBody key={index}>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{data.name}</TableCell>
                  <TableCell>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "20px",
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                      src={data.profile.url}
                      alt="services"
                    />
                  </TableCell>
                  <TableCell align="left">{data.email}</TableCell>
                  <TableCell align="left">{data.serviceType}</TableCell>
                  <TableCell align="left">{data.mobile}</TableCell>
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
                        backgroundColor: data.isBlocked ? "#C2FFC2" : "#FFC2C2",
                        color: data.isBlocked ? "#000000" : "#000000",
                      }}
                      variant={data.isBlocked ? "#FFC2C2" : "#C2FFC2"}
                      onClick={async () => {
                        setProvider1(data.name);
                        blockHandler(data.user, !data.isBlocked, data.name);
                      }}
                    >
                      {data.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
