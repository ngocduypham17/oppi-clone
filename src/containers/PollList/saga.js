import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  setPolls,
  deletePollAction,
  setPages,
  getDataAction,
  logOutAction
} from "./reducer";
import {
  getDataService,
  deletePollService,
  logoutService,
} from "../../services/PollListService";
import { STATUS_CODE } from "../../constants/common";
import { ACCESS_TOKEN } from "../../constants/localStorage";

function* getDataSaga() {
  const offset = yield select((state) => state.polllist.offset);
  console.log("offset :      ",offset)
  try {
    const response = yield call(getDataService,offset);
    console.log(offset);
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put(setPolls(response.data.list));
      const pages = response.data.totalCount;
      pages % 10 === 0
        ? yield put(setPages(pages / 10))
        : yield put(setPages((pages - (pages % 10)) / 10 + 1));
    }
  } catch (error) {}
}

function* deletePollSaga() {
  const selectedID = yield select((state) => state.polllist.selectedID);
  const response = yield call(deletePollService, selectedID);
  if (response.status === STATUS_CODE.SUCCESS) {
    yield put(getDataAction());
  }
}

// function* logoutSaga() {
//     const response = yield call(logoutService);
//     if(response.status === STATUS_CODE.SUCCESS)
//     {
//         console.log(response.status);
//         yield call(localStorage.removeItem(ACCESS_TOKEN));
//         yield put(logOutAction());
//     }
// }

export default function* polllistSaga() {
  yield takeEvery(getDataAction, getDataSaga);
  yield takeEvery(deletePollAction, deletePollSaga);
  yield takeEvery(logOutAction, logoutSaga);
}
