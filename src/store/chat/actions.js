import axios from 'axios'

import {
    GET_USER_PROFILE,
    GET_CHAT_CONTACTS,
    SELECT_CHAT,
    SEND_MSG
} from './actionTypes'


const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2)
const data = {
  profileUser: {
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
  },
  contacts: [
    {
      id: 1,
      fullName: 'Felecia Rower',
      role: 'Frontend Developer',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',

      avatar: require('@src/assets/images/portrait/small/avatar-s-2.jpg').default,
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Adalberto Granzin',
      role: 'UI/UX Designer',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-1.jpg').default,
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Joaquina Weisenborn',
      role: 'Town planner',
      about:
        'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Verla Morgano',
      role: 'Data scientist',
      about:
        'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-4.jpg').default,
      status: 'online'
    },
    {
      id: 5,
      fullName: 'Margot Henschke',
      role: 'Dietitian',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatar: require('@src/assets/images/portrait/small/avatar-s-5.jpg').default,
      status: 'busy'
    },
    {
      id: 6,
      fullName: 'Sal Piggee',
      role: 'Marketing executive',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
      status: 'online'
    },
    {
      id: 7,
      fullName: 'Miguel Guelff',
      role: 'Special educational needs teacher',
      about:
        'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Mauro Elenbaas',
      role: 'Advertising copywriter',
      about:
        'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
      status: 'away'
    },
    {
      id: 9,
      fullName: 'Bridgett Omohundro',
      role: 'Designer, television/film set',
      about:
        'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      status: 'offline'
    },
    {
      id: 10,
      fullName: 'Zenia Jacobs',
      role: 'Building surveyor',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatar: require('@src/assets/images/portrait/small/avatar-s-10.jpg').default,
      status: 'away'
    }
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'If it takes long you can mail me at my mail address.',
          time: dayBeforePreviousDay,
          senderId: 11
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      unseenMsgs: 1,
      chat: [
        {
          message: "How can we help? We're here for you!",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'It should be Bootstrap 4 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Modern admin is the responsive bootstrap 4 admin template.!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Looks clean and fresh UI.',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: "It's perfect for my next project.",
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Thanks, from ThemeForest.',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'I will purchase it for sure. 👍',
          time: previousDay,
          senderId: 1
        }
      ]
    }
  ]
}



// ** Get User Profile
export const getUserProfile = () => {
  return dispatch => {
    return dispatch({ type: GET_USER_PROFILE, userProfile: {
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
      type: GET_CHAT_CONTACTS,
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
      type: SELECT_CHAT,
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
      dispatch({ type: SEND_MSG, data: res.data })
      dispatch(selectChat(obj.contact.id))
    })
  }
}
