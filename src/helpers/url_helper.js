
export const BASE_URL = `http://192.168.10.102:3600`
export const MEETING_API_URL = `http://192.168.10.104:3900`


// Chats
export const GET_CHATS_CONTACTS = id => `/users/${id}/chats`

// Students
export const POST_STUDENT_LOGIN = `${BASE_URL}/authenticate/student`


// Meetings
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`




