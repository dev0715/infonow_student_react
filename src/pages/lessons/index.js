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
import { getUserTopics, getUserTopicLessons, selectTopic, selectLesson } from './store/actions'

import { withRouter } from 'react-router';
import { GET_BLOG_IMAGE_URL } from '../../helpers/url_helper'
import './style.scss'
import ReactMarkdown from 'react-markdown'
import { render } from 'react-dom'

import { PlayCircle, Menu, X, ChevronUp, ChevronDown } from 'react-feather'

import UILoader from '../../@core/components/ui-loader';


const AppLessons = (props) => {

    const lessonRef = React.createRef()
    const [isFullScreen, setFullScreen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const [isOpenLessons, setIsOpenLessons] = useState(false);

    const toggleLessons = () => setIsOpenLessons(!isOpenLessons);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        props.getUserTopics()
    }, [])

    useEffect(() => {
        if (Object.keys(props.selectedTopic).length > 0) {
            props.getUserTopicLessons(props.selectedTopic.id)
            setIsOpenLessons(false)
        }
    }, [props.selectedTopic])

    useEffect(() => {
        setIsOpenLessons(false)
    }, [props.selectedLesson])

    useEffect(() => {
        if (props.topics.length > 0)
            props.selectTopic(props.topics[0])
    }, [props.topics])

    useEffect(() => {
        if (props.lessons.length > 0 && Object.keys(props.selectedLesson).length == 0)
            props.selectLesson(props.lessons[0])
    }, [props.lessons])


    useEffect(() => {

        if (Object.keys(props.selectedLesson).length > 0) {
            let uploadPath = "http://192.168.10.102:1337/uploads/";
            let markdown = String(props.selectedLesson.content).replaceAll("/uploads/", uploadPath);
            render(<ReactMarkdown>{markdown}</ReactMarkdown>, document.getElementById("active-lesson-content"))
            setTimeout(() => {
                window.scrollTo(0, 0)
                try {
                    if (lessonRef)
                        lessonRef.current.scrollTo(0, 0)
                } catch (error) {
                    console.warn("Lesson Scroll", error)
                }
            }, 100)
        }
    }, [props.selectedLesson])

    return (
        <Fragment >
            <UILoader blocking={props.topicsLoading} className="ui-loader">
                <Card>
                    <CardBody className="p-0">
                        <Row>
                            {
                                !isFullScreen &&
                                <Col lg={3}
                                    className={`pr-lg-0 ${isFullScreen ? "" : "topic-list-shadow"}`}
                                >
                                    {
                                        isFullScreen ?
                                            <Menu
                                                className="ml-2 mt-2"
                                                width={20}
                                                height={20}
                                                onClick={() => setFullScreen(false)}
                                            />
                                            :
                                            <Navbar expand="lg" className="p-0">
                                                {
                                                    !isOpen &&
                                                    <Menu
                                                        className="m-2 d-md-block d-lg-none"
                                                        width={20}
                                                        height={20}
                                                        onClick={toggle}
                                                    />
                                                }
                                                <Collapse isOpen={isOpen || isFullScreen} navbar>
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Topics</CardTitle>
                                                            <div className="text-right ">
                                                                {
                                                                    isOpen &&
                                                                    <X
                                                                        className="d-lg-none"
                                                                        width={20} height={20}
                                                                        onClick={toggle}
                                                                    />
                                                                }
                                                                {
                                                                    !isFullScreen &&
                                                                    <X
                                                                        className="d-none d-md-none d-lg-block"
                                                                        width={20} height={20}
                                                                        onClick={() => setFullScreen(true)}
                                                                    />
                                                                }
                                                            </div>
                                                        </CardHeader>
                                                        <CardBody className="p-0">
                                                            {
                                                                props.topics.length > 0 &&
                                                                <div className="topics-list">
                                                                    {
                                                                        props.topics.map((t, index) =>
                                                                            <div
                                                                                key={'topic-key-' + index}
                                                                                className={`topics-container ${t.id == props.selectedTopic.id ? 'active' : ""}`}
                                                                                onClick={() => {
                                                                                    props.selectTopic(t)
                                                                                    if (isOpen)
                                                                                        setIsOpen(false)
                                                                                }}
                                                                            >
                                                                                <img className="topic-image" src={GET_BLOG_IMAGE_URL(t.image.formats.thumbnail.url)} alt={""} />
                                                                                <div className="topic-content">
                                                                                    <div className="heading">
                                                                                        {t.title}
                                                                                    </div>
                                                                                    <div className="description">
                                                                                        {t.description}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            }
                                                            {
                                                                props.topics.length == 0 &&
                                                                !props.topicsLoading &&
                                                                !props.topicsError &&
                                                                <div className="p-1">
                                                                    No Topics
                                                                </div>
                                                            }
                                                            {
                                                                !props.topicsLoading &&
                                                                props.topicsError &&
                                                                <div className="p-1">
                                                                    {props.topicsError}
                                                                </div>
                                                            }
                                                        </CardBody>
                                                    </Card>
                                                </Collapse>
                                            </Navbar>
                                    }
                                </Col>
                            }
                            <Col lg={isFullScreen ? 12 : 9}>
                                <div className="d-lg-flex">
                                    {
                                        isFullScreen &&
                                        <div>
                                            <Menu
                                                className="mt-2 mb-2 ml-1 mr-1"
                                                size={20}
                                                onClick={() => setFullScreen(false)}
                                            />
                                        </div>
                                    }
                                    <UILoader blocking={props.lessonsLoading}>
                                        {
                                            Object.keys(props.selectedTopic).length > 0 &&
                                            <Card
                                                className={`active-lesson-container ${isOpenLessons ? 'hide' : ''} ${isFullScreen ? 'active' : ''}`}
                                            >
                                                <CardHeader>
                                                    <CardTitle>{props.selectedLesson.title}</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    {
                                                        props.lessons.length == 0 &&
                                                        Object.keys(props.selectedTopic).length > 0 &&
                                                        !props.lessonsLoading &&
                                                        !props.lessonsError &&
                                                        <div className="pt-5 pb-5 mt-5 mb-5  text-center">
                                                            No Lessons
                                                        </div>
                                                    }
                                                    {
                                                        !props.lessonsLoading &&
                                                        props.lessonsError &&
                                                        <div className="pt-5 pb-5 mt-5 mb-5  text-center">
                                                            {props.lessonsError}
                                                        </div>
                                                    }
                                                    {
                                                        Object.keys(props.selectedLesson).length > 0 &&
                                                        <div
                                                            ref={lessonRef}
                                                            className="active-lesson"
                                                        >
                                                            {
                                                                props.selectedLesson.videoUrl &&
                                                                <div className="lesson-video mt-2">
                                                                    <iframe
                                                                        src={props.selectedLesson.videoUrl}
                                                                        title="YouTube video player"
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    >
                                                                    </iframe>
                                                                </div>
                                                            }
                                                            <div
                                                                id="active-lesson-content"
                                                                className={props.selectedLesson.videoUrl ? "mt-4" : ""}
                                                            >
                                                            </div>
                                                        </div>
                                                    }
                                                </CardBody>
                                            </Card>
                                        }
                                        {
                                            props.lessons.length > 1 &&
                                            <div className={`other-lessons ${isOpenLessons ? 'active' : 'm-2'}`}>
                                                <div className="heading" onClick={toggleLessons}>
                                                    <h3>
                                                        Other Lessons
                                                    </h3>
                                                    <div>
                                                        {
                                                            isOpenLessons
                                                                ? <ChevronDown size={20} />
                                                                : <ChevronUp size={20} />
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    isOpenLessons &&
                                                    <Collapse isOpen={isOpenLessons}>
                                                        <div className="lesson-list">
                                                            {
                                                                props.lessons.map((l, index) => {
                                                                    if (l.id == props.selectedLesson.id) return
                                                                    return <div key={'lesson-key-' + index} className="lesson-item">
                                                                        <div>
                                                                            <div className="heading">
                                                                                {l.title}
                                                                            </div>
                                                                            <div className="description">
                                                                                {l.description}
                                                                            </div>
                                                                        </div>
                                                                        <div className="icon">
                                                                            <PlayCircle
                                                                                color="#9135ab" width={25} height={25}
                                                                                onClick={() => {
                                                                                    props.selectLesson(l)
                                                                                    setIsOpenLessons(false)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </Collapse>
                                                }
                                            </div>
                                        }
                                    </UILoader>
                                </div>
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
        topics,
        topicsLoading,
        topicsError,
        lessons,
        lessonsLoading,
        lessonsError,
        selectedTopic,
        selectedLesson,

    } = state.Lessons;
    return {
        topics,
        topicsLoading,
        topicsError,
        lessons,
        lessonsLoading,
        lessonsError,
        selectedTopic,
        selectedLesson,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getUserTopics,
        getUserTopicLessons,
        selectTopic, selectLesson
    })(AppLessons)
)
