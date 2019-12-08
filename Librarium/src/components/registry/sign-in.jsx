import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import { Link } from 'react-router-dom';
import React from 'react';
import SessionContext from '../../contexts/session-context';
import View from '../shared/view';
import withForm from '../higher-order/with-form';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
	}

	signIn(formData) {
		Kinvey.signIn({
			username: formData.alias,
			password: formData.password
		}).then(userData => {
			this.context.session.authenticate({
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
					this.context.session.authorize(userRoles);
				}).catch(console.error);
			}
			this.props.history.push('/');
		}).catch(console.error);
	}

	render() {
		const { fields, handleChange, handleSubmit } = this.props.form;
		return (
			<View title="Sing In">
				<Form fields={fields} onSubmit={e => handleSubmit(e, this.signIn)} title="Sign In Form">
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
}

SignIn.contextType = SessionContext;

export default withForm(SignIn);
