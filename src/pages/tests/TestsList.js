import React from 'react';
import { useState, Fragment } from 'react';

import {
    CardBody,
    Card,
    CardText,
    Row,
    Col,
    CardHeader, CardTitle, Label, Input,
    Table
} from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { ChevronLeft, ChevronRight } from 'react-feather'

import { DateTime } from '../../components/date-time';

import { ChevronDown, LogIn, RefreshCcw } from 'react-feather'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { Button } from 'reactstrap';
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CardReload from '../../@core/components/card-reload';
import CustomPagination from '../pagination';


const TestList = (props) => {

    const { testList, count, isNew, selectPastTest, onTestAttempt , onPageChange} = props

    const onAttemptTest = (stdTest) => {
        if (onTestAttempt)
            onTestAttempt(stdTest.studentTestId)
    }

    const onSelectedPastTest = (stdTest) => {
        if (selectPastTest)
            selectPastTest(stdTest.studentTestId)
    }
    const onSelectPage = (index) => {
        if(props.onPageChange)
          onPageChange(index, isNew)
    }

    return (
        <Card>
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
                    {
                        testList.map((t, index) =>
                            <tr
                                key={isNew ? 'new-test-key' + index : 'past-test-key' + index}
                                onClick={() => onSelectedPastTest(t)}
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <span className='align-middle font-weight-bold'>
                                        {t.test.title}
                                    </span>
                                </td>
                                <td><DateTime dateTime={t.startTime} type="dateTime" /></td>
                                <td><DateTime dateTime={t.endTime} type="dateTime" /></td>
                                <td>{t.test.timeLimit / 60} mins</td>
                                {
                                    isNew &&
                                    <td>
                                        <Button.Ripple
                                            color='primary' outline
                                            onClick={() => onAttemptTest(t)}
                                        >
                                            ATTEMPT
                                        </Button.Ripple>
                                    </td>
                                }
                            </tr>)
                    }
                </tbody>
            </Table>
            {
                testList &&
                testList.length > 0 &&
                <CustomPagination start={1} end={Math.ceil(count/20)} onSelect={onSelectPage}/>
            }

        </Card>
    )

}

export default TestList