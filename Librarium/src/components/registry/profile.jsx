import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import PageTitle from '../shared/page-title';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Subscriber from '../../models/subscriber';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.redirect = this.redirect.bind(this);
		this.state = {
			cardNumber: '',
			emailAddress: '',
			fullName: '',
			newPassword: '',
			oldPassword: '',
			physicalAddress: '',
			postalCode: '',
			username: ''
		};
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let subscriber = new Subscriber(this.state);
		Kinvey.signUp(subscriber).then(() => {
			this.setState({ redirectPath: '/signin' });
		}).catch(console.error);
	}

	redirect() {
		const path = this.state.redirectPath;
		if (path) return <Redirect push to={path} />;
	}

	render() {
		return this.redirect() || (
			<React.Fragment>
				<PageTitle value="Profile" />
				<form id="form-profile" onSubmit={this.handleSubmit}>
					<h1 className="heading">Profile</h1>
					<fieldset>
						<InputGroup label="E-mail address" name="emailAddress" onChange={this.handleChange} placeholder="reader1984@mail.com" required type="email" value={this.state.emailAddress} />
						<InputGroup label="Full name" name="fullName" onChange={this.handleChange} pattern="^[A-Z](?:\.|[a-z]+)(?: [A-Z](?:\.|[a-z]+))*(?: [A-Z][a-z]+)$" placeholder="Jean J. Doe" type="text" value={this.state.fullName} />
						<InputGroup label="Alias" name="username" onChange={this.handleChange} placeholder="reader1984" required type="text" value={this.state.username} />
					</fieldset>
					<fieldset>
						<details>
							<summary>Billing information:</summary>
							<InputGroup label="Bank card number" name="cardNumber" onChange={this.handleChange} type="text" value={this.state.cardNumber} />
							<InputGroup label="Physical address" name="physicalAddress" onChange={this.handleChange} placeholder="City, District, Street, Building..." type="text" value={this.state.physicalAddress} />
							<InputGroup label="Postal code" name="postalCode" onChange={this.handleChange} placeholder="1234" type="text" value={this.state.postalCode} />
						</details>
					</fieldset>
					<fieldset>
						<details>
							<summary>Change password:</summary>
							<InputGroup label="Old password" name="oldPassword" onChange={this.handleChange} placeholder="********" required type="password" value={this.state.oldPassword} />
							<InputGroup label="New password" name="newPassword" onChange={this.handleChange} placeholder="********" required type="password" value={this.state.newPassword} />
						</details>
					</fieldset>
					<button className="button" type="submit">Save changes</button>
				</form>
			</React.Fragment>
		);
	}
}

export default Profile;
