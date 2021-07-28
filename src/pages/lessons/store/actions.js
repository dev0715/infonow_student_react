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
  GET_LESSON,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAILURE,
} from './actionTypes'


export const getUserTopics = () => {
  return {
    type: GET_USER_TOPICS,
  }
}

export const getUserTopicsSuccess = (data) => {
  return {
    type: GET_USER_TOPICS_SUCCESS,
    payload: data
  }
}

export const getUserTopicsFailure = (error) => {
  return {
    type: GET_USER_TOPICS_FAILURE,
    payload: error
  }
}


export const getUserTopicLessons = (id) => {
  return {
    type: GET_USER_TOPIC_LESSONS,
    payload: id
  }
}

export const getUserTopicLessonsSuccess = (data) => {
  return {
    type: GET_USER_TOPIC_LESSONS_SUCCESS,
    payload: data
  }
}

export const getUserTopicLessonsFailure = (error) => {
  return {
    type: GET_USER_TOPIC_LESSONS_FAILURE,
    payload: error
  }
}

export const selectTopic = (data) => {
  return {
    type: SELECT_TOPIC,
    payload: data
  }
}

export const selectLesson = (id) => {
  return {
    type: SELECT_LESSON,
    payload: id
  }
}

export const completedLesson = (data) => {
  return {
    type: COMPLETED_LESSON,
    payload: data
  }
}

export const completedLessonSuccess = (data) => {
  return {
    type: COMPLETED_LESSON_SUCCESS,
    payload: data
  }
}

export const completedLessonFailure = (error) => {
  return {
    type: COMPLETED_LESSON_FAILURE,
    payload: error
  }
}

export const getLesson = (id) => {
  return {
    type: GET_LESSON,
    payload: id
  }
}

export const getLessonSuccess = (data) => {
  return {
    type: GET_LESSON_SUCCESS,
    payload: data
  }
}

export const getLessonFailure = (error) => {
  return {
    type: GET_LESSON_FAILURE,
    payload: error
  }
}