import React from 'react';
import { useEffect } from 'react';
import Avatar from '@components/avatar'
import { Bell, Calendar, MapPin } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { Card, CardTitle, CardBody, CardText, Media, Button, Row, Col } from 'reactstrap'
import { useSkin } from '@hooks/useSkin'

const UpcomingMeeting = (props) => {

    const [skin, setSkin] = useSkin();

    const illus = skin === 'dark' ? 'upcoming-meeting-dark.svg' : 'upcoming-meeting.svg'
    const illustration = require(`@src/assets/images/illustrations/${illus}`).default    

    return (
        <Card className='card-developer-meetup'>
            <div className='meetup-img-wrapper rounded-top text-center pt-3'>
                <img src={illustration} height="170" />
            </div>
            <CardBody>
                <div className='meetup-header d-flex align-items-center'>
                    <div className='meetup-day'>
                        <h6 className='mb-0'>THU</h6>
                        <h3 className='mb-0'>24</h3>
                    </div>
                    <div className='my-auto'>
                        <CardTitle tag='h4' className='mb-25'>
                            Upcoming Meeting
                        </CardTitle>
                        <CardText className='mb-0'>Introduction to Node.JS</CardText>
                        
                    </div>
                </div>
                <div className="float-right">
                    <Button.Ripple className="mr-1" outline color='primary'>
                        <Bell size={14} />
                        <span className='align-middle ml-25'>Remind Me</span>
                    </Button.Ripple>
                    <Button.Ripple className="mr-1" color='primary'>
                        <span className='align-middle ml-25'>Join</span>
                    </Button.Ripple>
                </div>
                <Media>
                    <Avatar color='light-primary' className='rounded mr-1' icon={<Calendar size={18} />} />
                    <Media body>
                        <h6 className='mb-0'>Sat, May 25, 2020</h6>
                        <small>10:AM to 11:AM</small>
                    </Media>
                </Media>
            </CardBody>
        </Card>
    )
}

export default UpcomingMeeting
