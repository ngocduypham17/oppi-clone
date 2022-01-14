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
  const [placement, setPlacement] = React.useState();
  const [offset, setOffset] = useState(0);
  let [Polls, setPolls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Page, setPage] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate();
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const header = { Authorization: `Bearer ${AccessToken}` };
  const URL = `https://dev.oppi.live/api/admin/v1/polls?offset=${offset}&limit=10&direction=desc&search=`;

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openDetail = () => {
    navigate("/Detail");
  };

  const formatDate = (second, format) => {
    let time = new Date(second * 1000);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = time.getFullYear();
    if (format && format.format === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    }
    return `${day}-${month}-${year}`;
  };
 
  const getData = async () => {
    try {
      const response = await axios.get(URL,{headers: header});
      const data=response.data.list;
      setPolls(data);
      const pages = response.data.totalCount;
      pages % 10  === 0 ?  setPage(pages / 10) : setPage((pages - (pages % 10)) / 10 + 1);
      // let totalPage = respon.data.totalCount;
      //   if (totalPage % 10 === 0) {
      //     setCountPage(totalPage / 10);
      //   } else {
      //     setCountPage((totalPage - (totalPage % 10)) / 10 + 1);
      //   }

    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  },[offset]);

  return (
    <div className="col-lg-12 row justify-content-between mt-3">
     
        <div className="ml-5 mb-4">
        <Typography variant="h4">Poll List</Typography>
      </div>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick("bottom")}
        >
          Oppi Admin
          <KeyboardArrowDownIcon/>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography onClick={handleClose} className={classes.typography}>
                  Logout
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
     
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
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
          {Polls.map((poll) =>{ 
            return (
            <TableRow id={poll.id} >
              <TableCell onClick={openDetail} component="th" scope="row">{poll.title}</TableCell>
              <TableCell onClick={openDetail} align="right">{poll.question}</TableCell>
              <TableCell onClick={openDetail} align="right">{formatDate(poll.openedAt)}</TableCell>
              <TableCell onClick={openDetail} align="right">{formatDate(poll.closedAt)}</TableCell>
              <TableCell onClick={openDetail} align="right">{poll.participantCount}</TableCell>
              {
                poll.status==='live'?
                <TableCell  onClick={openDetail} align="center"><div className="live">{poll.status.toUpperCase()}</div></TableCell>:
                <TableCell onClick={openDetail} align="center"><div className="ended">{poll.status.toUpperCase()}</div></TableCell>
              }
              <TableCell align="center"><button className="dlt">DELETE</button></TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
 
    <div style={{ margin: '2rem auto'}} className={classes.root}>
      <Pagination count={Page} variant="outlined" shape="rounded" />
    </div>  
    </div>
  );
}
