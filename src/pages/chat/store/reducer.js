
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
  user: JSON.parse(localStorage.getItem('authUser'))
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
