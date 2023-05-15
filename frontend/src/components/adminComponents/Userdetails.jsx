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
import { listusers, blockUserAction } from "../../actions/adminActions";
import { useEffect } from "react";
import "./Alertbox.css";
const drawerWidth = 240;

export default function DenseTable({ userSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.adminUserList);
  const { loading, users, error } = userList;
  const adminUserBlock = useSelector((state) => state.adminUserBlock);
  const { error: errorBlock, success: successBlock } = adminUserBlock;

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
                  dispatch(blockUserAction(id, status));
                  onClose();
                  navigate("/admin/userlist");
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
    dispatch(listusers());
  }, [dispatch, successBlock]);

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
          USERS
        </Typography>
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorBlock && (
          <ErrorMessage variant="danger">{errorBlock}</ErrorMessage>
        )}
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
                <TableCell align="left">Email</TableCell>
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
            {users
              .map((user, index) => (
                <TableBody key={index}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.mobile}</TableCell>
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
                          backgroundColor: user.isBlocked
                            ? "#C2FFC2"
                            : "#FFC2C2",
                          color: user.isBlocked ? "#000000" : "#000000",
                        }}
                        onClick={async () => {
                          blockHandler(user._id, !user.isBlocked, user.name);
                        }}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
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
