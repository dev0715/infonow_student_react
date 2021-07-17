



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
  PREVIOUS_QUESTION,

} from './actionTypes'


let TEST_KEY = "ATTEMPT_TEST_OBJECT"

let testObj = JSON.parse(localStorage.getItem(TEST_KEY) || "{}")


const initialState = {
  tests: [],
  testsLoading: false,
  testsError: null,
  attemptTestLoading: false,
  selectedTest: testObj.test || {},
  currentIndex: testObj.currentIndex || 0,
  attemptId: testObj.attemptId || null,
  attemptTestError: null,
}


const newTestAttemptSuccess = (state, payload) => {
  state.attemptId = payload.data.attemptId
  let test = state.tests.find(t => t.studentTestId == payload.id)
  if (test) {
    state.selectedTest = test
    state.currentIndex = 0
    localStorage.setItem(TEST_KEY, JSON.stringify({
      test: test,
      currentIndex: 0,
      attemptId: state.attemptId
    }))
  }

  return { ...state, attemptTestLoading: false, attemptTestError: null }
}

const updateTestStorage = (state) => {
  localStorage.setItem(TEST_KEY, JSON.stringify({
    test: state.selectedTest,
    currentIndex: state.currentIndex,
    attemptId: state.attemptId
  }))
}


const updateSubjectiveQuestion = (state, payload) => {
  state.selectedTest.test.questions[state.currentIndex].answerText = payload
  updateTestStorage(state)
  return {
    ...state,
    selectedTest: { ...state.selectedTest }
  }
}

const updateObjectiveQuestion = (state, payload) => {
  state.selectedTest.test.questions[state.currentIndex].options.forEach(o => {
    if (o.optionId == payload.id) {
      o.selected = true
    } else {
      o.selected = false
    }
  });
  updateTestStorage(state)
  return {
    ...state,
    selectedTest: { ...state.selectedTest }
  }
}

const nextQuestion = (state) => {
  if (state.selectedTest.test) {
    if (state.currentIndex < state.selectedTest.test.questions.length - 1 &&
      state.selectedTest.test.questions.length > 0) {
      state.currentIndex++
      updateTestStorage(state)
    }
  }
  return {
    ...state
  }
}

const previousQuestion = (state) => {
  if (state.selectedTest.test) {
    if (state.currentIndex > 0 && state.selectedTest.test.questions.length > 0) {
      state.currentIndex--
      updateTestStorage(state)
    }
  }
  return {
    ...state
  }
}


const testReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TESTS:
      return { ...state, tests: [], testsLoading: true }

    case GET_TESTS_SUCCESS:
      return { ...state, tests: action.payload, testsLoading: false, testsError: null }

    case GET_TESTS_FAILURE:
      return { ...state, tests: [], testsLoading: false, testsError: action.payload }

    case NEW_TEST_ATTEMPT:
      return { ...state, attemptTestLoading: true, attemptTestError: null }

    case NEW_TEST_ATTEMPT_SUCCESS:
      return newTestAttemptSuccess(state, action.payload)

    case NEW_TEST_ATTEMPT_FAILURE:
      return { ...state, attemptTestLoading: false, attemptTestError: action.payload.error }

    case UPDATE_SUBJECTIVE_QUESTION:
      return updateSubjectiveQuestion(state, action.payload)

    case UPDATE_OBJECTIVE_QUESTION:
      return updateObjectiveQuestion(state, action.payload)

    case NEXT_QUESTION:
      return nextQuestion(state)

    case PREVIOUS_QUESTION:
      return previousQuestion(state)

    default:
      return state
  }
}

export default testReducer
