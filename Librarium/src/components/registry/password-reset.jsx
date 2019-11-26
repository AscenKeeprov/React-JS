import Button from '../shared/button';
import Form from '../shared/form';
import InputGroup from '../shared/input-group';
import Kinvey from '../../services/kinvey';
import PageTitle from '../shared/page-title';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Toggle from '../shared/toggle';

class PasswordReset extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			resetMethod: 'email',
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
		const { email, resetMethod, username } = this.state;
		let existenceCheck;
		switch (resetMethod) {
			case 'email':
				existenceCheck = Kinvey.checkEmailExists({ email });
				break;
			case 'username':
				existenceCheck = Kinvey.checkUsernameExists({ username });
				break;
			default: throw new Error('Invalid password reset method!');
		}
		existenceCheck.then(existenceCheckResult => {
			const resultKey = `${resetMethod}Exists`;
			if (existenceCheckResult[resultKey] === false) {
				console.error(`No such ${resetMethod} on record!`);
			} else Kinvey.resetPassword(this.state[resetMethod]).then(() => {
				this.setState({ redirectPath: '/signin' });
			}).catch(console.error);
		}).catch(console.error);
	}

	redirect() {
		const path = this.state.redirectPath;
		if (path) return <Redirect push to={path} />;
	}

	render() {
		return this.redirect() || (
			<React.Fragment>
				<PageTitle value="Reset Password" />
				<Form id="form-reset-password" onSubmit={this.handleSubmit} title="Password Reset Form">
					<fieldset>
						<p>What do you want us to use for the reset?</p>
						<Toggle boundTo="resetMethod" onChange={this.handleChange} options={[
							{ label: 'Alias', value: 'username' },
							{ checked: true, label: 'E-mail', value: 'email' }
						]} />
						{this.renderInputGroupSwitch(this.state.resetMethod)}
					</fieldset>
					<Button label="Reset Password" type="submit" />
				</Form>
			</React.Fragment>
		);
	}

	renderInputGroupSwitch(condition) {
		switch (condition) {
			case 'email':
				return <InputGroup label="E-mail address" name="email" onChange={this.handleChange} placeholder="reader1984@mail.com" required type="email" value={this.state.email} />
			case 'username':
				return <InputGroup label="Alias" name="username" onChange={this.handleChange} placeholder="user01" required type="text" value={this.state.username} />
			default: throw new Error('Unexpected render condition!');
		}
	}
}

export default PasswordReset;
