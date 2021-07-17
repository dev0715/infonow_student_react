import {
  GET_TESTS,
  GET_TESTS_SUCCESS,
  GET_TESTS_FAILURE,
  NEW_TEST_ATTEMPT,
  NEW_TEST_ATTEMPT_SUCCESS,
  NEW_TEST_ATTEMPT_FAILURE,
  SUBMIT_TEST_ATTEMPT,
  SUBMIT_TEST_ATTEMPT_SUCCESS,
  SUBMIT_TEST_ATTEMPT_FAILURE,
  UPDATE_OBJECTIVE_QUESTION,
  UPDATE_SUBJECTIVE_QUESTION,
  NEXT_QUESTION,
  PREVIOUS_QUESTION

} from './actionTypes'


export const getTests = () => {
  return {
    type: GET_TESTS,
  }
}

export const getTestsSuccess = (data) => {
  return {
    type: GET_TESTS_SUCCESS,
    payload: data
  }
}

export const getTestsFailure = (error) => {
  return {
    type: GET_TESTS_FAILURE,
    payload: error
  }
}

export const newTestAttempt = ({ id, data }) => {
  return {
    type: NEW_TEST_ATTEMPT,
    payload: { id, data }
  }
}

export const newTestAttemptSuccess = ({ id, data }) => {
  return {
    type: NEW_TEST_ATTEMPT_SUCCESS,
    payload: { id, data }
  }
}

export const newTestAttemptFailure = ({ id, error }) => {
  return {
    type: NEW_TEST_ATTEMPT_FAILURE,
    payload: { id, error }
  }
}


export const submitTestAttempt = ({ id, data }) => {
  return {
    type: SUBMIT_TEST_ATTEMPT,
    payload: { id, data }
  }
}

export const submitTestAttemptSuccess = ({ id, data }) => {
  return {
    type: SUBMIT_TEST_ATTEMPT_SUCCESS,
    payload: { id, data }
  }
}

export const submitTestAttemptFailure = ({ id, error }) => {
  return {
    type: SUBMIT_TEST_ATTEMPT_FAILURE,
    payload: { id, error }
  }
}

export const updateObjectiveQuestion = ({ id }) => {
  return {
    type: UPDATE_OBJECTIVE_QUESTION,
    payload: { id }
  }
}

export const updateSubjectiveQuestion = ({ value }) => {
  return {
    type: UPDATE_SUBJECTIVE_QUESTION,
    payload: value
  }
}

export const nextQuestion = () => {
  return {
    type: NEXT_QUESTION,
  }
}

export const previousQuestion = () => {
  return {
    type: PREVIOUS_QUESTION,
  }
}

