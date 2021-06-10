import React from 'react';
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg';
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg';

import {
    Card,
    CardBody,
    CardTitle,
	Table,
	Badge,
} from 'reactstrap';

const avatarGroupData1 = [
	{
		title: 'Lilian',
		img: avatar1,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Alberto',
		img: avatar2,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Bruce',
		img: avatar3,
		imgHeight: 26,
		imgWidth: 26,
	},
];

const avatarGroupData2 = [
	{
		title: 'Diana',
		img: avatar1,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Rey',
		img: avatar2,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'James',
		img: avatar3,
		imgHeight: 26,
		imgWidth: 26,
	},
];

const avatarGroupData3 = [
	{
		title: 'Lee',
		img: avatar1,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Mario',
		img: avatar2,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Oswald',
		img: avatar3,
		imgHeight: 26,
		imgWidth: 26,
	},
];

const avatarGroupData4 = [
	{
		title: 'Christie',
		img: avatar1,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Barnes',
		img: avatar2,
		imgHeight: 26,
		imgWidth: 26,
	},
	{
		title: 'Arthur',
		img: avatar3,
		imgHeight: 26,
		imgWidth: 26,
	},
];

const MeetingList = () => {
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
                        <tr>
                            <td>1</td>
							<td>
								<span className='align-middle font-weight-bold'>
                                    Systems Administrator
								</span>
							</td>
							<td>04/22/2016</td>
							<td>02:30 PM</td>
							<td>
								<Badge
									pill
									color='light-success'
									className='mr-1'
								>
									Completed
								</Badge>
							</td>
						</tr>
						<tr>
                            <td>2</td>
							<td>
								<span className='align-middle font-weight-bold'>
									Introduction to Node.JS
								</span>
							</td>
							<td>04/25/2018</td>
							<td>12:00 PM</td>
							<td>
								<Badge
									pill
									color='light-warning'
									className='mr-1'
								>
									Cancelled
								</Badge>
							</td>
						</tr><tr>
                            <td>3</td>
							<td>
								<span className='align-middle font-weight-bold'>
									Introduction to Machine Learning
								</span>
							</td>
							<td>04/22/2016</td>
							<td>02:30 PM</td>
							<td>
								<Badge
									pill
									color='light-success'
									className='mr-1'
								>
									Completed
								</Badge>
							</td>
							
						</tr><tr>
                            <td>4</td>
							<td>
								<span className='align-middle font-weight-bold'>
									Introduction to Node.JS
								</span>
							</td>
							<td>04/22/2016</td>
							<td>02:30 PM</td>
							<td>
								<Badge
									pill
									color='light-primary'
									className='mr-1'
								>
									Active
								</Badge>
							</td>
							
						</tr>
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

export default MeetingList;
