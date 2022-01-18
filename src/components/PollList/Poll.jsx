import React from "react";
import { useEffect, useState } from "react";
import "./PollList.scss";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Popper } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import axios from "axios";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  button: {
    color: "blue",
  },
}));

export default function Poll() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [placement, setPlacement] = React.useState();
  const [offset, setOffset] = useState(0);
  const [polls, setPolls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate();
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const header = { Authorization: `Bearer ${AccessToken}` };
  const URL = `https://dev.oppi.live/api/admin/v1/polls?offset=${offset}&limit=10&direction=desc&search=`;
  const SIGNOUT_URL = "https://dev.oppi.live/api/admin/v1/auth/signout";
  const DEL_URL = "https://dev.oppi.live/api/admin/v1/polls";
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
    setOpen(false);
    setOpenLogOut(false);
    setOpenDelete(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClickOpen = () => {
    setOpenLogOut(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleLogOut = () => {
    axios
      .post(SIGNOUT_URL)
      .then((response) => {
        localStorage.removeItem("AdminAccessToken");
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const openDetail = () => {
    navigate("/Detail");
  };

  const formatDate = (second, format) => {
    let time = new Date(second * 1000);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = time.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * 10);
  };
  const getData = async () => {
    try {
      const response = await axios.get(URL, { headers: header });
      const data = response.data.list;
      setPolls(data);
      const pages = response.data.totalCount;
      pages % 10 === 0
        ? setPage(pages / 10)
        : setPage((pages - (pages % 10)) / 10 + 1);
    } catch (e) {
      console.log(e);
    }
  };
  const  deletePoll = async (id) =>{
    return await 
      axios
        .delete(`${DEL_URL}/${id}`,{ headers: header })
        .then((respon) => console.log(respon))
        .catch((e) => console.log(e))
    };
  
  const handleDelete = async (id) => {
    await deletePoll(id);
    getData();
    setOpenDelete(false);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div className="col-lg-12 row justify-content-between mt-3">
      <div
        style={{ width: "100%", position: "fixed", background: "#fff" }}
        className="d-flex justify-content-between mb-5"
      >
        <div className="ml-5 mb-4">
          <Typography variant="h4">Poll List</Typography>
        </div>
        <div>
          <div>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              Oppi Admin
              <KeyboardArrowDownIcon />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              onClick={handleClickOpen}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <Dialog open={openLogOut} onClose={handleClose}>
            <DialogTitle textAlign="center">Log Out</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={handleLogOut}
                autoFocus
                sx={{
                  backgroundColor: "red",
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Poll Name</TableCell>
              <TableCell align="right">Poll Question</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Participants</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {polls.map((poll) => {
              return (
                <TableRow id={poll.id}>
                  <TableCell onClick={openDetail} component="th" scope="row">
                    {poll.title}
                  </TableCell>
                  <TableCell onClick={openDetail} align="right">
                    {poll.question}
                  </TableCell>
                  <TableCell onClick={openDetail} align="right">
                    {formatDate(poll.openedAt)}
                  </TableCell>
                  <TableCell onClick={openDetail} align="right">
                    {formatDate(poll.closedAt)}
                  </TableCell>
                  <TableCell onClick={openDetail} align="right">
                    {poll.participantCount}
                  </TableCell>
                  {poll.status === "live" ? (
                    <TableCell onClick={openDetail} align="center">
                      <div className="live">{poll.status.toUpperCase()}</div>
                    </TableCell>
                  ) : (
                    <TableCell onClick={openDetail} align="center">
                      <div className="ended">{poll.status.toUpperCase()}</div>
                    </TableCell>
                  )}
                  <TableCell align="center">
                    <button className="dlt" onClick={handleOpenDelete}>
                      DELETE
                    </button>
                    <Dialog
                      open={openDelete}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title"></DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you would like to delete this poll? Once
                          deleted, it cannot be retrieved.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Keep Poll
                        </Button>
                        <Button onClick={()=>handleDelete(poll.id)} autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ margin: "2rem auto" }} className={classes.root}>
        <Pagination
          count={page}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={(e, page) => handlePage(page)}
        />
      </div>
    </div>
  );
}
