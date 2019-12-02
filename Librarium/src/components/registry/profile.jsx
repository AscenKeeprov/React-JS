import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import React from 'react';
import SessionContext from '../../contexts/session-context';
import Subscriber from '../../models/subscriber';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authToken: props.location.state.authToken,
			id: props.match.params.id
		};
		this.updateProfile = this.updateProfile.bind(this);
		this.loadProfile();
	}

	loadProfile() {
		const { authToken, id } = this.state;
		Kinvey.getUser(id, authToken).then(userData => {
			const formData = Object.fromEntries(
				Object.entries(userData).filter(e => !e[0].startsWith('_'))
			);
			this.props.form.populate(formData);
		}).catch(console.error);
	}

	updateProfile(formData) {
		let subscriber = new Subscriber(formData);
		const { authToken, id } = this.state;
		Kinvey.setUser(subscriber, id, authToken).then(userData => {
			this.context.session.authenticate({
				authToken: userData._kmd.authtoken
			});
			this.props.history.push('/');
		}).catch(console.error);
	}

	render() {
		const { fields, handleChange, handleSubmit } = this.props.form;
		return (
			<View title="Profile">
				<Form fields={fields} id="form-profile" onSubmit={e => handleSubmit(e, this.updateProfile)} title="Profile">
					<fieldset>
						<InputGroup label="E-mail address" name="email" onChange={handleChange} placeholder="reader1984@mail.com" required type="email" value={fields.email || 'Loading...'} />
						<InputGroup label="Full name" name="fullName" onChange={handleChange} pattern="^[A-Z](?:\.|[a-z]+)(?: [A-Z](?:\.|[a-z]+))*(?: [A-Z][a-z]+)$" placeholder="Jean J. Doe" type="text" value={fields.fullName || 'Loading...'} />
						<InputGroup label="Alias" name="username" onChange={handleChange} placeholder="reader1984" required type="text" value={fields.username || 'Loading...'} />
					</fieldset>
					<fieldset>
						<details>
							<summary>Billing information:</summary>
							<InputGroup label="Bank card №" name="bankCardNumber" onChange={handleChange} type="text" value={fields.bankCardNumber || 'Loading...'} />
							<InputGroup label="Physical address" name="physicalAddress" onChange={handleChange} placeholder="City, District, Street, Building..." type="text" value={fields.physicalAddress || 'Loading...'} />
							<InputGroup label="Postal code" name="postalCode" onChange={handleChange} placeholder="1234" type="text" value={fields.postalCode || 'Loading...'} />
						</details>
					</fieldset>
					<fieldset>
						<details open>
							<summary>Change password:</summary>
							<InputGroup label="New password" name="password" onChange={handleChange} placeholder="********" type="password" value={fields.password || ''} />
							<InputGroup label="Retype password" name="rePassword" onChange={handleChange} placeholder="********" type="password" value={fields.rePassword || ''} />
						</details>
					</fieldset>
					<Button label="Save changes" type="submit" />
					<Button label="Back" onClick={this.props.history.goBack} type="button" />
				</Form>
			</View>
		);
	}
}

Profile.contextType = SessionContext;

export default withForm(Profile);
