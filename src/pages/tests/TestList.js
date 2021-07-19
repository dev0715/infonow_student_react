import React, { useState, useEffect } from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import CardReload from '../../@core/components/card-reload';

import { Button } from 'reactstrap'


import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const TestList = (props) => {

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

    return (
        <div key={'app-test-list'}>
            <CardReload
                title='Tests'>
                <CardBody>
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
                            {props.tests.map((t, index) =>
                                t.test &&
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
                </CardBody>
            </CardReload>
        </div>
    );
};

export default TestList