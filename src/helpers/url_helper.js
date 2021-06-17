
export const BASE_URL = `http://192.168.10.102:3600`
export const IMAGES_BASE_URL = `${BASE_URL}/public/`
export const MEETING_API_URL = `http://192.168.10.104:3900`
export const CHAT_API_URL = `http://192.168.10.104:3700`


// Chats
export const GET_CHATS_CONTACTS = id => `${CHAT_API_URL}/users/${id}/chats`

// Students
export const POST_STUDENT_LOGIN = `${BASE_URL}/authenticate/student`


// Meetings
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`


export const getProfileImageUrl = url => url ? IMAGES_BASE_URL + url : IMAGES_BASE_URL + "profile-pictures/default.png"


