
// export const BASE_URL = `http://192.168.10.102:3600`
// export const DOCUMENT_BASE_URL = `${BASE_URL}/public`
// export const MEETING_API_URL = `http://192.168.10.104:3900`
// export const MEETING_APP_URL = `http://192.168.10.104:3002`
// export const CHAT_API_URL = `http://192.168.10.104:3700`
// export const CHAT_SOCKET_API_URL = `http://192.168.10.104:3701`
// export const BLOG_API_URL = `http://192.168.10.102:1337`

export const BASE_URL = `https://api.infonow.ro`
export const DOCUMENT_BASE_URL = `${BASE_URL}/public`
export const MEETING_API_URL = `https://meet.infonow.ro/api`
export const MEETING_APP_URL = `https://meet.infonow.ro`
export const CHAT_API_URL = `https://chat.infonow.ro/`
export const CHAT_SOCKET_API_URL = `https://live-chat.infonow.ro/`
export const BLOG_API_URL = `https://cms.infonow.ro/`

export const GET_IMAGE_URL = url => url ? DOCUMENT_BASE_URL + url : DOCUMENT_BASE_URL + "/profile-pictures/default.png"

export const GET_BLOG_IMAGE_URL = url => BLOG_API_URL + url

export const GET_DOCUMENT_URL = url => DOCUMENT_BASE_URL + url


//Get Started

export const GET_STARTED_CONTENT = `${BASE_URL}/api/v1/strapi/content/student_content`



// Teacher History
export const All_TEACHERS = `${BASE_URL}/api/v1/teachers/all-teachers?limit=1000&page=1`;
export const TEACHER = `${BASE_URL}/api/v1/teachers`;

// Chats

export const CHATS = `${CHAT_API_URL}/chats`
export const GET_CHATS_CONTACTS = id => `${CHAT_API_URL}/users/${id}/chats`
export const GET_CHAT_DOCUMENTS = id => `${BASE_URL}/documents?chatId=${id}`
export const UPDATE_USER = id => `${BASE_URL}/api/v1/students/${id}/profile`

// Students
export const POST_STUDENT_LOGIN = `${BASE_URL}/authenticate/student`
export const SIGN_IN_WITH_GOOGLE = `${BASE_URL}/authenticate-with-google/student`
export const SETUP_ACCOUNT_PASSWORD = `${BASE_URL}/setup-password`
export const RESET_PASSWORD = `${BASE_URL}/reset-password`
export const REGISTER = `${BASE_URL}/register`
export const FORGOT_PASSWORD = `${BASE_URL}/forget-password`
export const GET_USER_DATA = (userId) => `${BASE_URL}/api/v1/students/${userId}`


// Meetings
export const MEETING_TOKEN = `${MEETING_API_URL}/users/authenticate`
export const NEW_MEETING = `${MEETING_API_URL}/meetings`
export const UPDATE_MEETING = (id, action) => `${MEETING_API_URL}/meetings/${id}/${action}`
export const GET_ALL_MEETINGS = id => `${MEETING_API_URL}/users/${id}/meetings`
export const GET_MEETING_DATES = id => `${MEETING_API_URL}/meetings/check-dates/${id}`
export const GET_ADMIN_MEETING = id => `${MEETING_API_URL}/users/${id}/admin-meeting`
export const NEW_ADMIN_MEETING = `${MEETING_API_URL}/meetings/admin-meeting`

//Document

export const UPLOAD_DOCUMENT_URL = `${BASE_URL}/documents`;
export const GET_USER_DOCUMENTS = `${BASE_URL}/documents`
export const DELETE_USER_DOCUMENTS = id => `${BASE_URL}/documents/${id}`

//Blog
export const GET_BLOG_LIST = `${BASE_URL}/api/v1/strapi/blogs`
export const GET_BLOG = id => `${BASE_URL}/api/v1/strapi/blogs/${id}`
export const GET_BLOG_CATEGORIES = `${BASE_URL}/api/v1/strapi/categories`
export const GET_BLOG_COMMENTS = id => `${BASE_URL}/api/v1/strapi/blogs/${id}/comments`
export const COMMENT_ON_BLOG = `${BASE_URL}/api/v1/strapi/comments`

export const UPLOAD_BLOG_IMAGE_URL = `${BASE_URL}/api/v1/strapi/uploads`;

//Lessons

export const NEW_TOPICS = `${BASE_URL}/api/v1/strapi/topics`
export const TOPICS = `${BASE_URL}/api/v1/strapi/topics`
export const LESSON = id => `${BASE_URL}/api/v1/strapi/lessons/${id}`
export const STUDENT_LESSONS = `${BASE_URL}/api/v1/strapi/student-lessons/`
export const GET_TOPIC_LESSONS = id => `${BASE_URL}/api/v1/strapi/topics/${id}/lessons`
export const GET_RECENT_LESSONS = `${BASE_URL}/api/v1/strapi/recent-lessons`
export const GET_INCOMPLETE_LESSON_COUNT = `${BASE_URL}/api/v1/strapi/lessons?isCompleted=0`

//Tests 

export const GET_PAST_TESTS = `${BASE_URL}/api/v1/tests/past-tests`
export const GET_UPCOMING_TESTS = `${BASE_URL}/api/v1/tests/upcoming-tests`
export const POST_TEST_ATTEMPT = `${BASE_URL}/api/v1/attempts`
export const SUBMIT_TEST_ATTEMPT = `${BASE_URL}/api/v1/attempts`
export const GET_TEST_ATTEMPT_DETAILS = id => `${BASE_URL}/api/v1/tests/${id}/attempts`

// Assignments


export const ASSIGNMENT_ATTEMPT = `${BASE_URL}/api/v1/assignment-attempts`
export const NEW_ASSIGNMENTS = `${BASE_URL}/api/v1/assignments/upcoming-assignments`
export const PAST_ASSIGNMENTS = `${BASE_URL}/api/v1/assignments/past-assignments`
export const GET_ASSIGNMENT_ATTEMPT = id => `${BASE_URL}/api/v1/assignments-attempts/${id}`
export const GET_ASSIGNMENT = id => `${BASE_URL}/api/v1/assignments/${id}`


//Profile
export const UPDATE_PROFILE_DATA = id => `${BASE_URL}/api/v1/students/${id}/profile`
export const UPLOAD_PROFILE_PICTURE = id => `${BASE_URL}/api/v1/students/${id}/profile-picture`
export const UPDATE_PASSWORD = id => `${BASE_URL}/api/v1/students/${id}/password`

// Counties
export const GET_COUNTIES = `${BASE_URL}/counties`

// Feedback
export const POST_FEEDBACK = `${BASE_URL}/api/v1/osticket`