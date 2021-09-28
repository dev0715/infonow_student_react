import React from 'react';
// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from 'react'

// ** Third Party Components
import classnames from 'classnames'

import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {
    Card, CardBody, Row, Col,
    Button,
    Table,
} from 'reactstrap'

import { ChevronDown } from 'react-feather'

// ** Store & Actions
import { connect, useSelector } from 'react-redux'
import { getPastAssignments, selectAssignment } from './store/actions'

import { withRouter } from 'react-router';

import UILoader from '../../@core/components/ui-loader';

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';
import { DateTime } from '../../components/date-time';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './style.scss'
import AssignmentList from './assignment-list';
const PastAssignments = (props) => {

    const [pastAssignmentData, setPastAssignmentData] = useState()
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        console.log("props.pastAssignments ==>", props.pastAssignments);
        if(props.pastAssignments) setPastAssignmentData(props.pastAssignments.data)
     }, [props.pastAssignments])

    // ** Function to handle Pagination
    const onSelectPage = (index) => {
        let data = {
            "page":index,
            "limit":20
        }
        if(props.pastAssignmentList && props.pastAssignmentList[index]) setPastAssignmentData(props.pastAssignmentList[index])
        else props.getPastAssignments(data)
       
    }

    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    useEffect(() => {
        if (props.pastAssignments  && props.pastAssignments.data.length == 0) {
            props.getPastAssignments()
        }
    }, [])


    const assignmentDetail = (a) => {
        props.selectAssignment(a)
        props.history.push(`/assignments/details`)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={props.pastAssignments.length > 0 ? props.pastAssignments.length / 10 : 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    const columns = [
        {
            name: 'Title',
            sortable: true,
            minWidth: '250px',
            cell: row => {
                return (
                    <>
                        {
                            row.assignment.title
                        }
                    </>
                )
            }
        },
        {
            name: 'Submission Date',
            sortable: false,
            minWidth: '100px',
            cell: a => {
                return (
                    <>
                        {
                            a.assignmentAttempt ?
                                <DateTime dateTime={a.assignmentAttempt.submittedAt} type="date" />
                                : "..."
                        }
                    </>
                )
            }
        },
        {
            name: 'Marks',
            sortable: true,
            minWidth: '250px',
            cell: a => {
                return (
                    <>
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
                    </>
                )
            }
        },
        {
            name: 'Action',
            minWidth: '250px',
            cell: a => {
                return (
                    <Button.Ripple color="flat-primary" onClick={() => assignmentDetail(a)} >
                        View
                    </Button.Ripple>
                )
            }
        },
    ]


    return (
        <Fragment >
            <UILoader
                blocking={props.pastAssignmentsLoading}
                className="w-100">
                <Card >
                    <CardBody >
                        <Row >
                            <Col sm='12'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 >
                                        Past Assignments
                                    </h5>
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
                                    pastAssignmentData &&
                                    pastAssignmentData.length == 0 &&
                                    <NotFound />
                                }
                                {
                                    !props.pastAssignmentsLoading &&
                                    !props.pastAssignmentsError &&
                                    pastAssignmentData &&
                                    pastAssignmentData.length > 0 &&
                                    
                                    <AssignmentList
                                        assignmentList={pastAssignmentData}
                                        startAssignment={assignmentDetail}
                                        onSelectPage ={onSelectPage}
                                        isPagination={true}
                                        isNew={false}
                                        count={props.pastAssignments.count}
                                        limit={pastAssignmentData.length}
                                    />
                                    // <DataTable
                                    //     noHeader
                                    //     pagination
                                    //     columns={columns}
                                    //     paginationPerPage={10}
                                    //     className='react-dataTable '
                                    //     sortIcon={<ChevronDown size={10} />}
                                    //     paginationDefaultPage={currentPage + 1}
                                    //     paginationComponent={CustomPagination}
                                    //     data={props.pastAssignments}
                                    // />
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
        pastAssignmentList,
        pastAssignments,
        pastAssignmentsLoading,
        pastAssignmentsError,
    } = state.Assignments;
    return {
        pastAssignmentList,
        pastAssignments,
        pastAssignmentsLoading,
        pastAssignmentsError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getPastAssignments, selectAssignment
    })(PastAssignments)
)
