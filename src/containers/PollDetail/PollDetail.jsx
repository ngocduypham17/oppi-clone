import "./PollDetail.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InfoIcon from "@material-ui/icons/Info";

const schema = yup.object().shape({
  title: yup.string().max(80).required(),
  question: yup.string().max(255).required(),
  description: yup.string().max(999).required(),
});


const Detail = () => {
  const [poll, setPoll] = useState();
  const [isPublic, setIsPublic] = useState();
  const ID = localStorage.getItem("ID");
  const AccessToken = localStorage.getItem("AdminAccessToken");
  const header = { Authorization: `Bearer ${AccessToken}` };
  const URL_DETAIL = `https://dev.oppi.live/api/admin/v1/polls/${ID}`;

  //-------------------------------------------------- GET DATA ----------------------------------------------------------

  const formatDate = (second, format) => {
    let time = new Date(second * 1000);
    let day = String(time.getDate()).padStart(2, "0");
    let month = String(time.getMonth() + 1).padStart(2, "0");
    let year = time.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getData = () => {
    return axios
      .get(URL_DETAIL, { headers: header })
      .then((response) => {
        setPoll(response.data);
        setIsPublic(response.data.isPublicResult);
        setValue("title", response.data.title);
        setValue("question", response.data.question);
        setValue("description", response.data.description);
        setValue("openedAt", formatDate(response.data.openedAt));
        setValue("closedAt", formatDate(response.data.closedAt));
        setValue("isPublicResult", response.data.isPublicResult);
        setValue("resultRedirectUrl", response.data.resultRedirectUrl);
        setValue("isRequireEmail", response.data.isRequireEmail);
      })
      .catch((e) => {
        alert("loi roi");
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //--------------------------------------------------  FORM HANDLING ----------------------------------------------------

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      question: "",
      description: "",
      openedAt: "",
      closedAt: "",
      isPublicResult: "",
      resultRedirectUrl: "",
      isRequireEmail: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (data.title && data.question && data.description) {
      const dataSend = {
        ...poll,
        name: data.title.trim(),
        question: data.question.trim(),
        description: data.description.trim(),
        is_turn_on_intergration_setting: true,
        passcode: "2123124",
      };
      axios({
        method: "put",
        url: URL_DETAIL,
        headers: header,
        data: dataSend,
      })
        .then(alert('Done !\nInformation updated'))
        .catch((e) => alert(e));
    }
  };

  const handleChange = () =>{
    setIsPublic((prevState) => !prevState)
  }

  //--------------------------------------------------  RENDERING ----------------------------------------------------

  return (
    <h1>Poll Detail</h1>
    // <form className="form-style col-xl-10" onSubmit={handleSubmit(onSubmit)}>
    //   <h1 className="text-left text-dark my-5">Poll Detail Form</h1>
    //   <h6>{isPublic?.toString()} </h6>
    //   <div class="col-xl-12">
    //     <label for="pollName">Poll Name*</label>
    //     <input
    //       type="text"
    //       class="form-control col-xl-12"
    //       id="pollName"
    //       aria-describedby="pollName"
    //       name="title"
    //       {...register("title")}
    //     />
    //     <small id="pollName" class="form-text text-muted text-right">
    //       Max 80 characters
    //     </small>
    //     <p className="mx-1">{errors.title?.message}</p>
    //   </div>
    //   <div class="col-lg-12">
    //     <label for="pollQuestion">Poll Question*</label>
    //     <input
    //       type="text"
    //       class="form-control"
    //       id="pollQuestion"
    //       aria-describedby="pollQ"
    //       name="question"
    //       {...register("question")}
    //     />
    //     <small id="pollQ" class="form-text text-muted text-right">
    //       Max 255 characters
    //     </small>
    //     <p className="mx-1">{errors.question?.message}</p>
    //   </div>
    //   <div class="col-lg-12">
    //     <label for="exampleFormControlTextarea1">Description*</label>
    //     <textarea
    //       class="form-control"
    //       id="exampleFormControlTextarea1"
    //       rows="10"
    //       name="description"
    //       {...register("description")}
    //     ></textarea>
    //     <p className="mx-1">{errors.description?.message}</p>
    //   </div>
    //   <div className="row my-4 col-xl-12 d-flex justify-content-start ">
    //     <div class="col-lg-3 ">
    //       <label className="mr-2">From</label>
    //       <div class="md-form md-outline input-with-post-icon datepicker">
    //         <input
    //           placeholder="Select date"
    //           type="date"
    //           id="example"
    //           class="form-control"
    //           name="openedAt"
    //           {...register("openedAt")}
    //         />
    //       </div>
    //     </div>
    //     <div class="col-lg-3 ">
    //       <label className="mr-2">To</label>
    //       <div class="md-form md-outline input-with-post-icon datepicker">
    //         <input
    //           placeholder="Select date"
    //           type="date"
    //           id="example"
    //           class="form-control"
    //           name="closedAt"
    //           {...register("closedAt")}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row col-xl-12 my-4 d-flex justify-content-between ">
    //     <div className="col-lg-7">
    //       <div class="d-flex justify-content-between">
    //         <div class="form-group flex-column">
    //           <div>
    //             <label htmlFor="isPublicResult">
    //               Public Result
    //               <span className="ml-1">
    //                 <InfoIcon />
    //               </span>
    //             </label>
    //           </div>
    //           <div>
    //             {poll?.isPublicResult === false ? (
    //               <div className="left">
    //                 <input
    //                   type="checkbox"
    //                   name="isPublicResult"
    //                   id="isPublicResult"
    //                   {...register("isPublicResult")}
    //                   checked={isPublic}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //             ) : (
    //               <div className="left">
    //                 <input
    //                   type="checkbox"
    //                   name="isPublicResult"
    //                   id="isPublicResult"
    //                   {...register("isPublicResult")}
    //                   checked={isPublic}
    //                   disabled readonly
    //                 />
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <div class="form-group">
    //           <label for="exampleInputEmail1">Redirect URL</label>
    //           <input
    //             type="text"
    //             class="form-control"
    //             id="exampleInputEmail1"
    //             disabled={isPublic}
    //             name="resultRedirectUrl"
    //             {...register("resultRedirectUrl")}
    //           />
    //         </div>
    //         <div class="form-group flex-column">
    //           <div>
    //             <label htmlFor="emailRequired">
    //               Email Required
    //               <span className="ml-1">
    //                 <InfoIcon />
    //               </span>
    //             </label>
    //           </div>
    //           <div>
    //             <div className="right">
    //               <input
    //                 type="checkbox"
    //                 name="isRequireEmail"
    //                 id="emailRequired"
    //                 {...register("isRequireEmail")}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-lg-2">
    //       <button
    //         type="submit"
    //         style={{ color: "white" }}
    //         className="b col-lg-12 col-sm-2 btn btn-warning mt-3"
    //       >
    //         Save
    //       </button>
    //     </div>
    //   </div>
    // </form>
  );
};

export default Detail;