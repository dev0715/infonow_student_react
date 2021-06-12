import { combineReducers } from "redux"

// Authentication
import Login from "./auth/login/reducer"
import Register from "./auth/register/reducer"
import ChangePwd from "./auth/changepwd/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Layout from "./layout/reducer"
import Navbar from "./navbar/reducer"

import Chat from '../pages/chat/store/reducer'

const rootReducer = combineReducers({
  Register,
  Login,
  ChangePwd,
  ForgetPassword,
  Layout,
  Navbar,
  Chat
})

export default rootReducer
