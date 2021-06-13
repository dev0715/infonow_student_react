
import {
  GET_CHAT_CONTACTS_SUCCESS,
  GET_CHAT_CONTACTS_FAILURE,
  AUTHORIZED_SUCCESS,
  AUTHORIZED_FAILURE,
  SET_ROOM_JOINED,
  SELECT_CHAT,
  GET_PREVIOUS_MESSAGES_SUCCESS,
  GET_PREVIOUS_MESSAGES_FAILURE,
  NEW_MESSAGE,
  NEW_MESSAGE_SUCCESS,
  NEW_MESSAGE_FAILURE,
  UPDATE_CHAT_HEAD_MESSAGE,
  UPDATE_CHAT_PARTICIPANTS
} from './actionTypes'

const initialState = {
  chats: [],
  chatError: "",
  authError: "",
  isAuthorized: false,
  isRoomsJoined: false,
  messages: [],
  userProfile: {},
  selectedChat: {},
  selectedUser: {},
  socket: null,
  error: "",
  loading: false,

  user: {
    "user": {
      "userId": "7afdfa56-817b-4367-b8db-a071b1253ad2",
      "name": "testTeacher",
      "email": "teacher@mail.com",
      "profilePicture": 'http://192.168.10.102:3600/public/profile-pictures/test.jpeg',
      "createdAt": "2021-05-20T07:48:04.000Z",
      "updatedAt": "2021-05-20T07:48:04.000Z",
      "role": {
        "roleName": "Teacher",
        "createdAt": "2021-05-20T07:41:34.000Z",
        "updatedAt": "2021-05-20T07:41:34.000Z"
      },
      "teacher": {
        "status": "approved",
        "createdAt": "2021-05-20T07:48:04.000Z",
        "updatedAt": "2021-05-21T07:21:20.000Z",
        "students": [
          {
            "status": "active",
            "createdAt": "2021-05-20T07:47:47.000Z",
            "updatedAt": "2021-05-20T07:54:46.000Z",
            "user": {
              "userId": "87713236-cb37-4ec9-9107-9f463d930c29",
              "name": "testStudent",
              "email": "student@mail.com",
              "profilePicture": 'http://192.168.10.102:3600/public/profile-pictures/test.jpeg',
              "createdAt": "2021-05-20T07:47:47.000Z",
              "updatedAt": "2021-05-20T07:47:47.000Z"
            }
          },
          {
            "status": "active",
            "createdAt": "2021-05-20T07:52:46.000Z",
            "updatedAt": "2021-05-20T07:55:36.000Z",
            "user": {
              "userId": "68633662-88bb-4dd0-99fa-1dc35d60842e",
              "name": "testStudentNew",
              "email": "student2@mail.com",
              "profilePicture": 'http://192.168.10.102:3600/public/profile-pictures/test.jpeg',
              "createdAt": "2021-05-20T07:52:46.000Z",
              "updatedAt": "2021-05-20T07:52:46.000Z"
            }
          }
        ]
      }
    },
    "tokenType": "EJWT",
    "token": "U2FsdGVkX180aTB4qMj7M7LH7HRpYKA6Xv91JWgi81ULGqqNTTrGxi8Tk48lG+j8cRPiWdWJ/INAeIgFlhnAuxlGI44sj/7sUeZb6YGoCn3X7CULuah4+AzR7dDXOhSYriubuP4n6UXf/8DwjDxB+GsI8URQ9wEv02+Ksbxu3I9YcWtK7Z1wRL6J2aQL75CdvS1UjiYz9jeBOMQEQdIOt8b8HONZ2veK5/TvQw21moN63vCKrVCFrBzsNl47PDcFny9aFxPTVLU8W3vszdCBze6Ov1mg4axJSTclUERgQmulkrQHsFs+GpnhDb1EYv0gKGJOWcfHuEk5rIzv1TZy/oDh3z1nt0fj6czGXZqD7CCOS6sdFCAxvSHOIsDCizWALowzkUuIVlE1fwRq1hKe4dWgrKsGoe53VhLkeDlS4ae8t5ut0q8MgQfPlsuQoFxB3GI0XK62tExMiZiV50dpRYAdzikuZkxcHS0F1mX6rv4dGcXQnTpZjlhSIp0yTcgAOCujZ2K0xbP+3dU4hJf3XCOgKhCPhHID6zfbHcM6C3arfLfDWvgKHkrABZeqsxzZE6c3LZ2FStST3m5bMvxBEjEEgBpIs71kYOgNx1unkbWzsEtOF0ZDbk2i+beceGjkHrDdYFG5uvbR2533SZIcrM6fNC2e5LhS5MgwTI9QrFnCS7tb3ngSGxETHmtxqlcfSIar/+3TICxaJ+cx0dc7jl6hTb/FTNZojnKYU8V3ZJuoMFlDNBPPuJTBOMJx73FOPUoKFSqwhWaNU9XWsP0HBEGBa4m2DB0BKxe+Z4vxsbLoEeIalwLX3y/XWJYJs1DAB1tdAcAQAk8CoQGJNVekzJACPZuFzMgdu2hJyxPkZTm22DgGeOuoFtgllSMDk3xYfSMJSeotwWVa+Hwz+Ch3f1nVO3sQo95+SKWhJPifGSM9h767SBhV2srTzrNsXJniQG1qIzEH4/5QljVHCVyVjAV24IOTXi1r/S2j3S5ieRGRF4VfCmV6I1D97Ojy2JWk1tfDBK8bereXKwtrh/6ig2TvyOJHb1T139CpHEOB9KB2zKgZgM6eMxH4ChUV3+baa8JBdH8h0JXVHyiWFPc52oAczGmboQOEtz7V7rA6L+kHi4y7Es2PMXxxByPmmQDIweH3Gcz+ztrIabdOw1FZDQwcpAFFz61OLZn1Ou/m+J7AnBYS4ibV8Ih4BnPYlcNEu/45nTeJqapQdmWy4Y35pJpPsPwflB8vRFNZh642BaLl2sbMEXQbLB+ppr7yyW93TznCG1AOe2PRUMJWbOgm3kV7hdPh/zZ0WIQQLGWp6UuJ+srxvSreoH8K9YvUXL/I5cSUFFBe/7g3oEjoO1kJlCMgbMufe/p4ZfTX/SV302yL3n2KKYAQ5Rgvwwa1jrwoQqN3bjcxFFHsIbbvXdkYmxb/B6vwaKloqzpW/zlNE/g87PSW/15BLyqJKKok4nrAfzMfNk09qhcMX8BnG1H0yIfIRmo58GS2JD48gVZgNk0N4fZaMNQIo8wsciLyZ1s1cNFif9+9C8G8C21TZpvTi5Su2WtYUQRxf9IlRZl6+f4dcNoqiyUGk+vMiDK8in4990ENrutuJKmANpovbN+BXkwomPmXpr7M5Ar0IZwHDBdu3MoNaheyY0Jmtww5DgnXl+H7pyDYZEHzYKO9JFl6aOBn4PrakQWybg9wAHVQa3rieKwkR5YMyVvsGoKNBJSKJp+t2Q6QgxFqQ0d1FoRAAllTxLlnXO7sAtEn30Tr5LUHLyCTuEe1N6BiKGYQWq18AMFzvZ3m8ursOur5Z8OSjc9bjUQ9Q1nDQj/97ChzJR3jAsTpIdiELbdpPzlh6J7s"
  },
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CHAT_CONTACTS_SUCCESS:
      return { ...state, chats: action.payload, chatsError: {} }
    case GET_CHAT_CONTACTS_FAILURE:
      return { ...state, chats: [], chatsError: action.payload }
    case AUTHORIZED_SUCCESS:
      return { ...state, isAuthorized: true, authError: "" }
    case AUTHORIZED_FAILURE:
      return { ...state, isAuthorized: false, authError: action.payload }
    case SET_ROOM_JOINED:
      return { ...state, isRoomsJoined: true }
    case SELECT_CHAT:
      return { ...state, selectedChat: action.payload, messages: [] }
    case GET_PREVIOUS_MESSAGES_SUCCESS:
      return { ...state, messages: [...action.payload, ...state.messages] }
    case GET_PREVIOUS_MESSAGES_FAILURE:
      return { ...state, messagesError: action.payload }
    case NEW_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    case NEW_MESSAGE_SUCCESS:
      return { ...state, messages: action.payload }
    case NEW_MESSAGE_FAILURE:
      return { ...state, messages: action.payload }
    case UPDATE_CHAT_HEAD_MESSAGE:
      let chat = state.chats.find(c => c.chatId === action.payload.chatId);
      if (action.payload.success) {
        chat.messages[0] = action.payload.data
      }
      else {
        chat.messages[0].error = true
      }
      return { ...state, chats: state.chats }
    case UPDATE_CHAT_PARTICIPANTS:
      let chatHead = state.chats.find(c => c.chatId === action.payload.chatId);
      if (chatHead) {
        chatHead.chatParticipants = action.payload.data
      }
      return { ...state, chats: state.chats }

    default:
      return state
  }
}

export default chatReducer
