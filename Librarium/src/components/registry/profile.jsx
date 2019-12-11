import Button from '../shared/button';
import ButtonBack from '../shared/button-back';
import Form from '../shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import { profileSchema } from '../../utilities/validation';
import React from 'react';
import SessionContext from '../../contexts/session-context';
import UserModel from '../../models/user';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.updateProfile = this.updateProfile.bind(this);
		this.loadProfile();
	}

	static contextType = SessionContext;

	loadProfile() {
		const authToken = this.props.location.state.authToken;
		const userId = this.props.match.params.id;
		Kinvey.getUser(userId, authToken).then(userData => {
			const formData = Object.fromEntries(
				Object.entries(userData).filter(e => !e[0].startsWith('_'))
			);
			this.props.form.populate(formData);
		}).catch(console.error);
	}

	updateProfile(formData) {
		let userModel = new UserModel(formData);
		const { authToken, id } = this.context.session.user;
		Kinvey.setUser(userModel, id, authToken).then(userData => {
			this.context.session.authenticate({
				authToken: userData._kmd.authtoken
			});
			this.props.history.push('/');
		}).catch(console.error);
	}

	render() {
		const { errors, fields, handleChange, handleSubmit } = this.props.form;
		return (
			<View title="Profile">
				<Form errors={errors} fields={fields} onSubmit={e => handleSubmit(e, this.updateProfile)} title="Profile">
					<fieldset>
						<InputGroup disabled label="E-mail address" name="email" onChange={handleChange} placeholder="reader1984@mail.com" type="email" value={fields.email || ''} />
						<InputGroup error={errors.fullName} label="Full name" name="fullName" onChange={handleChange} placeholder="Jean J. Doe" type="text" value={fields.fullName || ''} />
						<InputGroup disabled label="Alias" name="username" onChange={handleChange} placeholder="reader1984" type="text" value={fields.username || ''} />
					</fieldset>
					<fieldset>
						<details>
							<summary>Billing information:</summary>
							<InputGroup error={errors.bankCardNumber} label="Bank card №" name="bankCardNumber" onChange={handleChange} placeholder="**** **** **** 4321" type="text" value={fields.bankCardNumber || ''} />
							<InputGroup error={errors.physicalAddress} label="Physical address" name="physicalAddress" onChange={handleChange} placeholder="City, District, Street, Building etc." type="text" value={fields.physicalAddress || ''} />
							<InputGroup error={errors.postalCode} label="Postal code" name="postalCode" onChange={handleChange} placeholder="1234" type="text" value={fields.postalCode || ''} />
						</details>
					</fieldset>
					<fieldset>
						<details open>
							<summary>Change password:</summary>
							<InputGroup error={errors.password} label="New password" name="password" onChange={handleChange} placeholder="********" type="password" value={fields.password || ''} />
							<InputGroup error={errors.rePassword} label="Retype new password" name="rePassword" onChange={handleChange} placeholder="********" type="password" value={fields.rePassword || ''} />
						</details>
					</fieldset>
					<Button label="Save changes" type="submit" />
					<ButtonBack />
				</Form>
			</View>
		);
	}
}

export default withForm(Profile, profileSchema);
