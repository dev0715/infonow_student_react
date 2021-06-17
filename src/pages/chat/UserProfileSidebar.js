import React from 'react';
// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Mail, PhoneCall, Clock, Tag, Star, Image, Trash, Slash } from 'react-feather'
import { getProfileImageUrl } from '../../helpers/url_helper';

const UserProfileSidebar = props => {
  // ** Props
  const { user, selectedChat, handleUserSidebarRight, userSidebarRight } = props

  return (
    Object.keys(selectedChat).length > 0
    &&
    < div className={classnames('user-profile-sidebar', {
      show: userSidebarRight === true
    })}>
      <header className='user-profile-header'>
        <span className='close-icon' onClick={handleUserSidebarRight}>
          <X size={14} />
        </span>
        <div className='header-profile-sidebar'>
          <Avatar
            className='box-shadow-1 avatar-border'
            size='xl'
            // status={user.status}
            img={getProfileImageUrl(selectedChat.type == 'group'
              ? selectedChat.groupPicture || null
              : selectedChat.chatParticipants.find(u => u.user.userId != user.userId).user.profilePicture)
            }
            imgHeight='70'
            imgWidth='70'
          />
          <h4 className='chat-user-name'> {
            selectedChat.type == 'group'
              ? selectedChat.groupName
              : selectedChat.chatParticipants.find(u => u.user.userId != user.userId).user.name
          }
          </h4>
          {/* <span className='user-post'>{user.role}</span> */}
        </div>
      </header>
      <PerfectScrollbar className='user-profile-sidebar-area' options={{ wheelPropagation: false }}>
        {
          selectedChat.type != "group" &&
          <>
            <h6 className='section-label mb-1'>About</h6>
            <p>
              {
                selectedChat.chatParticipants.find(cp => cp.user.userId != user.userId).user.about || "no about"
              }
            </p>
          </>
        }
        <div className='personal-info'>
          {
            selectedChat.type == "group" &&
            <>
              <h6 className='section-label mb-1 mt-3'>Group Information</h6>
              <ul className='list-unstyled'>
                {
                  selectedChat.chatParticipants.filter(cp => cp.user.userId != user.userId).map(c =>
                    <li className='mb-1'>
                      <div>
                        <Avatar
                          img={getProfileImageUrl(c.user.profilePicture)}
                          imgHeight='14'
                          imgWidth='14'
                        />
                        <span className="pl-1">
                          {
                            c.user.name
                          }
                        </span>
                      </div>
                    </li>
                  )
                }
              </ul>
            </>
          }

        </div>
        <div className='more-options'>
          <h6 className='section-label mb-1 mt-3'>Shared Media</h6>
          <ul className='list-unstyled'>
            <li className='cursor-pointer mb-1'>
              <Star className='mr-50' size={17} />
              <span className='align-middle'> Important Contact</span>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div >
  )
}

export default UserProfileSidebar
