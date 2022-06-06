import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../constants/localStorage";
import { REQUEST_STATUS } from "../../constants/common";

const initialState = {
  errorMessage: "",
  loginStatus: REQUEST_STATUS.IDLE,
};

export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    loginRequest: (state, action) => {
      state.loginStatus = REQUEST_STATUS.REQUESTING;
    },
    loginSuccess: (state, { payload: { token } }) => {
      if (token) localStorage.setItem(ACCESS_TOKEN, token);
      state.loginStatus = REQUEST_STATUS.SUCCESS;
    },
    loginFail: (state, { payload }) => {
      state.loginStatus = REQUEST_STATUS.ERROR;
      state.errorMessage = payload;
    },
    logOutAction(){},
  },
});

export const { setErrorMessage, loginRequest, loginSuccess, loginFail,logOutAction } =
  slice.actions;

export default slice.reducer;