import { call, put, takeEvery } from "redux-saga/effects"


// Login Redux States
import {
  GET_USER_TOPIC_LESSONS,
  GET_USER_TOPICS,
  GET_LESSON,
  COMPLETED_LESSON
} from "./actionTypes"


import {
  getUserTopicLessonsFailure,
  getUserTopicLessonsSuccess,
  getUserTopicsFailure,
  getUserTopicsSuccess,
  getLessonFailure,
  getLessonSuccess,
  completedLessonFailure,
  completedLessonSuccess
} from "./actions"

//Include Both Helper File with needed methods
import { getTopicLessons, getTopics, getLesson, completedLesson } from "../../../helpers/backend-helpers"

function* getTopicsHttp() {
  try {
    const response = yield call(getTopics);
    if (response) {
      yield put(getUserTopicsSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getUserTopicsFailure(error.message ? error.message : error))
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
    yield put(getUserTopicLessonsFailure(error.message ? error.message : error))
  }
}


function* getLessonHttp({ payload }) {
  try {
    const response = yield call(getLesson, payload);
    if (response) {
      yield put(getLessonSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getLessonFailure(error.message ? error.message : error))
  }
}

function* completedLessonHttp({ payload }) {
  try {
    const response = yield call(completedLesson, payload);
    if (response) {
      yield put(completedLessonSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(completedLessonFailure(error.message ? error.message : error))
  }
}



function* lessonSaga() {
  yield takeEvery(GET_USER_TOPICS, getTopicsHttp)
  yield takeEvery(GET_USER_TOPIC_LESSONS, getUserTopicLessonsHttp)
  yield takeEvery(GET_LESSON, getLessonHttp)
  yield takeEvery(COMPLETED_LESSON, completedLessonHttp)
}

export default lessonSaga
