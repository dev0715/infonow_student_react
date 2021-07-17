import React from 'react';
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import {
    useParams
} from "react-router-dom";

// ** Third Party Components
import classnames from 'classnames'
import {
    Card, CardBody, Row, Col,
    Collapse,
    Navbar,
    NavbarToggler,
    Button,
    CardTitle,
    CardHeader,
    FormGroup,
    Input

} from 'reactstrap'

// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import {
    getTests,
    newTestAttempt, submitTestAttempt,
    updateObjectiveQuestion,
    updateSubjectiveQuestion,
    nextQuestion,
    previousQuestion
} from './store/actions'

import { withRouter } from 'react-router';

import { ArrowLeft, ArrowRight } from 'react-feather'

import UILoader from '../../@core/components/ui-loader';

import { GET_DOCUMENT_URL } from '../../helpers/url_helper'

import './style.scss'


const AttemptTest = (props) => {

    useEffect(() => {
        if (Object.keys(props.selectedTest).length == 0)
            props.history.goBack()

    }, [props.selectedTest])


    const Question = (question) => {
        return <div
            key={'question-key' + question.questionId}
            className="question "
        >
            {
                question.image &&
                <div className="mb-1">
                    <img className="question-img" src={GET_DOCUMENT_URL(question.image)} />
                </div>
            }
            <h5 className="d-flex justify-content-between">
                <div>
                    {props.currentIndex + 1}.&nbsp;{question.text}
                </div>
                <div className="text-secondary ml-1">
                    Marks: {question.marks}
                </div>
            </h5>
            <div className="mt-2">
                {
                    question.type == 1 &&
                    question.options.map((o, index) =>
                        <Button.Ripple
                            block
                            outline={!o.selected}
                            color='primary'
                            className="text-left"
                            key={'object-option-' + index}
                            onClick={() => props.updateObjectiveQuestion({ id: o.optionId })}
                        >
                            {o.optionText}
                        </Button.Ripple>
                    )
                }
                {question.type == 2 &&
                    <FormGroup className='mb-2'>
                        <Input
                            className='mb-2'
                            type='textarea'
                            rows='4'
                            placeholder='Write answer here'
                            value={question.answerText}
                            onChange={e => props.updateSubjectiveQuestion({ value: e.target.value })}
                            required
                        />
                    </FormGroup>
                }
            </div>
        </div>
    }


    return (
        <Fragment >
            <UILoader blocking={props.testsLoading} >
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {props.selectedTest.test.title}
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            Object.keys(props.selectedTest).length > 0 &&
                            props.selectedTest.test.questions[props.currentIndex] &&
                            Question(props.selectedTest.test.questions[props.currentIndex])
                        }
                        {
                            Object.keys(props.selectedTest).length > 0 &&
                            props.selectedTest.test.questions.length > 0 &&
                            <div className="d-flex mt-4 justify-content-between">
                                <div>
                                    {
                                        props.currentIndex > 0 &&
                                        <Button.Ripple
                                            className="mr-25"
                                            color='primary'
                                            outline
                                            onClick={() => props.previousQuestion()}
                                        >
                                            <ArrowLeft size={20} />
                                        </Button.Ripple>
                                    }
                                    {
                                        props.currentIndex < props.selectedTest.test.questions.length - 1
                                        &&
                                        <Button.Ripple
                                            className="ml-25"
                                            color='primary'
                                            outline
                                            onClick={() => props.nextQuestion()}
                                        >
                                            <ArrowRight size={20} />
                                        </Button.Ripple>
                                    }
                                </div>
                                <Button.Ripple
                                    color='primary'
                                >
                                    Submit
                                </Button.Ripple>
                            </div>
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
        getTests,
        newTestAttempt, submitTestAttempt,
        updateObjectiveQuestion,
        updateSubjectiveQuestion,
        nextQuestion,
        previousQuestion
    })(AttemptTest)
)
