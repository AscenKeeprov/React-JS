import React from 'react';
import View from '../shared/view';

class Subscribers extends React.Component {
	constructor(props) {
		super(props);
		//TODO: LOAD ROLE DATA => TAKE 'Subscribers' ROLE ID => LOAD USER DATA, FILTER BY ROLE ID
		//TODO: LOAD SUBSCRIPTIONS DATA
	}

	render() {
		//TODO: CLEAN UP
		//A table with one row per subscriber showing data for their latest subscription.
		return (
			<View title="Subscribers" >
				<table>
					<thead>
						<tr>
							<th>Status</th>
							<th>Alias</th>
							<th>Full name</th>
							<th>E-mail</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>ACTIVE/INACTIVE</td>
							<td>reader</td>
							<td>Jean J. Doe</td>
							<td><a href={`mailto:${'user e-mail address'}`} title="Contact subscriber" /></td>
							<td>&#11207; => &#11206;</td>
						</tr>
					</tbody>
				</table>
			</View>
		);
	}
}

export default Subscribers;
