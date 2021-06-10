import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "./actionTypes"

export const changePassword = (data) => {
  return {
    type: CHANGE_PASSWORD,
    payload: data,
  }
}

export const changePasswordSuccess = (success) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: success,
  }
}

export const changePasswordFailed = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    payload: error,
  }
}
