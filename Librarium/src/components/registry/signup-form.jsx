import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import PageTitle from '../shared/page-title';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Subscriber from '../../models/subscriber';

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardNumber: '',
			emailAddress: '',
			fullName: '',
			password: '',
			physicalAddress: '',
			postalCode: '',
			rePassword: '',
			termsConsent: false,
			username: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.redirect = this.redirect.bind(this);
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
				<PageTitle value="Register" />
				<form id="form-registration" onSubmit={this.handleSubmit}>
					<h1 className="heading">Registration Form</h1>
					<fieldset>
						<legend>Profile information:</legend>
						<InputGroup label="E-mail address" name="emailAddress" onChange={this.handleChange} placeholder="reader1984@mail.com" required type="email" value={this.state.emailAddress} />
						<InputGroup label="Alias" name="username" onChange={this.handleChange} placeholder="reader1984" required type="text" value={this.state.username} />
						<InputGroup label="Full name" name="fullName" onChange={this.handleChange} pattern="^[A-Z](?:\.|[a-z]+)(?: [A-Z](?:\.|[a-z]+))*(?: [A-Z][a-z]+)$" placeholder="Jean J. Doe" type="text" value={this.state.fullName} />
						<InputGroup label="Password" name="password" onChange={this.handleChange} placeholder="********" required type="password" value={this.state.password} />
						<InputGroup label="Retype password" name="rePassword" onChange={this.handleChange} placeholder="********" type="password" value={this.state.rePassword} />
					</fieldset>
					<fieldset>
						<legend>Billing information:</legend>
						<InputGroup label="Bank card №" name="cardNumber" onChange={this.handleChange} type="text" value={this.state.cardNumber} />
						<InputGroup label="Physical address" name="physicalAddress" onChange={this.handleChange} placeholder="City, District, Street, Building..." type="text" value={this.state.physicalAddress} />
						<InputGroup label="Postal code" name="postalCode" onChange={this.handleChange} placeholder="1234" type="text" value={this.state.postalCode} />
						<label className="label-enclosing nowrap">
							<input name="termsConsent" onChange={this.handleChange} type="checkbox" value={this.state.termsConsent} />
							<span className="text-small">I have read and agree with all subscription terms and conditions</span>
						</label>
					</fieldset>
					<button className="button" type="submit">Subscribe</button>
				</form>
			</React.Fragment>
		);
	}
}

export default SignUpForm;
