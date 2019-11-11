import crypto from 'crypto';
import Database from '../../services/database';
import PageTitle from '../shared/Page-Title';
import React from 'react';

class Subscriber {
	constructor(subscriptionData) {
		this.cardNumber = subscriptionData.cardNumber;
		this.emailAddress = subscriptionData.emailAddress;
		this.fullName = subscriptionData.fullName;
		this.password = this.encryptPassword(subscriptionData.password);
		this.physicalAddress = subscriptionData.physicalAddress;
		this.postalCode = subscriptionData.postalCode;
		this.termsConsent = subscriptionData.termsConsent;
		this.username = subscriptionData.username;
	}

	encryptPassword(password) {
		let hash = crypto.createHash('sha256').update(password).digest('base64');
		let salt = crypto.randomBytes(16).toString('base64');
		return salt + hash;
	}

	verifyPassword(password) {
		return new Promise((resolve, reject) => {
			let hash = crypto.createHash('sha256').update(password).digest('base64');
			resolve(hash === this.password.split(/==/)[1]);
		});
	}
}

class SubscriptionForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	}

	handleChange(event) {
		const key = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [key]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let subscriber = new Subscriber(this.state);
		Database.signUp(subscriber).then(authToken => {
			console.log(authToken);
		}).catch(console.error);
	}

	render() {
		return (
			<React.Fragment>
				<PageTitle value="Subscribe" />
				<form id="subscriptionForm" onSubmit={ this.handleSubmit }>
					<h1 className="heading">Subscription Form</h1>
					<fieldset>
						<legend>Profile information:</legend>
						<label className="label-enclosing">
							<span>E-mail address<sup className="required">*</sup>:</span>
							<input name="emailAddress" onChange={ this.handleChange } placeholder="reader1984@mail.com" type="text" value={ this.state.emailAddress } />
						</label>
						<label className="label-enclosing">
							<span>Alias:</span>
							<input name="username" onChange={ this.handleChange } placeholder="reader1984" type="text" value={ this.state.username } />
						</label>
						<label className="label-enclosing">
							<span>Full name:</span>
							<input name="fullName" onChange={ this.handleChange } placeholder="John J. Doe" type="text" value={ this.state.fullName } />
						</label>
						<label className="label-enclosing">
							<span>Password<sup className="required">*</sup>:</span>
							<input name="password" onChange={ this.handleChange } placeholder="********" type="password" value={ this.state.password } />
						</label>
						<label className="label-enclosing">
							<span>Confirm password:</span>
							<input name="rePassword" onChange={ this.handleChange } placeholder="********" type="password" value={ this.state.rePassword } />
						</label>
					</fieldset>
					<fieldset>
						<legend>Billing information:</legend>
						<label className="label-enclosing">
							<span>Card number:</span>
							<input name="cardNumber" onChange={ this.handleChange } placeholder="**** **** **** 4321" type="text" value={ this.state.cardNumber } />
						</label>
						<label className="label-enclosing">
							<span>Physicall address:</span>
							<input name="physicalAddress" onChange={ this.handleChange } placeholder="City, District, Street, Building..." type="text" value={ this.state.physicalAddress } />
						</label>
						<label className="label-enclosing">
							<span>Postal code:</span>
							<input name="postalCode" onChange={ this.handleChange } placeholder="1234" type="text" value={ this.state.postalCode } />
						</label>
						<label className="label-enclosing nowrap">
							<input name="termsConsent" onChange={ this.handleChange } type="checkbox" value={ this.state.termsConsent } />
							<span className="text-small">I have read and agree with all subscription terms and conditions</span>
						</label>
					</fieldset>
					<button className="button" type="submit">Subscribe</button>
				</form>
			</React.Fragment>
		);
	}
}

export default SubscriptionForm;
