import { 
  POST_FEEDBACK,
  POST_FEEDBACK_SUCCESS,
  POST_FEEDBACK_ERROR
} from "./actionTypes"

const initialState = {
  feedbackResponse: null,
  success: false,
  error: null,
}

const Feedback = (state = initialState, action) => {
  switch (action.type) {
    case POST_FEEDBACK:
      state = { ...state, feedbackResponse: null, success: false, error: null }
      break
    case POST_FEEDBACK_SUCCESS:
      state = { ...state, feedbackResponse: action.payload, success: true }
      break
    case POST_FEEDBACK_ERROR:
      state = { ...state, error: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Feedback
