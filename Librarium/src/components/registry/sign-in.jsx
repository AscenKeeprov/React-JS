import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import SessionContext from '../../contexts/session-context';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

function SignIn(props) {
	const { session } = useContext(SessionContext);
	const { fields, handleChange, handleSubmit } = props.form;

	const signIn = (formData) => {
		Kinvey.signIn({
			username: formData.alias,
			password: formData.password
		}).then(userData => {
			session.authenticate({
				authToken: userData._kmd.authtoken,
				userId: userData._id,
				username: userData.username
			});
			if (userData._kmd.roles) {
				const roleIds = userData._kmd.roles.map(r => r.roleId);
				Kinvey.getRoles().then(rolesData => {
					const userRoles = rolesData
						.filter(r => roleIds.includes(r._id))
						.map(r => r.name);
					session.authorize(userRoles);
				}).catch(console.error);
			}
			props.history.push('/');
		}).catch(console.error);
	}

	return (
		<View title="Sing In">
			<Form fields={fields} onSubmit={e => handleSubmit(e, signIn)} title="Sign In Form">
				<fieldset>
					<InputGroup label="Alias" name="alias" onChange={handleChange} required type="text" value={fields.alias || ''} />
					<InputGroup label="Password" name="password" onChange={handleChange} required type="password" value={fields.password || ''} />
				</fieldset>
				<Button label="Sign In" type="submit" />
				<small className="float-right">
					<Link className="text-small" to="/resetpassword">Forgot your password?</Link>
				</small>
			</Form>
		</View>
	);
}

export default withForm(SignIn);
