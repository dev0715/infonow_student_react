import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess } from "./actions"

//Include Both Helper File with needed methods
import {
  postAdminLogin,
  postInstituteLogin,
  postStudentLogin,
} from "../../../helpers/backend-helpers";
import { resetAPIAuthToken } from "../../../helpers/api_helper";


function* loginUser({ payload: { user, history } }) {
  try {

    let loginFunc = undefined;
    if (user.userType === 'institute') loginFunc = postInstituteLogin;
    if (user.userType === 'admin') loginFunc = postAdminLogin;
    if (user.userType === 'student') loginFunc = postStudentLogin;
    if (loginFunc) {
      const response = yield call(loginFunc, user);
      if (response.user) {
        response.user = { ...response.user, userType: user.userType }
        localStorage.setItem("authUser", JSON.stringify(response))
        yield put(loginSuccess(response))
        return;
      }
      throw "Unknown response received from Server";
    }

  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("adminUser")
    resetAPIAuthToken();
    history.push("/login")
  } catch (error) {

    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
