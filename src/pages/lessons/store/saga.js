import { call, put, takeEvery } from "redux-saga/effects"


// Login Redux States
import {
  GET_USER_TOPIC_LESSONS,
  GET_USER_TOPICS
} from "./actionTypes"


import {
  getUserTopicLessonsFailure,
  getUserTopicLessonsSuccess,
  getUserTopicsFailure,
  getUserTopicsSuccess
} from "./actions"

//Include Both Helper File with needed methods
import { getTopicLessons, getTopics } from "../../../helpers/backend-helpers"

function* getTopicsHttp() {
  try {
    const response = yield call(getTopics);
    if (response) {
      yield put(getUserTopicsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getUserTopicsFailure(error))
  }
}


function* getUserTopicLessonsHttp({ payload }) {
  try {
    const response = yield call(getTopicLessons, payload);
    if (response) {
      yield put(getUserTopicLessonsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getUserTopicLessonsFailure(error))
  }
}




function* lessonSaga() {
  yield takeEvery(GET_USER_TOPICS, getTopicsHttp)
  yield takeEvery(GET_USER_TOPIC_LESSONS, getUserTopicLessonsHttp)
}

export default lessonSaga
