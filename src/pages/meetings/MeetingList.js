import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
	Table,
	Badge,
} from 'reactstrap';

import { titleCase } from '@utils';
import { DateTime } from '../../components/date-time';

const MeetingList = (props) => {

	const getMeetingStatusColor = (meetingStatus) => {
		switch (meetingStatus) {
			case 'accepted': return 'light-success';
			case 'rejected': return 'light-danger';
			case 'pending': return 'light-warning';
			case 'cancelled': return 'light-danger';
			case 'rescheduled': return 'light-warning';
			default: return 'light-warning'
		}	
	}

	return (
		<Card>
			<CardBody>
				<CardTitle>My Meeting</CardTitle>
				<Table responsive hover >
					<thead>
						<tr>
							<th>#</th>
							<th>Subject</th>
							<th>Date</th>
							<th>Time</th>
                            <th>Status</th>
						</tr>
					</thead>
					<tbody>
						{props.Meetings && props.Meetings.map(m =>
							<tr key={m.meetingId}>
                            <td>1</td>
							<td>
								<span className='align-middle font-weight-bold'>
                                    {m.agenda}
								</span>
							</td>
							<td><DateTime dateTime={m.scheduledAt} type="date"/></td>
							<td><DateTime dateTime={m.scheduledAt} type="time"/></td>
							<td>
								<Badge
									pill
									color={getMeetingStatusColor(m.status)}
									className='mr-1'
								>
									{titleCase(m.status)}
								</Badge>
							</td>
						</tr>
						)}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};


export default MeetingList