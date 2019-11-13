import InputGroup from '../../components/shared/input-group';
import Kinvey from '../../services/kinvey';
import PageTitle from '../shared/Page-Title';
import React from 'react';
import { Redirect } from 'react-router-dom';

class SignInForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			password: '',
			username: ''
		};
	}

	handleChange(event) {
		const key = event.target.name;
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState({ [key]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { username, password } = this.state;
		Kinvey.signIn({ username, password }).then(authToken => {
			localStorage.setItem('auth', authToken);
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
				<form id="signInForm" onSubmit={this.handleSubmit}>
					<h1 className="heading">Sign In Form</h1>
					<fieldset>
						<InputGroup label="Alias" name="username" onChange={this.handleChange} placeholder="user01" type="text" value={this.state.username} />
						<InputGroup label="Password" name="password" onChange={this.handleChange} placeholder="********" type="password" value={this.state.password} />
					</fieldset>
					<button className="button" type="submit">Sign In</button>
				</form>
			</React.Fragment>
		);
	}
}

export default SignInForm;
