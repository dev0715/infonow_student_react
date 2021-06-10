import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD, RESET_PASSWORD } from "./actionTypes"
import {
  userForgetPasswordSuccess,
  userForgetPasswordFailed,
  userResetPasswordSuccess,
  userResetPasswordFailed
} from "./actions"
import { postForgetPassword, postResetPassword } from "../../../helpers/backend-helpers";




//send verification code to user
function* forgetPasswordUser({ payload: { user, history } }) {
  try {
    if (user.userType) {
      const response = yield call(postForgetPassword, user);
      if (response.message) {
        yield put(userForgetPasswordSuccess(response.message))
        return;
      }
      throw "Unknown response received from server"
    }
  } catch (error) {
    yield put(userForgetPasswordFailed(error))
  }
}

//Reset Password
function* resetPasswordUser({ payload: { user, history } }) {
  try {
    
    if (user.userType) {
      const response = yield call(postResetPassword, user);
      
      if (response.success) {
        yield put(userResetPasswordSuccess(response.message))
        
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        return;
      }

      throw "Unknown response received from server"
    }
  } catch (error) {
    yield put(userResetPasswordFailed(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetPasswordUser)
  yield takeEvery(RESET_PASSWORD, resetPasswordUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
