import React, { useEffect, useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InfoIcon from "@material-ui/icons/Info";

const schema = yup.object().shape({
  title: yup.string().max(80).required(),
  question: yup.string().max(255).required(),
  description: yup.string().max(999).required(),
});

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Detail = () => {
  const [poll, setPoll] = useState();
  const ID = localStorage.getItem("ID");
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const header = { Authorization: `Bearer ${AccessToken}` };
  const URL_DETAIL = `https://dev.oppi.live/api/admin/v1/polls/${ID}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formatDate = (second, format) => {
    let time = new Date(second * 1000);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = time.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {};

  const onSubmit = () => {};

  const getData = () => {
    // try {
    //   const response = await axios.get(`${URL_DETAIL}/${ID}`, {
    //     headers: header,
    //   });
    //   const data = response.data;
    //   setPoll(data);
    //   console.log(data);
    // } catch (e) {
    //   console.log(e);
    // }
    return axios
      .get(URL_DETAIL, { headers: header })
      .then((response) => {
        //console.log(response.data);
        setPoll(response.data);
        //console.log("poll", poll);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(`poll title : ${poll} `, poll);


  return (
    <div class="container">
      <div className="col-lg-12 row justify-content-between mt-0 ">
        <div className="ml-5 mb-4 mt-4">
          <Typography variant="h4">Poll Detail Form</Typography>
        </div>

         <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group form-group-lg">
            <label for="exampleInputEmail1">Poll Name*</label>
            <input
              value={poll.title}
              type="text"
              class="form-control col-lg-12"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted text-right">
              Max 80 characters
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Poll Question*</label>
            <input
              value={poll.question}
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              aria-describedby="emailHelp"
              placeholder="Password"
            />
            <small id="emailHelp" class="form-text text-muted text-right">
              Max 255 characters
            </small>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description*</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={poll.description}
            ></textarea>
          </div>
          <div class="form-group">
            <h5>Poll Dates</h5>
            <label htmlFor="">From</label>
            <TextField
              value={formatDate(poll.openedAt)}
              id="date"
              label=""
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <label htmlFor="">To</label>
            <TextField
              id="date"
              label=""
              type="date"
              value={formatDate(poll.closedAt)}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div class="d-flex justify-content-between">
            <div class="form-group flex-column">
              <div>
                <label htmlFor="">
                  Public Result
                  <span>
                    <InfoIcon />
                  </span>
                </label>
              </div>
              <div>
                <FormControlLabel
                  control={<Android12Switch checked={poll.isPublicResult} />}
                  label=""
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Redirect URL</label>
              <input
                value={poll.resultRedirectUrl}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                disabled
              />
            </div>
            <div class="form-group flex-column">
              <div>
                <label htmlFor="">
                  Email Required
                  <span>
                    <InfoIcon />
                  </span>
                </label>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Android12Switch
                      onChange={(e) => handleChange(e)}
                      checked={poll.isRequireEmail}
                    />
                  }
                  label=""
                />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-warning">
            Save
          </button>
        </form> 
      </div>
    </div>
  );
};

export default Detail;
