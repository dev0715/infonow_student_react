import { combineReducers } from "redux"

// Authentication
import Login from "./../pages/auth/login/store/reducer"
import Register from "./auth/register/reducer"
import Layout from "./layout/reducer"
import Navbar from "./navbar/reducer"
import Chat from "./../pages/chat/store/reducer"
import Meetings from "./../pages/meetings/store/reducer"
import Documents from "./../pages/documents/store/reducer"
import Blogs from "./../pages/blog/store/reducer"
import Lessons from "./../pages/lessons/store/reducer"
import Tests from "./../pages/tests/store/reducer"

const rootReducer = combineReducers({
  Register,
  Login,
  Layout,
  Navbar,
  Chat,
  Meetings,
  Documents,
  Blogs,
  Lessons,
  Tests
});

export default rootReducer;

