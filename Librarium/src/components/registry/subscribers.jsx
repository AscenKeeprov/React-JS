import Kinvey from '../../services/kinvey';
import React from 'react';
import View from '../shared/view';

class Subscribers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subscribers: []
		}
	}

	componentDidMount() {
		Kinvey.getSubscriptions().then(subscriptionsData => {
			const lastSubscriptions = subscriptionsData.reduce((obj, subscription) => {
				const lastSubEndDate = new Date(subscription.dateEnd);
				const userId = subscription.subscriberId;
				if (!obj.hasOwnProperty(userId)) obj[userId] = { lastSubEndDate };
				else if (lastSubEndDate > obj[userId].lastSubEndDate) {
					obj[userId].lastSubEndDate = lastSubEndDate;
				}
				return obj;
			}, {});
			const userIds = Object.keys(lastSubscriptions);
			Kinvey.getUsers({ _id: { $in: userIds } }).then(usersData => {
				const currentDate = new Date();
				const subscribers = usersData.map(user => {
					const userSubEndDate = lastSubscriptions[user._id].lastSubEndDate;
					return {
						alias: user.username,
						email: user.email,
						id: user._id,
						isActive: userSubEndDate > currentDate,
						name: user.fullName
					}
				}).sort((u1, u2) => u1.alias.localeCompare(u2.alias));
				this.setState({ subscribers });
			}).catch(console.error);
		}).catch(console.error);
	}

	render() {
		const { subscribers } = this.state;
		const tableBodyRows = subscribers.map(({ alias, email, id, isActive, name }) => {
			return (
				<tr key={id}>
					<td>{isActive ? (
						<span className="text-success">ACTIVE</span>
					) : (
							<span className="text-failure">INACTIVE</span>
						)}</td>
					<td>{alias}</td>
					<td>{name}</td>
					<td><a className="link-cell" href={`mailto:${email}`} title="Contact subscriber" /></td>
				</tr>
			);
		});
		const today = (new Date()).toUTCString();
		return (
			<View title="Subscribers">
				<table id="table-subscribers">
					<caption>Librarium subscribers as of {today}</caption>
					<thead>
						<tr>
							<th>Status</th>
							<th>Alias</th>
							<th>Full name</th>
							<th>E-mail</th>
						</tr>
					</thead>
					<tbody>
						{tableBodyRows.length > 0 ? tableBodyRows : <tr><td colSpan={4}>LOADING SUBSCRIBERS DATA...</td></tr>}
					</tbody>
				</table>
			</View>
		);
	}
}

export default Subscribers;
