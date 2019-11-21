import crypto from '../../services/crypto';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import PageTitle from '../shared/page-title';
import React from 'react';
import { Redirect } from 'react-router-dom';
import SessionContext from '../../contexts/session-context';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			username: ''
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
			username: this.state.username,
			password: crypto.encryptPassword(this.state.password)
		}).then(userData => {
			this.context.session.set('aut', userData._kmd.authtoken);
			this.context.session.set('uid', userData._id);
			this.context.session.set('unm', userData.username);
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
				<form id="form-signin" onSubmit={this.handleSubmit}>
					<h1 className="heading">Sign In Form</h1>
					<fieldset>
						<InputGroup label="Alias" name="username" onChange={this.handleChange} placeholder="user01" required type="text" value={this.state.username} />
						<InputGroup label="Password" name="password" onChange={this.handleChange} placeholder="********" required type="password" value={this.state.password} />
					</fieldset>
					<button className="button" type="submit">Sign In</button>
				</form>
			</React.Fragment>
		);
	}
}

SignIn.contextType = SessionContext;

export default SignIn;
