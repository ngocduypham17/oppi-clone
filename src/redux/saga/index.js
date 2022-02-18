import { all } from 'redux-saga/effects';
import loginSaga from '../../containers/Login/saga';
import polllistSaga from '../../containers/PollList/saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    polllistSaga(),
    polldetailSaga()
  ]);
}
