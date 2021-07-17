import { call, put, takeEvery } from "redux-saga/effects"


// Login Redux States
import {
  GET_TESTS,
  NEW_TEST_ATTEMPT,
  SUBMIT_TEST_ATTEMPT
} from "./actionTypes"


import {
  getTestsFailure,
  getTestsSuccess,
  newTestAttemptFailure,
  newTestAttemptSuccess,
  submitTestAttemptFailure,
  submitTestAttemptSuccess

} from "./actions"

//Include Both Helper File with needed methods
import { getTests, newTestAttempt } from "../../../helpers/backend-helpers"

function* getTestsHttp() {
  try {
    const response = yield call(getTests);
    if (response) {
      yield put(getTestsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getTestsFailure(error.message ? error.message : error))
  }
}

function* newTestAttemptHttp({ payload: { id, data } }) {
  try {
    const response = yield call(newTestAttempt, data);
    if (response) {
      yield put(newTestAttemptSuccess({ id, data: response }))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {

    yield put(newTestAttemptFailure({ id, error: error.message ? error.message : error }))
  }
}


function* testSaga() {
  yield takeEvery(GET_TESTS, getTestsHttp)
  yield takeEvery(NEW_TEST_ATTEMPT, newTestAttemptHttp)
}

export default testSaga
