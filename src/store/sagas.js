import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ChangePwdSaga from "./auth/changepwd/saga"
import ForgetSaga from "./auth/forgetpwd/saga"

export default function* rootSaga() {
  yield all([
    AccountSaga(),
    AuthSaga(),
    ChangePwdSaga(),
    ForgetSaga()
  ])
}
