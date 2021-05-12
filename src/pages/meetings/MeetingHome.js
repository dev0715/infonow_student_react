import React from 'react'
import { Row, Col } from 'reactstrap'
import MeetingList from './MeetingList'
import UpcomingMeeting from './UpcomingMeeting'
import UpcomingMeetings from './UpcomingMeetings'


function MeetingHome() {

    return (
        <Row>
            <Col lg={7}>
                <UpcomingMeeting />
            </Col>
            <Col lg={5} style={{maxWidth:500}}>
                <UpcomingMeetings />
            </Col>
            <Col lg={12}>
                <MeetingList/>
            </Col>
        </Row>
    )
}

export default MeetingHome
