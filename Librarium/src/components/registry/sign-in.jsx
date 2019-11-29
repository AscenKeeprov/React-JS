import Button from '../../components/shared/button';
import Form from '../../components/shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import { Link, Redirect } from 'react-router-dom';
import PageTitle from '../shared/page-title';
import React from 'react';
import SessionContext from '../../contexts/session-context';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alias: '',
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		Kinvey.signIn({
			username: this.state.alias,
			password: this.state.password
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
			this.setState({ redirectPath: '/' });
		}).catch(console.error);
	}

	redirect() {
		const path = this.state.redirectPath;
		if (path) return <Redirect push to={path} />;
	}

	render() {
		return this.redirect() || (
			<React.Fragment>
				<PageTitle value="Sign In" />
				<Form id="form-signin" onSubmit={this.handleSubmit} title="Sign In Form">
					<fieldset>
						<InputGroup label="Alias" name="alias" onChange={this.handleChange} placeholder="user01" required type="text" value={this.state.alias} />
						<InputGroup label="Password" name="password" onChange={this.handleChange} placeholder="********" required type="password" value={this.state.password} />
					</fieldset>
					<Button label="Sign In" type="submit" />
					<small className="float-right">
						<Link className="text-small" to="/resetpassword">Forgot your password?</Link>
					</small>
				</Form>
			</React.Fragment>
		);
	}
}

SignIn.contextType = SessionContext;

export default SignIn;
