
export const BASE_URL = `http://192.168.10.102:3600`
export const DOCUMENT_BASE_URL = `${BASE_URL}/public`
export const MEETING_API_URL = `http://192.168.10.104:3900`
export const CHAT_API_URL = `http://192.168.10.104:3700`

export const BLOG_API_URL = `http://192.168.10.102:1337`


export const GET_IMAGE_URL = url => url ? DOCUMENT_BASE_URL + url : DOCUMENT_BASE_URL + "/profile-pictures/default.png"

export const GET_BLOG_IMAGE_URL = url => BLOG_API_URL + url

export const GET_DOCUMENT_URL = url => DOCUMENT_BASE_URL + url



// Chats
export const GET_CHATS_CONTACTS = id => `${CHAT_API_URL}/users/${id}/chats`
export const GET_CHAT_DOCUMENTS = id => `${BASE_URL}/documents?chatId=${id}`
export const UPDATE_USER = id => `${BASE_URL}/api/v1/students/${id}/profile`

// Students
export const POST_STUDENT_LOGIN = `${BASE_URL}/authenticate/student`


// Meetings
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`
export const UPLOAD_DOCUMENT_URL = `${BASE_URL}/documents`;

//Document
export const GET_USER_DOCUMENTS = `${BASE_URL}/documents`
export const DELETE_USER_DOCUMENTS = id => `${BASE_URL}/documents/${id}`

//Blog
export const GET_BLOG_LIST = `${BASE_URL}/api/v1/strapi/blogs`
export const GET_BLOG = id => `${BASE_URL}/api/v1/strapi/blogs/${id}`
export const GET_BLOG_CATEGORIES = `${BASE_URL}/api/v1/strapi/categories`
export const COMMENT_ON_BLOG = `${BASE_URL}/api/v1/strapi/blogs/`