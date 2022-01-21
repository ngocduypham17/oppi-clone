import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Detail = () => {
  const [poll, setPoll] = useState();
  const ID = localStorage.getItem("ID");
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const header = { Authorization: `Bearer ${AccessToken}` };
  const URL_DETAIL = "https://dev.oppi.live/api/admin/v1/polls";

  const getData = async () => {
    try {
        const response = await axios.get(`${URL_DETAIL}/${ID}`, { headers: header });
        const data = response.data;
        setPoll(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    // return await axios
    //   .get(`${URL_DETAIL}/${ID}`, { headers: header })
    //   .then((respon) => {
    //     console.log(respon);
    //     setPoll(respon);
    //   })
    //   .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center", color: "darkcyan" }}>
          This is Detail 
      </h1>
      <p>{poll.title}</p>
    </>
  );
};

export default Detail;
