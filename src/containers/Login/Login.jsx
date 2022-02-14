import "./Login.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/consumeHook.ts";
import { setErrorMessage, loginRequest } from "./reducer";
import { useNavigate } from "react-router-dom";
import clientPath from "../../constants/clientPath";
import { REQUEST_STATUS } from "../../constants/status";
import { ADMIN_TOKEN } from "../../constants/localStorage";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login () {
  // const [err, setErr] = useState("");
  // const TOKEN_KEY = "AdminAccessToken";
  // const API_URL = "https://dev.oppi.live/api/admin/v1/auth/signin";
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(API_URL, data)
      .then((response) => {
        async function setToken() {
          localStorage.setItem(TOKEN_KEY, response.data.token);
        }
        setToken().then(() => {
          navigate("/polllist");
          setErr("");
        });
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setErr(e.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center text-info my-5">Sign In</h1>
      <div class="form-group text-info col-lg-9">
        <label for="email">EMAIL ADDRESS</label>
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
      <div class="form-group text-info col-lg-9">
        <label for="password" className="">
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
        <p>{err}</p>
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
