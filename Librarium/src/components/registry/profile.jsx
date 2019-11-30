import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import React from 'react';
import { Redirect } from 'react-router-dom';
import SessionContext from '../../contexts/session-context';
import Subscriber from '../../models/subscriber';
import View from '../shared/view';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.redirect = this.redirect.bind(this);
		this.state = {
			cardNumber: 'Loading...',
			email: 'Loading...',
			fullName: 'Loading...',
			password: '',
			physicalAddress: 'Loading...',
			postalCode: 'Loading...',
			rePassword: '',
			username: 'Loading...'
		};
		const authToken = props.location.state.aut;
		const userId = props.match.params.id;
		Kinvey.getUser(userId, authToken).then(userData => {
			userData._aut = authToken;
			this.setState(userData);
		}).catch(console.error);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let subscriber = new Subscriber(this.state);
		Kinvey.setUser(subscriber).then(userData => {
			this.context.session.set('aut', userData._kmd.authtoken);
			this.setState({ redirectPath: '/' });
		}).catch(console.error);
	}

	redirect() {
		if (this.state) {
			const path = this.state.redirectPath;
			if (path) return <Redirect push to={path} />;
		}
	}

	render() {
		return this.redirect() || (
			<View title="Profile">
				<Form id="form-profile" onSubmit={this.handleSubmit} title="Profile">
					<fieldset>
						<InputGroup label="E-mail address" name="email" onChange={this.handleChange} placeholder="reader1984@mail.com" required type="email" value={this.state.email} />
						<InputGroup label="Full name" name="fullName" onChange={this.handleChange} pattern="^[A-Z](?:\.|[a-z]+)(?: [A-Z](?:\.|[a-z]+))*(?: [A-Z][a-z]+)$" placeholder="Jean J. Doe" type="text" value={this.state.fullName} />
						<InputGroup label="Alias" name="username" onChange={this.handleChange} placeholder="reader1984" required type="text" value={this.state.username} />
					</fieldset>
					<fieldset>
						<details>
							<summary>Billing information:</summary>
							<InputGroup label="Bank card №" name="cardNumber" onChange={this.handleChange} type="text" value={this.state.cardNumber} />
							<InputGroup label="Physical address" name="physicalAddress" onChange={this.handleChange} placeholder="City, District, Street, Building..." type="text" value={this.state.physicalAddress} />
							<InputGroup label="Postal code" name="postalCode" onChange={this.handleChange} placeholder="1234" type="text" value={this.state.postalCode} />
						</details>
					</fieldset>
					<fieldset>
						<details open>
							<summary>Change password:</summary>
							<InputGroup label="New password" name="password" onChange={this.handleChange} placeholder="********" type="password" value={this.state.password} />
							<InputGroup label="Retype password" name="rePassword" onChange={this.handleChange} placeholder="********" type="password" value={this.state.rePassword} />
						</details>
					</fieldset>
					<Button label="Save changes" type="submit" />
				</Form>
			</View>
		);
	}
}

Profile.contextType = SessionContext;

export default Profile;
