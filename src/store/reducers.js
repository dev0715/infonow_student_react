import { combineReducers } from "redux"

// Authentication
import Login from "./../pages/auth/login/store/reducer"
import Register from "./auth/register/reducer"
import Layout from "./layout/reducer"
import Navbar from "./navbar/reducer"
import Chat from "./../pages/chat/store/reducer"
import Meetings from "./../pages/meetings/store/reducer"

const rootReducer = combineReducers({
  Register,
  Login,
  Layout,
  Navbar,
  Chat,
  Meetings
});

export default rootReducer;

