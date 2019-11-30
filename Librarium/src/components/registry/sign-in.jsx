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
			this.context.session.set('aut', userData._kmd.authtoken);
			this.context.session.set('uid', userData._id);
			this.context.session.set('unm', userData.username);
			if (userData._kmd.roles) {
				const roleIds = userData._kmd.roles.map(r => r.roleId);
				Kinvey.getRolesById(roleIds).then(rolesData => {
					const roleNames = rolesData.map(r => r.name);
					this.context.session.set('uro', roleNames);
				}).catch(console.error);
			}
			this.props.history.push('/');
		}).catch(console.error);
	}

	render() {
		const { fields, handleChange, handleSubmit } = this.props.form;
		return (
			<View title="Sing In">
				<Form fields={fields} id="form-signin" onSubmit={e => handleSubmit(e, this.signIn)} title="Sign In Form">
					<fieldset>
						<InputGroup label="Alias" name="alias" onChange={handleChange} placeholder="reader1984" required type="text" value={fields.alias || ''} />
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
