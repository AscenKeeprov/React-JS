import PageTitle from '../shared/Page-Title';
import React from 'react';

class SubscriptionForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			emailAddress: '',
			fullName: '',
			password: '',
			physicalAddress: '',
			postalCode: '',
			rePassword: '',
			termsConsent: ''
		};
	}

	handleChange(event) {
		const key = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [key]: value });
	}

	handleSubmit(event) {
		console.log(this.state);
		event.preventDefault();
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
							<span>Full name:</span>
							<input name="fullName" onChange={ this.handleChange } placeholder="John J. Doe" type="text" value={ this.state.fullName } />
						</label>
						<label className="label-enclosing">
							<span>Password:</span>
							<input name="password" onChange={ this.handleChange } placeholder="********" type="password" value={ this.state.password } />
						</label>
						<label className="label-enclosing">
							<span>Confirm password:</span>
							<input name="rePassword" onChange={ this.handleChange } placeholder="********" type="password" value={ this.state.rePassword } />
						</label>
					</fieldset>
					<fieldset>
						<legend>Order details:</legend>
						<label className="label-enclosing">
							<span>Physicall address:</span>
							<input name="physicalAddress" onChange={ this.handleChange } placeholder="City, District, Street, Building..." value={ this.state.physicalAddress } />
						</label>
						<label className="label-enclosing">
							<span>Postal code:</span>
							<input name="postalCode" onChange={ this.handleChange } placeholder="1234" value={ this.state.postalCode } />
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
