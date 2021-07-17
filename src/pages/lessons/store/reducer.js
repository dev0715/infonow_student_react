



import {

  GET_USER_TOPICS,
  GET_USER_TOPICS_SUCCESS,
  GET_USER_TOPICS_FAILURE,
  GET_USER_TOPIC_LESSONS,
  GET_USER_TOPIC_LESSONS_SUCCESS,
  GET_USER_TOPIC_LESSONS_FAILURE,
  SELECT_TOPIC,
  SELECT_LESSON,
  COMPLETED_LESSON,
  COMPLETED_LESSON_SUCCESS,
  COMPLETED_LESSON_FAILURE,

} from './actionTypes'

const initialState = {
  topics: [],
  topicsLoading: false,
  topicsError: null,
  lessons: [],
  lessonsLoading: false,
  lessonsError: null,
  selectedTopic: {},
  selectedLesson: {},
}


const completedLesson = (state, payload) => {
  if (state.selectedLesson == payload.id)
    state.selectedLesson.loading = true
  for (const index in state.lessons) {
    if (state.lessons[index].id == payload.id) {
      state.lessons[index].loading = true
      break
    }
  }

  return {
    ...state,
    lessons: [...state.lessons]
  }

}

const completedLessonSuccess = (state, payload) => {
  if (state.selectedLesson == payload.id)
    state.selectedLesson.loading = false
  for (const index in state.lessons) {
    if (state.lessons[index].id == payload.id) {
      state.lessons[index].loading = false
      state.lessons[index].error = null
      break
    }
  }

  return {
    ...state,
    lessons: [...state.lessons]
  }

}

const completedLessonFailure = (state, payload) => {
  if (state.selectedLesson == payload.id)
    state.selectedLesson.loading = false
  for (const index in state.lessons) {
    if (state.lessons[index].id == payload.id) {
      state.lessons[index].loading = false
      state.lessons[index].error = payload.error
      break
    }
  }

  return {
    ...state,
    lessons: [...state.lessons]
  }
}


const lessonReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_USER_TOPICS:
      return { ...state, topics: [], topicsLoading: true }

    case GET_USER_TOPICS_SUCCESS:
      return { ...state, topics: action.payload, topicsLoading: false, topicsError: null }

    case GET_USER_TOPICS_FAILURE:
      return { ...state, topics: [], topicsLoading: false, topicsError: action.payload }

    case GET_USER_TOPIC_LESSONS:
      return { ...state, lessons: [], lessonsLoading: true }

    case GET_USER_TOPIC_LESSONS_SUCCESS:
      return { ...state, lessons: action.payload, lessonsLoading: false, lessonsError: null }

    case GET_USER_TOPIC_LESSONS_FAILURE:
      return { ...state, lessons: [], lessonsLoading: false, lessonsError: action.payload }

    case SELECT_TOPIC:
      return { ...state, selectedTopic: action.payload, lessons: [], selectedLesson: {} }

    case SELECT_LESSON:
      return { ...state, selectedLesson: action.payload }

    case COMPLETED_LESSON:
      return completedLesson(state, action.payload)

    case COMPLETED_LESSON_SUCCESS:
      return completedLessonSuccess(state, action.payload)

    case COMPLETED_LESSON_FAILURE:
      return completedLessonFailure(state, action.payload)

    default:
      return state
  }
}

export default lessonReducer
