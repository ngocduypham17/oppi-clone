import { takeEvery, put, call, select } from "redux-saga/effects";
import { getDetailAction, alterPollAction } from "./reducer";
import {
  setPoll,
  getDetailService,
  alterDataService,
} from "../../services/PollDetailService";
import { STATUS_CODE } from "../../constants/common";
//import { ACCESS_TOKEN } from "../../constants/localStorage";

function* getPollDataSaga() {
  const id = yield select((state) => state.pollist.selectedID);
  console.log("ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", id);
  const response = yield call(getDetailService, id);
  if (response.state === STATUS_CODE) {
    yield put(setPoll(response.data.list));
  }
}

function* alterDataSaga(){}

export default function* polldetailSaga(){
    takeEvery(getDetailAction,getPollDataSaga);
    takeEvery(alterPollAction,alterDataSaga);
}
