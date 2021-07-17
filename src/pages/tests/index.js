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
    Button,
    CardTitle,
    CardHeader
} from 'reactstrap'

// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import { getTests, newTestAttempt, submitTestAttempt } from './store/actions'

import { withRouter } from 'react-router';

import { PlayCircle, Menu, X, ChevronUp, ChevronDown } from 'react-feather'

import UILoader from '../../@core/components/ui-loader';
import TestList from './TestList'

import { notifyError } from '../../utility/toast'


const AppTests = (props) => {

    useEffect(() => {
        props.getTests()
    }, [])

    useEffect(() => {
        if (props.attemptId && Object.keys(props.selectedTest).length > 0) {
            props.history.push('/tests/attempt')
        }
    }, [props.selectedTest])

    useEffect(() => {
        if (!props.attemptTestLoading && props.attemptTestError) {
            notifyError("Test Attempt", props.attemptTestError)
        }
    }, [props.attemptTestError])

    return (
        <Fragment >
            <UILoader blocking={props.testsLoading || props.attemptTestLoading} >
                <Card>
                    <CardBody>
                        {
                            !props.testsLoading &&
                            !props.testsError &&
                            props.tests.length == 0 &&
                            <h5 className="pt-2 pb-2 text-center">
                                No Tests
                            </h5>
                        }
                        {
                            !props.testsLoading && props.testsError &&
                            <h3 className="pt-2 pb-2 text-center">
                                {props.testsError}
                            </h3>
                        }
                        {
                            !props.testsLoading &&
                            !props.testsError &&
                            props.tests.length > 0 &&
                            <TestList
                                tests={props.tests}
                                newTestAttempt={props.newTestAttempt}
                            />
                        }
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        tests,
        testsLoading,
        testsError,
        attemptTestLoading,
        selectedTest,
        currentIndex,
        attemptId,
        attemptTestError,

    } = state.Tests;
    return {
        tests,
        testsLoading,
        testsError,
        attemptTestLoading,
        selectedTest,
        currentIndex,
        attemptId,
        attemptTestError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getTests, newTestAttempt, submitTestAttempt
    })(AppTests)
)
