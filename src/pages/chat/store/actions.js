import {
  GET_CHAT_CONTACTS,
  GET_CHAT_CONTACTS_SUCCESS,
  GET_CHAT_CONTACTS_FAILURE,
  AUTHORIZED_SUCCESS,
  AUTHORIZED_FAILURE,
  API_ERROR,
  SET_ROOM_JOINED,
  SELECT_CHAT,
  GET_PREVIOUS_MESSAGES,
  GET_PREVIOUS_MESSAGES_SUCCESS,
  GET_PREVIOUS_MESSAGES_FAILURE,
  NEW_MESSAGE,
  NEW_MESSAGE_SUCCESS,
  NEW_MESSAGE_FAILURE,
  UPDATE_CHAT_HEAD_MESSAGE
} from './actionTypes'


export const getChatContacts = (userId) => {
  return {
    type: GET_CHAT_CONTACTS,
    payload: { userId }
  }
}

export const getChatContactsSuccess = (headList) => {
  return {
    type: GET_CHAT_CONTACTS_SUCCESS,
    payload: headList
  }
}

export const getChatContactsFailure = () => {
  return {
    type: GET_CHAT_CONTACTS_FAILURE
  }
}

export const authorizedSuccess = () => {
  return {
    type: AUTHORIZED_SUCCESS
  }
}

export const authorizedFailure = (error) => {
  return {
    type: AUTHORIZED_FAILURE,
    payload: error
  }
}

export const setRoomJoined = () => {
  return {
    type: SET_ROOM_JOINED,
  }
}

export const selectChat = (chat) => {
  return {
    type: SELECT_CHAT,
    payload: chat
  }
}
export const getPreviousMessages = (chatId, timeStamp) => {
  return {
    type: GET_PREVIOUS_MESSAGES,
    payload: { chatId, timeStamp }
  }
}

export const getPreviousMessagesSuccess = (messages) => {
  return {
    type: GET_PREVIOUS_MESSAGES_SUCCESS,
    payload: messages
  }
}

export const getPreviousMessagesFailure = (error) => {
  return {
    type: GET_PREVIOUS_MESSAGES_FAILURE,
    payload: error
  }
}


export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const newMessage = (msg) => {
  return {
    type: NEW_MESSAGE,
    payload: msg
  }
}

export const newMessageSuccess = (msgs) => {
  return {
    type: NEW_MESSAGE_SUCCESS,
    payload: msgs
  }
}

export const newMessageFailure = (msgs) => {
  return {
    type: NEW_MESSAGE_FAILURE,
    payload: msgs
  }
}


export const updateChatHeadMessage = (chats) => {
  return {
    type: UPDATE_CHAT_HEAD_MESSAGE,
    payload: chats
  }
}
