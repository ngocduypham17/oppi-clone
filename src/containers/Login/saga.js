import { put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  setErrorMessage,
} from "./reducer";
import AuthenticationService from '../../services/AuthenticationService';
import { STATUS_CODE } from "../../constants/common";

const invalidMessage = "Email or password is invalid, please try again.";

function* sendSignInRequest(data) {
  console.log(data);
  try {
    const response = yield AuthenticationService.login(data.payload);
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put(setErrorMessage(""));
      yield put(loginSuccess(response.data));
    }
  } catch (error) {
    //if (error.response.data.message === "Incorrect username or password") {
      yield put(loginFail(invalidMessage));
    //
    //  yield put(loginRequest());
      yield put(setErrorMessage(""));
   // }
  }
}

export default function* loginSaga() {
  yield takeEvery(loginRequest, sendSignInRequest);
}