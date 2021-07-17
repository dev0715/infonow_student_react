import React, { useState, useEffect } from 'react';
import {
    CardBody,
    Table
} from 'reactstrap';
import { DateTime } from '../../components/date-time';
import CardReload from '../../@core/components/card-reload';

import { Button } from 'reactstrap'
import { Plus } from 'react-feather'


import SweetAlert from 'react-bootstrap-sweetalert';


import './style.scss'


const TestList = (props) => {


    const [test, setTest] = useState({})

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
                                    <td>{t.test.timeLimit / 60 / 60} mins</td>
                                    <td>
                                        <Button.Ripple
                                            color='primary' outline
                                            onClick={() => setTest(t)}
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
            {
                Object.keys(test).length > 0
                &&
                <SweetAlert
                    show={true}
                    title={test.test.title}
                    showCancel={true}
                    onCancel={() => {
                        setTest({})
                    }}
                    onConfirm={() => {
                        //redirect
                        props.newTestAttempt({
                            id: test.studentTestId,
                            data: {
                                studentTestId: test.studentTestId
                            }
                        })
                        setTest({})
                    }}
                >
                    <h6>
                        Once Started,Test can not be cancelled.
                        <br />
                        Are you sure to start this test?
                    </h6>
                </SweetAlert>
            }
        </div>
    );
};

export default TestList