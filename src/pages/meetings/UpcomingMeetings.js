import React from 'react';
import { Bell, Plus } from 'react-feather';
import {
	Card,
	CardTitle,
	CardBody,
	CardText,
	Button,
	Row,
	Col,
} from 'reactstrap';
import Fade from 'reactstrap/lib/Fade';
import { upcomingMeetings } from './data';

const UpcomingMeetingItem = (props) => {
    return (
        <Row className="upcoming-meeting-item">
            <Col xs={10}>
                <div className='meetup-header d-flex align-items-center'>
                    <div className='meetup-day'>
                        <h6 className='mb-0'>THU</h6>
                        <h3 className='mb-0'>24</h3>
                    </div>
                    <div className='my-auto'>
                        <CardTitle tag='h4' className='mb-25'>
                            Introduction to Node.JS
                        </CardTitle>
                        <CardText className='mb-0'>Thursday 24 May, 2021</CardText>
                    </div>
                </div>
            </Col>
            <Col xs={2}>
                <Fade>
                    <Button.Ripple className="remind-me-btn btn-icon" color='primary'>
                        <Bell size={14} />
                    </Button.Ripple>
                </Fade>
                
            </Col>
        </Row>
	);
};

const UpcomingMeetings = (props) => {

	return (
		<Card className='card-developer-meetup card-upcoming-meetings' >
            <CardBody>
                <CardTitle>
                    Upcoming Meetings
                </CardTitle>
                <div className="upcoming-meeting-list">
                    <UpcomingMeetingItem />
                    <UpcomingMeetingItem />
                    <UpcomingMeetingItem />
                </div>
                <Button.Ripple
                    className="btn-block btn-icon"
                    color="primary">
                    <Plus size={14} /> New Meeting
                </Button.Ripple>
			</CardBody>
		</Card>
	);
};

export default UpcomingMeetings;
