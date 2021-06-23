
export const BASE_URL = `http://192.168.10.102:3600`
export const DOCUMENT_BASE_URL = `${BASE_URL}/public`
export const MEETING_API_URL = `http://192.168.10.104:3900`
export const CHAT_API_URL = `http://192.168.10.104:3700`


// Chats
export const GET_CHATS_CONTACTS = id => `${CHAT_API_URL}/users/${id}/chats`
export const GET_CHAT_DOCUMENTS = id => `${BASE_URL}/documents?chatId=${id}`
export const UPDATE_USER = id => `${BASE_URL}/api/v1/students/${id}/profile`

// Students
export const POST_STUDENT_LOGIN = `${BASE_URL}/authenticate/student`


// Meetings
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`


export const GET_IMAGE_URL = url => url ? DOCUMENT_BASE_URL + url : DOCUMENT_BASE_URL + "/profile-pictures/default.png"

export const GET_DOCUMENT_URL = url => url ? DOCUMENT_BASE_URL + url : DOCUMENT_BASE_URL + "/profile-pictures/default.png"

export const UPLOAD_DOCUMENT_URL = `${BASE_URL}/documents`;