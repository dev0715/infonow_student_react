import React from 'react';
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import {
    Card, CardBody, Row, Col,
    Collapse,
    Navbar,
    NavbarToggler,
    Button, Table,
    CardTitle,
    CardHeader, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap'



// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import { getPastTests, getUpcomingTests, newTestAttempt, submitTestAttempt } from './store/actions'

import { withRouter } from 'react-router';


import UILoader from '../../@core/components/ui-loader';

import { notifyError } from '../../utility/toast'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';

import { DateTime } from '../../components/date-time';


import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const AppTests = (props) => {

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const handleTestAttempt = (id) => {
        return MySwal.fire({
            icon: 'question',
            title: "Confirm",
            text: 'The test cannot be paused once you start and test can be attempted only once. \nAre you sure you want to start the test?',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            showCancelButton: true,
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                props.newTestAttempt({
                    id: id,
                    data: {
                        studentTestId: id
                    }
                })
            }
        })
    }

    useEffect(() => {
        props.getPastTests()
        props.getUpcomingTests()
    }, [])

    useEffect(() => {
        if (props.attemptId && Object.keys(props.selectedTest).length > 0) {
            props.history.push('/tests/attempt')
        }
        console.log("props", props.selectedTest)
    }, [props.selectedTest])

    useEffect(() => {
        if (!props.attemptTestLoading && props.attemptTestError) {
            notifyError("Test Attempt", props.attemptTestError)
        }
    }, [props.attemptTestError])

    const newTestsView = () => {
        return <>{
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
                            <th>#</th>
                            <th>Title</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Time Limit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.newTests.map((t, index) =>
                            <tr key={'test-key' + index}>
                                <td>{index + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {t.test.title}
                                    </span>
                                </td>
                                <td><DateTime dateTime={t.startTime} type="dateTime" /></td>
                                <td><DateTime dateTime={t.endTime} type="dateTime" /></td>
                                <td>{t.test.timeLimit / 60} mins</td>
                                <td>
                                    <Button.Ripple
                                        color='primary' outline
                                        onClick={() => handleTestAttempt(t.studentTestId)}
                                    >
                                        ATTEMPT
                                    </Button.Ripple>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            }
        </>
    }

    const pastTestsView = () => {
        return (<div>
            {
                !props.pastTestsLoading &&
                !props.pastTestsError &&
                props.pastTests.length == 0 &&
                <NotFound />
            }
            {
                !props.pastTestsLoading && props.pastTestsError &&
                <NoNetwork />
            }
            {
                !props.pastTestsLoading &&
                !props.pastTestsError &&
                props.pastTests.length > 0 &&
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Time Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.pastTests.map((t, index) =>
                            <tr key={'past-test-key' + index}>
                                <td>{index + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {t.test.title}
                                    </span>
                                </td>
                                <td><DateTime dateTime={t.startTime} type="dateTime" /></td>
                                <td><DateTime dateTime={t.endTime} type="dateTime" /></td>
                                <td>{t.test.timeLimit / 60} mins</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            }
        </div>)
    }

    return (
        <Fragment >
            <UILoader blocking={props.newTestsLoading || props.pastTestsLoading || props.attemptTestLoading} >
                <Card>
                    <CardBody>
                        <Nav tabs fill>
                            <NavItem>
                                <NavLink
                                    active={active === '1'}
                                    onClick={() => {
                                        toggle('1')
                                    }}
                                >
                                    Past Test
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={active === '2'}
                                    onClick={() => {
                                        toggle('2')
                                    }}
                                >
                                    Upcoming Test
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent className='py-50' activeTab={active}>
                            <TabPane tabId='1'>
                                {
                                    pastTestsView()
                                }
                            </TabPane>
                            <TabPane tabId='2'>
                                {
                                    newTestsView()
                                }
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        newTests,
        newTestsLoading,
        newTestsError,
        pastTests,
        pastTestsLoading,
        pastTestsError,
        attemptTestLoading,
        selectedTest,
        currentIndex,
        attemptId,
        attemptTestError,

    } = state.Tests;
    return {
        newTests,
        newTestsLoading,
        newTestsError,
        pastTests,
        pastTestsLoading,
        pastTestsError,
        attemptTestLoading,
        selectedTest,
        currentIndex,
        attemptId,
        attemptTestError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getPastTests, getUpcomingTests, newTestAttempt, submitTestAttempt
    })(AppTests)
)
