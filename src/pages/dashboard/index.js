import React, { useEffect } from 'react';
// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import {
    Card, CardBody, Row, Col,
    Button, Table
} from 'reactstrap'

// ** Store & Actions
import { connect } from 'react-redux'

import { withRouter } from 'react-router';
import {
    getAllMeetings,
    getNewAssignments,
    getUpcomingTests,
    getRecentLessons,
    getIncompleteLessonsCount,
    selectLesson,
    selectTopic
} from '../../store/actions'
import UILoader from '../../@core/components/ui-loader';
import { DateTime } from '../../components/date-time'
import { GET_BLOG_IMAGE_URL } from '../../helpers/url_helper'

import UpcomingMeeting from '../meetings/UpcomingMeeting';
import moment from 'moment'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';
import './style.scss'

const Dashboard = (props) => {

    useEffect(() => {
        props.getUpcomingTests();
        props.getNewAssignments();
        props.getAllMeetings();
        props.getRecentLessons();
        props.getIncompleteLessonsCount();
    }, [])

    const getUpcomingMeeting = () => {
        let upcomingMeetings = props.meetings.filter(m => m.status == 'accepted' && moment(m.scheduledAt).isSameOrAfter(moment()))
        if (upcomingMeetings.length == 0) return null
        return upcomingMeetings[0]
    }

    const handleLesson = (lesson) => {
        props.selectTopic(lesson.topic);
        props.selectLesson(lesson.id);
        props.history.push('/lessons')
    }

    return (
        <Fragment >
            <UILoader blocking={
                props.meetingsLoading
                || props.recentLessonsLoading
                || props.newTestsLoading
                || props.newAssignmentsLoading
                || props.incompleteLessonsLoading
            } >
                <Card>
                    <CardBody >
                        <Row>
                            <Col sm='12' md='6' lg='3'>
                                <div
                                    className=" dashboard-stats-item">
                                    <div className="heading">
                                        Upcoming <br /> Tests
                                    </div>
                                    <div className="count text-primary">
                                        {
                                            props.newTests.length
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <div
                                    className=" dashboard-stats-item">
                                    <div className="heading">
                                        Upcoming <br /> Assignments
                                    </div>
                                    <div className="count text-primary">
                                        {
                                            props.newAssignments.length
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <div
                                    className=" dashboard-stats-item">
                                    <div className="heading">
                                        Incomplete <br /> Lessons
                                    </div>
                                    <div className="count text-primary">
                                        {
                                            props.incompleteLessons
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <div
                                    className=" dashboard-stats-item">
                                    <div className="heading">
                                        Upcoming <br /> Meetings
                                    </div>
                                    <div className="count text-primary">
                                        {
                                            props.meetings.length
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            {
                                getUpcomingMeeting() &&
                                <Col sm='12' md='12' lg='6' >
                                    <div className="shadow-container">
                                        <UpcomingMeeting meeting={getUpcomingMeeting()} />
                                    </div>
                                </Col>
                            }
                            <Col sm='12' md='12'
                                lg={getUpcomingMeeting() ? '6' : '12'}
                                className='d-flex'
                            >
                                <div className={`h-100 w-100 shadow-container  ${getUpcomingMeeting() ? 'ml-lg-2' : ''}`}>
                                    <div className={`d-flex align-items-center justify-content-between p-1`}>
                                        <h5 className='m-0'>
                                            Upcoming Assignments
                                        </h5>
                                        <Button.Ripple
                                            color='flat-primary'
                                            onClick={() => props.history.push("/assignments")}
                                        >
                                            View All
                                        </Button.Ripple>
                                    </div>
                                    {
                                        !props.newAssignmentsLoading &&
                                        props.newAssignmentsError &&
                                        <NoNetwork />
                                    }
                                    {
                                        !props.newAssignmentsLoading &&
                                        !props.newAssignmentsError &&
                                        props.newAssignments.length == 0 &&
                                        <NotFound />
                                    }
                                    {
                                        !props.newAssignmentsLoading &&
                                        !props.newAssignmentsError &&
                                        props.newAssignments.length > 0 &&
                                        <Table responsive hover >
                                            <tbody>
                                                {props.newAssignments.filter((na, i) => i < 9).map((a, index) =>
                                                    <tr key={"recent-lesson" + index}>
                                                        <td>
                                                            <div
                                                                className="d-flex justify-content-between align-items-center"
                                                            >
                                                                <div>
                                                                    {a.assignment.title}
                                                                </div>
                                                                <div className="text-primary">
                                                                    <DateTime dateTime={a.endDate} type="date" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}</tbody>
                                        </Table>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3 ">
                            <Col lg='12'>
                                <div className="shadow-container">
                                    <h5 className="p-1 m-0">
                                        Upcoming Tests
                                    </h5>
                                    {
                                        !props.newTestsLoading &&
                                        !props.newTestsError &&
                                        props.newTests.length == 0 &&
                                        <NotFound />
                                    }
                                    {
                                        !props.newTestsLoading && props.newTestsError &&
                                        <NoNetwork />
                                    }
                                    {
                                        !props.newTestsLoading &&
                                        !props.newTestsError &&
                                        props.newTests.length > 0 &&
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Test</th>
                                                    <th>Start Time</th>
                                                    <th>Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.newTests.map((t, index) =>
                                                    <tr key={'test-key' + index}>
                                                        <td>
                                                            <span className='align-middle font-weight-bold'>
                                                                {t.test.title}
                                                            </span>
                                                        </td>
                                                        <td><DateTime dateTime={t.startTime} type="date" /></td>
                                                        <td>{t.test.timeLimit / 60} mins</td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </Table>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <div className="pt-3">
                            <h5>
                                Recent Lessons
                            </h5>

                            {
                                !props.recentLessonsLoading &&
                                props.recentLessonsError &&
                                <NoNetwork />
                            }
                            {
                                !props.recentLessonsLoading &&
                                !props.recentLessonsError &&
                                props.recentLessons.length == 0 &&
                                <NotFound />
                            }
                            {
                                !props.recentLessonsLoading &&
                                !props.recentLessonsError &&
                                props.recentLessons.length > 0 &&
                                <Row>
                                    {
                                        props.recentLessons.map((l, index) =>
                                            <Col
                                                key={'topic-key-' + index}
                                                sm='12' md='6' lg='6'
                                                className='pl-1 pr-1 pb-1 '
                                                onClick={() => handleLesson(l)}
                                            >
                                                <div
                                                    className={`topic-item`}
                                                >
                                                    <div
                                                        className="topic-image"
                                                        style={{
                                                            backgroundImage: `url(${GET_BLOG_IMAGE_URL(l.topic.image.formats.thumbnail.url)})`
                                                        }}
                                                    >
                                                    </div>
                                                    <div className="topic-content">
                                                        <div
                                                            className="heading"
                                                        >
                                                            {l.title}
                                                        </div>
                                                        <div className="description">
                                                            {l.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                                </Row>
                            }
                        </div>
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        meetings,
        meetingsLoading,
        meetingsError,

    } = state.Meetings;
    const {
        newAssignments,
        newAssignmentsLoading,
        newAssignmentsError,
    } = state.Assignments;
    const {
        newTests,
        newTestsLoading,
        newTestsError,
    } = state.Tests;
    const {
        recentLessons,
        recentLessonsLoading,
        recentLessonsError,
        incompleteLessons,
        incompleteLessonsLoading,
        incompleteLessonsError,
    } = state.Lessons;
    return {
        meetings,
        meetingsLoading,
        meetingsError,
        newAssignments,
        newAssignmentsLoading,
        newAssignmentsError,
        newTests,
        newTestsLoading,
        newTestsError,
        recentLessons,
        recentLessonsLoading,
        recentLessonsError,
        incompleteLessons,
        incompleteLessonsLoading,
        incompleteLessonsError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getAllMeetings,
        getNewAssignments,
        getUpcomingTests,
        getRecentLessons,
        getIncompleteLessonsCount,
        selectLesson,
        selectTopic
    })(Dashboard)
)
