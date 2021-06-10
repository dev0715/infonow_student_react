import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "./actionTypes"

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  loading: false,
  codeSentSuccessfully: false
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        loading: true,
        codeSentSuccessfully: false
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        forgetSuccessMsg: action.payload,
        codeSentSuccessfully: true
      }
      break
    case FORGET_PASSWORD_FAILED:
      state = {
        ...state,
        loading: false,
        forgetError: action.payload,
        codeSentSuccessfully: false
      }
      break
    
    case RESET_PASSWORD:
      state = {
        ...state,
        loading: true,
        forgetSuccessMsg: null,
        forgetError: null,
      }
      break
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        forgetSuccessMsg: action.payload,
        forgetError: null,
      }
      break
    case RESET_PASSWORD_FAILED:
      state = {
        ...state,
        forgetError: action.payload,
        forgetSuccessMsg: null,
        loading: false,
      }
      break
    
    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword
