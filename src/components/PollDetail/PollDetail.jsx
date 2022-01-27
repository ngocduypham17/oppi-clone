import "./PollDetail.scss";
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
  const [isPublic, setIsPublic] = useState();
  const ID = localStorage.getItem("ID");
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const header = { Authorization: `Bearer ${AccessToken}` };
  const URL_DETAIL = `https://dev.oppi.live/api/admin/v1/polls/${ID}`;

  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      question: "",
      description: "",
      openedAt: 0,
      closedAt: 0,
      isPublicResult: false,
      resultRedirectUrl: "",
      isRequireEmail: false,
    },
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
  const onSubmit = () => {
    return axios
      .put(URL_DETAIL, { headers: header })
      .then((response) => {
          console.log(response)
      })
      .catch((e) => console.log(e));
  };

  const getData = () => {
    return axios
      .get(URL_DETAIL, { headers: header })
      .then((response) => {
        setPoll(response.data);
        setIsPublic(response.data.isPublicResult);
        console.log("response :", response);
        console.log("response.data : ", response.data);
      })
      .catch((e) => console.log(e));
  };

  const handleChangePublic = (e) => {
    setIsPublic(e.target.checked);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <form className="form-style col-xl-10" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-left text-dark my-5">Poll Detail Form</h1>
      <div class="col-xl-12">
        <label for="pollName">Poll Name*</label>
        <input
          value={poll?.title}
          type="text"
          class="form-control col-xl-12"
          id="pollName"
          aria-describedby="pollName"
        />
        <small id="pollName" class="form-text text-muted text-right">
          Max 80 characters
        </small>
      </div>
      <div class="col-lg-12">
        <label for="pollQuestion">Poll Question*</label>
        <input
          value={poll?.question}
          type="text"
          class="form-control"
          id="pollQuestion"
          aria-describedby="pollQ"
        />
        <small id="pollQ" class="form-text text-muted text-right">
          Max 255 characters
        </small>
      </div>
      <div class="col-lg-12">
        <label for="exampleFormControlTextarea1">Description*</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="10"
          value={poll?.description}
        ></textarea>
      </div>
      <div className="row my-4 col-xl-12 d-flex justify-content-start ">
        <div class="col-lg-3 ">
          <label className="mr-2">From</label>
          <TextField
            id="date"
            label=""
            type="date"
            value={formatDate(poll?.openedAt)}
            sx={{ width: "11em", height: "1em" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div class="col-lg-3 ">
          <label className="mr-2">To</label>
          <TextField
            id="date"
            label=""
            type="date"
            value={formatDate(poll?.closedAt)}
            sx={{ width: "11em", height: "1em" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="row col-xl-12 my-4 d-flex justify-content-between ">
        <div className="col-lg-7">
          <div class="d-flex justify-content-between">
            <div class="form-group flex-column">
              <div>
                <label htmlFor="">
                  Public Result
                  <span className="ml-1">
                    <InfoIcon />
                  </span>
                </label>
              </div>
              <div>
                {isPublic === false ? (
                  <FormControlLabel
                    control={
                      <Android12Switch
                        checked={isPublic}
                        onChange={handleChangePublic}
                      />
                    }
                    label=""
                  />
                ) : (
                  <FormControlLabel
                    control={<Android12Switch checked={isPublic} />}
                    label=""
                  />
                )}
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Redirect URL</label>
              <input
                value={poll?.resultRedirectUrl}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                disabled={isPublic}
              />
            </div>
            <div class="form-group flex-column">
              <div>
                <label htmlFor="">
                  Email Required
                  <span className="ml-1">
                    <InfoIcon />
                  </span>
                </label>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Android12Switch
                      //onChange={}
                      checked={poll?.isRequireEmail}
                    />
                  }
                  label=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <button
            type="submit"
            style={{ color: "white" }}
            className="b col-lg-12 col-sm-2 btn btn-warning mt-3"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Detail;
