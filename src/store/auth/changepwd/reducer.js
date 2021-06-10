import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "./actionTypes"

const initialState = {
  error: "",
  success: "",
  loading: false,
}

const changePwd = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      state = {
        ...state,
        success: "",
        error: "",
        loading: true,
      }
      break
    
    case CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        error: "",
        success: action.payload,
        loading: false,
      }
      break
    
      case CHANGE_PASSWORD_FAILED:
        state = {
          ...state,
          error: action.payload,
          success: "",
          loading: false,
        }
        break

    default:
      state = { ...state }
      break
  }
  return state
}

export default changePwd
