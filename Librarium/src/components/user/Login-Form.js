import React from 'react';

class LoginForm extends React.Component {
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
		console.log(this.state);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={ this.handleSubmit }>
				<label>
					<span>Username:</span>
					<input name="username" onChange={ this.handleChange } placeholder="user01" type="text" value={ this.state.username } />
				</label>
				<label>
					<span>Password:</span>
					<input name="password" onChange={ this.handleChange } placeholder="********" type="password" value={ this.state.password } />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default LoginForm;
