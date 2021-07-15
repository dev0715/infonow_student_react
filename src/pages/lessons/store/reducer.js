



import {

  GET_USER_TOPICS,
  GET_USER_TOPICS_SUCCESS,
  GET_USER_TOPICS_FAILURE,
  GET_USER_TOPIC_LESSONS,
  GET_USER_TOPIC_LESSONS_SUCCESS,
  GET_USER_TOPIC_LESSONS_FAILURE,
  SELECT_TOPIC,
  SELECT_LESSON,

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

    default:
      return state
  }
}

export default lessonReducer
