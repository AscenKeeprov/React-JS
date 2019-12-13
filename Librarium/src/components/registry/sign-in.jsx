import Button from '../shared/button';
import Form from '../shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import SessionContext from '../../contexts/session-context';
import { singInSchema } from '../../utilities/validation';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

function SignIn(props) {
	const { session } = useContext(SessionContext);
	const { errors, fields, handleChange, handleSubmit } = props.form;

	const signIn = (formData) => {
		const { password, username } = formData;
		Promise.all([
			Kinvey.getRoles(),
			Kinvey.signIn({ password, username })
		]).then(([rolesData, userData]) => {
			session.authenticate({
				authToken: userData._kmd.authtoken,
				userId: userData._id,
				username: userData.username
			});
			if (userData._kmd.roles) {
				const userRoleIds = userData._kmd.roles.map(r => r.roleId);
				let userRoleNames = rolesData
					.filter(role => userRoleIds.includes(role._id))
					.map(role => role.name);
				Kinvey.checkHasActiveSubscription(userData._id).then(status => {
					const subRoleName = 'Subscribers';
					if (status.hasActiveSubscription === false && userRoleNames.includes(subRoleName)) {
						const subRoleId = rolesData.filter(role => role.name === subRoleName)[0]._id;
						Kinvey.revokeRole(userData._id, subRoleId).then(() => {
							userRoleNames = userRoleNames.filter(rn => rn !== subRoleName);
							session.authorize(userRoleNames);
						}).catch(console.error);
					} else session.authorize(userRoleNames);
				}).catch(console.error);
			}
			props.history.push('/');
		}).catch(console.error);
	}

	return (
		<View title="Sing In">
			<Form errors={errors} fields={fields} onSubmit={e => handleSubmit(e, signIn)} title="Sign In Form">
				<fieldset>
					<InputGroup error={errors.username} label="Alias" name="username" onChange={handleChange} required type="text" value={fields.username || ''} />
					<InputGroup error={errors.password} label="Password" name="password" onChange={handleChange} required type="password" value={fields.password || ''} />
				</fieldset>
				<Button label="Sign In" type="submit" />
				<small className="float-right">
					<Link className="text-small" to="/resetpassword">Forgot your password?</Link>
				</small>
			</Form>
		</View>
	);
}

export default withForm(SignIn, singInSchema);
