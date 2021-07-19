import { post, del, get, put, postForm } from "./api_helper"
import * as  url from "./url_helper"




// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser")
  return user ? JSON.parse(user) : null;
}

export const setLoggedInUser = (obj = {}) => {
  localStorage.setItem("authUser", JSON.stringify(obj))
}

export const getAuthentication = () => {
  const tokenInfo = localStorage.getItem("authToken")
  return tokenInfo ? JSON.parse(tokenInfo) : null;
}

//is user is logged in
export const isUserAuthenticated = () => {
  return getAuthentication() !== null
}


// Chats
export const getChatContactsRequest = id => get(url.GET_CHATS_CONTACTS(id))
export const getChatDocuments = id => get(url.GET_CHAT_DOCUMENTS(id))
export const updateUser = (id, data) => put(url.UPDATE_USER(id), data)

//Documents
export const getUserDocuments = () => get(url.GET_USER_DOCUMENTS)
export const deleteUserDocument = (id) => del(url.DELETE_USER_DOCUMENTS(id))
export const uploadDocument = (data, options) => postForm(url.UPLOAD_DOCUMENT_URL, data, options);

//Blogs 
export const getBlogList = () => get(url.GET_BLOG_LIST)
export const getBlog = (id) => get(url.GET_BLOG(id))
export const getBlogCategories = () => get(url.GET_BLOG_CATEGORIES)
export const getBlogComments = (id) => get(url.GET_BLOG_COMMENTS(id))
export const postCommentOnBlog = (data) => post(url.COMMENT_ON_BLOG, data)


// Student Actions
export const postStudentLogin = data => post(url.POST_STUDENT_LOGIN, data);

//Meeting
export const newMeeting = data => post(url.NEW_MEETING, data);
export const getStudentAllMeetings = userId => get(url.GET_ALL_MEETINGS(userId));
export const getMeetingDates = userId => get(url.GET_MEETING_DATES(userId));
export const updateMeeting = (id, action, data) => put(url.UPDATE_MEETING(id, action), data);

//Lessons

export const getTopics = () => get(url.GET_TOPICS);
export const getTopicLessons = id => get(url.GET_TOPIC_LESSONS(id));

//Test

export const getTests = () => get(url.GET_TESTS);
export const newTestAttempt = (data) => post(url.POST_TEST_ATTEMPT, data);
export const submitTestAttempt = (data) => put(url.SUBMIT_TEST_ATTEMPT, data);
