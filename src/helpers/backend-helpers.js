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

// Student Actions
export const postStudentLogin = data => post(url.POST_STUDENT_LOGIN, data);

export const getStudentAllMeetings = userId => get(url.GET_ALL_MEETINGS(userId));
export const uploadDocument = (data, options) => postForm(url.UPLOAD_DOCUMENT_URL, data, options);