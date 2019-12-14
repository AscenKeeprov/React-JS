import Button from '../shared/button';
import Form from '../shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import React from 'react';
import Toggle from '../shared/toggle';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

function ResetPassword(props) {
	const { fields, handleChange, handleSubmit } = props.form;
	const toggleRef = React.createRef();
	let resetMethod = fields.resetMethod || 'email';

	const resetPassword = (formData) => {
		const { email, resetMethod, username } = formData;
		let existenceCheck;
		switch (resetMethod) {
			case 'email':
				existenceCheck = Kinvey.checkEmailExists(email);
				break;
			case 'username':
				existenceCheck = Kinvey.checkUsernameExists(username);
				break;
			default: throw new Error('Invalid password reset method!');
		}
		existenceCheck.then(existenceCheckResult => {
			const resultKey = `${resetMethod}Exists`;
			if (existenceCheckResult[resultKey] === true) {
				Kinvey.resetPassword(formData[resetMethod]).then(() => {
					props.history.push('/signin');
				}).catch(console.error);
			} else console.error(`No such ${resetMethod} on record!`);
		}).catch(console.error);
	}

	return (
		<View title="Reset Password">
			<Form fields={fields} onSubmit={e => handleSubmit(e, resetPassword)} title="Password Reset Form">
				<fieldset>
					<p>What do you want us to use for the reset?</p>
					<Toggle name="resetMethod" onChange={handleChange} options={[
						{ label: 'Alias', value: 'username' },
						{ label: 'E-mail', value: 'email' }
					]} ref={toggleRef} value={resetMethod} />
					{resetMethod === 'email' && <InputGroup label="E-mail address" name="email" onChange={handleChange} placeholder="reader1984@mail.com" required type="email" value={fields.email || ''} />}
					{resetMethod === 'username' && <InputGroup label="Alias" name="username" onChange={handleChange} placeholder="reader1984" required type="text" value={fields.username || ''} />}
				</fieldset>
				<Button label="Reset Password" type="submit" />
			</Form>
		</View>
	);
}

export default withForm(ResetPassword);
