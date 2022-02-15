import "./Login.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { setErrorMessage, loginRequest } from "./reducer";
import { useNavigate } from "react-router-dom";
import clientPath from "../../constants/clientPath";
import { REQUEST_STATUS } from "../../constants/common";
import { ACCESS_TOKEN } from "../../constants/localStorage";
import { useEffect } from "react";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login () {
  const dispatch = useAppDispatch();
  const { errorMessage, loginStatus } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const handleLogin = () => {
    const Token = localStorage.getItem(ACCESS_TOKEN);
    if (Token && loginStatus === REQUEST_STATUS.SUCCESS) {
      navigate(clientPath.POLLLIST);
    } else navigate(clientPath.LOGIN);
  };
  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  useEffect(() => {
    handleLogin();
  }, [loginStatus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center text-info my-5">Sign In</h1>
      <div className="form-group text-info col-lg-9">
        <label htmlFor="email">EMAIL ADDRESS</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email Address"
          name="email"
          {...register("email")}
        />
        <p className="mt-1">{errors.email?.message}</p>
      </div>
      <div className="form-group text-info col-lg-9">
        <label htmlFor="password" className="">
          PASSWORD
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          name="password"
          {...register("password")}
        />
        <p className="mt-1">{errors.password?.message}</p>
        <p></p>
      </div>
      <button
        type="submit"
        style={{ color: "white" }}
        className="b col-lg-3 col-sm-2 btn btn-warning mt-3"
        onClick={onSubmit}
      >
        Sign In
      </button>
      <p style={{ color: "black" }} className="text-center my-2 mt-4">
        Forgot Password
      </p>
      <p className="text-center text-primary my-1 create">Create New Account</p>
    </form>
  );
};
export default Login;
