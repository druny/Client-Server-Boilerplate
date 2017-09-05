/* eslint no-console: 0 */
import { put, takeEvery } from 'redux-saga/effects';
import { TEST } from '../actions/test';

function* testSaga() {
  try {
    yield setTimeout(() => 'Success', 2000);
  } catch (err) {
    yield put(null);
  }
}

export default function* () {
  yield takeEvery(TEST, testSaga);
}
