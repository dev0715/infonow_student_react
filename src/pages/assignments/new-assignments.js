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
import { getNewAssignments, selectAssignment } from './store/actions'

import { withRouter } from 'react-router';

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

const NewAssignments = (props) => {

    const [currentPage, setCurrentPage] = useState(0)

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    useEffect(() => {
        if (props.newAssignments.length == 0) {
            props.getNewAssignments()
        }
    }, [])


    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={props.newAssignments.length > 0 ? props.newAssignments.length / 10 : 1}
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

    const goToAssignment = (a) => {
        console.log("Assignment", a)
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
            name: 'Start Date',
            sortable: false,
            minWidth: '100px',
            cell: row => {
                return (
                    <>
                        <DateTime dateTime={row.startDate} type="date" />
                    </>
                )
            }
        },
        {
            name: 'Due Date',
            sortable: false,
            minWidth: '100px',
            cell: row => {
                return (
                    <>
                        <DateTime dateTime={row.endDate} type="date" />
                    </>
                )
            }
        },
        {
            name: 'Action',
            minWidth: '250px',
            cell: a => {
                return (
                    <>
                        {
                            moment().isAfter(moment(a.startDate)) &&
                            <Button.Ripple color='flat-primary'
                                onClick={() => handleAssignmentAttempt(a)}
                            >
                                Start
                            </Button.Ripple>
                        }
                    </>
                )
            }
        },
    ]


    return (
        <Fragment >
            <UILoader
                blocking={props.newAssignmentsLoading}
                className="w-100">
                <Card >
                    <CardBody >
                        <Row >
                            <Col sm='12'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 >
                                        New Assignments
                                    </h5>
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
                                    <DataTable
                                        noHeader
                                        pagination
                                        columns={columns}
                                        paginationPerPage={10}
                                        className='react-dataTable'
                                        sortIcon={<ChevronDown size={10} />}
                                        paginationDefaultPage={currentPage + 1}
                                        paginationComponent={CustomPagination}
                                        data={props.newAssignments}
                                    />
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
    } = state.Assignments;
    return {
        newAssignments,
        newAssignmentsLoading,
        newAssignmentsError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getNewAssignments, selectAssignment
    })(NewAssignments)
)
