import React from 'react';
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import {
    Card, CardBody, Row, Col,
    Button,
    Table,
} from 'reactstrap'

// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import { getNewAssignments, getPastAssignments, selectAssignment } from './store/actions'

import { withRouter, } from 'react-router';

import UILoader from '../../@core/components/ui-loader';

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';
import { DateTime } from '../../components/date-time';
import './style.scss'

import moment from 'moment'

import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const AppAssignments = (props) => {

    useEffect(() => {
        props.getNewAssignments();
        props.getPastAssignments();
    }, [])

    const goToNewAssignmentList = () => {
        props.history.push("/new-assignments")
    }

    const goToPastAssignmentList = () => {
        props.history.push("/past-assignments")
    }

    const goToAssignment = (a) => {
        props.selectAssignment(a)
        props.history.push(`/assignments/details`)
    }

    const handleAssignmentAttempt = (a) => {
        if (moment().isAfter(moment(a.startDate))) {
            return MySwal.fire({
                icon: 'question',
                title: "Confirm",
                text: 'Are you sure you want to start the assignment?',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1'
                },
                showCancelButton: true,
                confirmButtonText: 'Yes',
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    goToAssignment(a)
                }
            })
        }
    }

    return (
        <Fragment >
            <UILoader
                blocking={props.newAssignmentsLoading || props.pastAssignmentsLoading}
                className="w-100">
                <Card >
                    <CardBody >
                        <Row>
                            <Col sm='12'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 >
                                        New Assignments
                                    </h5>
                                    <Button.Ripple color='flat-primary'
                                        onClick={() => goToNewAssignmentList()}
                                    >
                                        View All
                                    </Button.Ripple>
                                </div>
                            </Col>
                            <Col sm='12 mt-2'>
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
                                    <Table responsive hover className="pb-2">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Start Date</th>
                                                <th>Due Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.newAssignments.filter((as, index) => index < 5).map((a, index) =>
                                                <tr key={"new-assign" + index} >
                                                    <td>
                                                        {a.assignment.title}
                                                    </td>
                                                    <td><DateTime dateTime={a.startDate} type="date" /></td>
                                                    <td><DateTime dateTime={a.endDate} type="date" /></td>
                                                    <td>
                                                        {
                                                            moment().isAfter(moment(a.startDate)) &&
                                                            <Button.Ripple color='flat-primary'
                                                                onClick={() => handleAssignmentAttempt(a)}
                                                            >
                                                                Start
                                                            </Button.Ripple>
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col sm='12'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 >
                                        Past Assignments
                                    </h5>
                                    <Button.Ripple color='flat-primary'
                                        onClick={() => goToPastAssignmentList()}
                                    >
                                        View All
                                    </Button.Ripple>
                                </div>
                            </Col>
                            <Col sm='12 mt-2'>
                                {
                                    !props.pastAssignmentsLoading &&
                                    props.pastAssignmentsError &&
                                    <NoNetwork />
                                }
                                {
                                    !props.pastAssignmentsLoading &&
                                    !props.pastAssignmentsError &&
                                    props.pastAssignments.length == 0 &&
                                    <NotFound />
                                }
                                {
                                    !props.pastAssignmentsLoading &&
                                    !props.pastAssignmentsError &&
                                    props.pastAssignments.length > 0 &&
                                    <Table responsive hover className="mb-">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Submission Date</th>
                                                <th>Marks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.pastAssignments.filter((as, index) => index < 5).map((a, index) =>
                                                <tr key={"new-assign" + index}
                                                    onClick={() => goToAssignment(a)}
                                                >
                                                    <td>
                                                        {a.assignment.title}
                                                    </td>
                                                    <td>
                                                        {
                                                            a.assignmentAttempt ?
                                                                <DateTime dateTime={a.assignmentAttempt.submittedAt} type="date" />
                                                                : "..."
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            a.assignmentAttempt ?
                                                                <div>
                                                                    {
                                                                        a.assignmentAttempt.obtainedMarks || "..."
                                                                    }
                                                                    /
                                                                    {
                                                                        a.assignment.totalMarks
                                                                    }
                                                                </div>
                                                                : "..."
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        newAssignments,
        newAssignmentsLoading,
        newAssignmentsError,
        pastAssignments,
        pastAssignmentsLoading,
        pastAssignmentsError,
    } = state.Assignments;
    return {
        newAssignments,
        newAssignmentsLoading,
        newAssignmentsError,
        pastAssignments,
        pastAssignmentsLoading,
        pastAssignmentsError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getNewAssignments, getPastAssignments, selectAssignment
    })(AppAssignments)
)
