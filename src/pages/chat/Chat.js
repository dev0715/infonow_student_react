import React from 'react';
// ** React Imports
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button
} from 'reactstrap'
import moment from 'moment';

import { v4 } from "uuid"
import { sendMessage } from './socket/events';

const ChatLog = props => {
  // ** Props & Store
  const { handleUser, handleUserSidebarRight, handleSidebar,
    userSidebarLeft, selectedChat, newMessage,
    user, messages, socket } = props
  // const { userProfile, selectedChat } = store

  // ** Refs & Dispatch
  const chatArea = useRef(null)

  // ** State
  const [msg, setMsg] = useState('')

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  }

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    const selectedUserLen = Object.keys(selectedChat).length

    if (selectedUserLen) {
      scrollToBottom()
    }
  }, [selectedChat])


  // ** Renders user chat
  const renderChats = () => {
    return messages.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.user.userId !== user.userId
          })}
        >
          <div className='chat-avatar'>
            <Avatar
              className='box-shadow-1 cursor-pointer'
              img={item.user.userId !== user.userId ? item.user.profilePicture : user.profilePicture}
            />
          </div>

          <div className='chat-body'>
            <div key={item.messageId} className='chat-content'>
              <p>{item.content}</p>
              <p>{moment(item.createdAt).format("d MMM YYYY, hh:mm:ss")}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = obj => {
    handleUserSidebarRight()
    handleUser(obj)
  }

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (!Object.keys(selectedChat).length && !userSidebarLeft && window.innerWidth <= 1200) {
      handleSidebar()
    }
  }

  // ** Sends New Msg
  const handleSendMsg = e => {
    e.preventDefault()
    if (msg.length) {
      let message = {
        content: msg,
        messageId: v4(),
        createdAt: moment(),
        user: user
      }
      sendMessage(socket, selectedChat.chatId, msg, message.messageId)
      newMessage(message)
      setMsg('')
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = Object.keys(selectedChat).length > 0 ? PerfectScrollbar : 'div'

  return (
    <div className='chat-app-window'>
      <div className={classnames('start-chat-area', { 'd-none': Object.keys(selectedChat).length })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {Object.keys(selectedChat).length ? (
        <div className={classnames('active-chat', { 'd-none': selectedChat === null })}>
          <div className='chat-navbar'>
            <header className='chat-header'>
              <div className='d-flex align-items-center'>
                <div className='sidebar-toggle d-block d-lg-none mr-1' onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight='36'
                  imgWidth='36'
                  img={selectedChat.type == 'group'
                    ? '' //TODO: Add group picture here
                    : selectedChat.chatParticipants.find(u => u.user.userId != user.userId).user.profilePicture}
                  // status={selectedChat.contact.status}
                  className='avatar-border user-profile-toggle m-0 mr-1'
                // onClick={() => handleAvatarClick(selectedChat.contact)}
                />
                <h6 className='mb-0'>{selectedChat.type == 'group'
                  ? selectedChat.groupName
                  : selectedChat.chatParticipants.find(u => u.user.userId != user.userId).user.name}</h6>
              </div>
              <div className='d-flex align-items-center'>
                {/* <PhoneCall size={18} className='cursor-pointer d-sm-block d-none mr-1' />
                <Video size={18} className='cursor-pointer d-sm-block d-none mr-1' /> */}
                <Search size={18} className='cursor-pointer d-sm-block d-none' />
                <UncontrolledDropdown>
                  <DropdownToggle className='btn-icon' color='transparent' size='sm'>
                    <MoreVertical size='18' />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>

          <ChatWrapper ref={chatArea} className='user-chats' options={{ wheelPropagation: false }}>
            {Object.keys(selectedChat).length ? <div className='chats'>{renderChats()}</div> : null}
          </ChatWrapper>

          <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
            <InputGroup className='input-group-merge mr-1 form-send-message'>
              <Input
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder='Type your message...'
              />
              <InputGroupAddon addonType='append'>
                <InputGroupText>
                  <Label className='attachment-icon mb-0' for='attach-doc'>
                    <i className='cursor-pointer text-secondary la la-paperclip la-2x' />
                    <input type='file' id='attach-doc' hidden />
                  </Label>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button className='send' color='primary'>
              <Send size={14} className='d-lg-none' />
              <span className='d-none d-lg-block'>Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ChatLog
