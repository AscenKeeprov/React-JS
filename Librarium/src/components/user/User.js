import React from 'react';

class User extends React.Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.register = this.register.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.state = {
			isLoggedIn: false,
			isSubscribed: false,
			username: props.username || 'Guest'
		};
	}

	login() {
		this.setState({ isLoggedIn: true });
	}

	logout() {
		this.setState({ isLoggedIn: false });
	}

	register() {

	}

	subscribe() {
		this.setState({ isSubscribed: true });
	}

	render() {
		return (
			<span></span>
		);
	}
}

export default User;
