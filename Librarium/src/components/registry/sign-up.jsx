import Button from '../shared/button';
import Form from '../shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import Loader from '../shared/loader';
import { NotificationManager } from 'react-notifications';
import React, { useState } from 'react';
import { singUpSchema } from '../../utilities/validation';
import UserModel from '../../models/user';
import View from '../shared/view';
import withForm from '../higher-order/with-form';


function SignUp(props) {
	const [isSigningUp, setIsSigningUp] = useState(false);
	const { errors, fields, handleChange, handleSubmit } = props.form;

	const signUp = (formData) => {
		setIsSigningUp(true);
		Kinvey.checkEmailExists(formData.email).then(res => {
			if (res.emailExists === false) {
				let userModel = new UserModel(formData);
				Kinvey.signUp(userModel).then(() => {
					props.history.push('/signin');
					NotificationManager.success('Registration successfull', null, 3000);
				}).catch(console.error);
			} else throw new Error('This e-mail address is already in use.');
		}).catch(error => NotificationManager.error(error.message));
	}

	return (
		<View title="Sign Up">
			<Loader isLoading={isSigningUp} />
			<Form errors={errors} fields={fields} id="form-registration" onSubmit={e => handleSubmit(e, signUp)} title="Registration Form">
				<fieldset>
					<InputGroup error={errors.email} label="E-mail address" name="email" onChange={handleChange} placeholder="reader1984@mail.com" required type="email" value={fields.email || ''} />
					<InputGroup error={errors.fullName} label="Full name" name="fullName" onChange={handleChange} placeholder="Jean J. Doe" type="text" value={fields.fullName || ''} />
					<InputGroup error={errors.username} label="Alias" name="username" onChange={handleChange} placeholder="reader1984" required type="text" value={fields.username || ''} />
					<InputGroup error={errors.password} label="Password" name="password" onChange={handleChange} placeholder="********" required type="password" value={fields.password || ''} />
					<InputGroup error={errors.rePassword} label="Retype password" name="rePassword" onChange={handleChange} placeholder="********" type="password" value={fields.rePassword || ''} />
				</fieldset>
				<Button label="Register" type="submit" />
			</Form>
		</View>
	);
}

export default withForm(SignUp, singUpSchema);
