import { call, put, takeEvery } from "redux-saga/effects"

// Change Password Redux States
import {
  CHANGE_PASSWORD,
} from "./actionTypes"

import {
  changePasswordSuccess,
  changePasswordFailed
} from "./actions"

//Include Both Helper File with needed methods
import {
  putChangePasswordInstitute,
  putChangePasswordAdmin,
  putChangePasswordStudent,
  getLoggedInUser,
} from "../../../helpers/backend-helpers";




function* updatePassword({ payload: data }) {
  try {
    let user = getLoggedInUser();
    if (user) {
      let changePwdFunc = undefined;
      if (user.userType === 'institute') changePwdFunc = putChangePasswordInstitute;
      if (user.userType === 'admin') changePwdFunc = putChangePasswordAdmin;
      if (user.userType === 'student') changePwdFunc = putChangePasswordStudent;

      if (changePwdFunc) {
        const response = yield call(changePwdFunc, data);
        yield put(changePasswordSuccess(response))
        return;
      }
    }

    throw "Please login again!";

  } catch (error) {
    yield put(changePasswordFailed(error))
  }
}


function* changePwdSaga() {
  yield takeEvery(CHANGE_PASSWORD, updatePassword)
}

export default changePwdSaga
