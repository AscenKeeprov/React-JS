import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import React from 'react';
import Subscriber from '../../models/subscriber';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.signUp = this.signUp.bind(this);
	}

	signUp(formData) {
		const { email } = formData;
		Kinvey.checkEmailExists({ email }).then(res => {
			if (res.emailExists === false) {
				let subscriber = new Subscriber(formData);
				Kinvey.signUp(subscriber).then(() => {
					this.props.history.push('/signin');
				}).catch(console.error);
			} else throw new Error('This e-mail address is already in use.');
		}).catch(console.error);
	}

	render() {
		const { fields, handleChange, handleSubmit } = this.props.form;
		return (
			<View title="Sign Up">
				<Form fields={fields} id="form-registration" onSubmit={e => handleSubmit(e, this.signUp)} title="Registration Form">
					<fieldset>
						<legend>Profile information:</legend>
						<InputGroup label="E-mail address" name="email" onChange={handleChange} placeholder="reader1984@mail.com" required type="email" value={fields.email || ''} />
						<InputGroup label="Alias" name="alias" onChange={handleChange} placeholder="reader1984" required type="text" value={fields.alias || ''} />
						<InputGroup label="Full name" name="fullName" onChange={handleChange} pattern="^[A-Z](?:\.|[a-z]+)(?: [A-Z](?:\.|[a-z]+))*(?: [A-Z][a-z]+)$" placeholder="Jean J. Doe" type="text" value={fields.fullName || ''} />
						<InputGroup label="Password" name="password" onChange={handleChange} placeholder="********" required type="password" value={fields.password || ''} />
						<InputGroup label="Retype password" name="rePassword" onChange={handleChange} placeholder="********" type="password" value={fields.rePassword || ''} />
					</fieldset>
					<fieldset>
						<legend>Billing information:</legend>
						<InputGroup label="Bank card №" name="bankCardNumber" onChange={handleChange} type="text" value={fields.bankCardNumber || ''} />
						<InputGroup label="Physical address" name="physicalAddress" onChange={handleChange} placeholder="City, District, Street, Building..." type="text" value={fields.physicalAddress || ''} />
						<InputGroup label="Postal code" name="postalCode" onChange={handleChange} placeholder="1234" type="text" value={fields.postalCode || ''} />
					</fieldset>
					<fieldset>
						<InputGroup label="I have read and agree with all subscription terms and conditions" name="termsConsent" onChange={handleChange} type="checkbox" value={fields.termsConsent || false} />
					</fieldset>
					<Button label="Register" type="submit" />
				</Form>
			</View>
		);
	}
}

export default withForm(SignUp);
