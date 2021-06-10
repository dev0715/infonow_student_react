import axios from 'axios'



// ** Get User Profile
export const getUserProfile = () => {
  return dispatch => {
    return dispatch({ type: 'GET_USER_PROFILE', userProfile: {
      id: 11,
      avatar: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
      fullName: 'John Doe',
      role: 'admin',
      about:
        'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
      status: 'online',
      settings: {
        isTwoStepAuthVerificationEnabled: true,
        isNotificationsOn: false
      }
    }})
    // return axios.get('/apps/chat/users/profile-user').then(res => {
    //   return dispatch({
    //     type: 'GET_USER_PROFILE',
    //     userProfile: res.data
    //   })
    // })
  }
}

// ** Get Chats & Contacts
export const getChatContacts = () => {
  return dispatch => {
    dispatch({
      type: 'GET_CHAT_CONTACTS',
      data: (() => {
        const chatsContacts = data.chats.map(chat => {
          const contact = data.contacts.find(c => c.id === chat.userId)
          contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.chat[chat.chat.length - 1] }
          return contact
        })
        const profileUserData = {
          id: data.profileUser.id,
          avatar: data.profileUser.avatar,
          fullName: data.profileUser.fullName,
          status: data.profileUser.status
        }
        return { chatsContacts, contacts: data.contacts, profileUser: profileUserData }
      })()
    })
    // axios.get('/apps/chat/chats-and-contacts').then(res => {
    //   dispatch({
    //     type: 'GET_CHAT_CONTACTS',
    //     data: res.data
    //   })
    // })
  }
}

// ** Select Chat
export const selectChat = id => {
  return dispatch => {
    let userId = id
    const chat = data.chats.find(c => c.id === userId)
    if (chat) chat.unseenMsgs = 0
    const contact = data.contacts.find(c => c.id === userId)
    if (contact.chat) contact.chat.unseenMsgs = 0
    let d = { chat, contact }
    dispatch({
      type: 'SELECT_CHAT',
      data: d
    })
    dispatch(getChatContacts())
    // axios.get('/apps/chat/get-chat', { id }).then(res => {
    //   dispatch({ type: 'SELECT_CHAT', data: res.data })
    //   dispatch(getChatContacts())
    // })
  }
}

// ** Send Msg
export const sendMsg = obj => {
  return dispatch => {
    axios.post('/apps/chat/send-msg', { obj }).then(res => {
      dispatch({ type: 'SEND_MSG', data: res.data })
      dispatch(selectChat(obj.contact.id))
    })
  }
}
