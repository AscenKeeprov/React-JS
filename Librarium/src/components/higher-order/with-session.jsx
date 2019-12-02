import React from 'react';
import SessionContext from '../../contexts/session-context';

const keys = {
	storage: `Librarium.${SessionContext.displayName}`,
	...SessionContext._keys
};

function withSession(Component) {
	class ComponentWithSession extends React.Component {
		constructor(props) {
			super(props);
			this.authenticate = this.authenticate.bind(this);
			this.authorize = this.authorize.bind(this);
			this.del = this.del.bind(this);
			this.end = this.end.bind(this);
			this.get = this.get.bind(this);
			this.hasRole = this.hasRole.bind(this);
			this.isAuthenticated = this.isAuthenticated.bind(this);
			this.isAuthorized = this.isAuthorized.bind(this);
			this.set = this.set.bind(this);
			this.state = {
				session: this.loadFromStorage() || SessionContext._defaultValue.session
			};
		}

		authenticate({ authToken, userId, username }) {
			if (!authToken) throw new Error('Missing authentication token!');
			let sessionData = { ...this.state.session };
			sessionData[keys.authToken] = authToken;
			if (userId) sessionData[keys.userId] = userId;
			if (username) sessionData[keys.username] = username;
			this.setState({ session: sessionData }, this.updateStorage);
		}

		authorize(userRoles) {
			this.set(keys.userRoles, userRoles);
		}

		del(key) {
			let sessionData = { ...this.state.session };
			delete sessionData[key];
			this.setState({ session: sessionData }, this.updateStorage);
		}

		end() {
			this.setState({ session: SessionContext._defaultValue.session });
			localStorage.removeItem(keys.storage);
		};

		get(key) {
			return this.state.session[key];
		};

		hasRole(roleName) {
			if (!this.state.session.hasOwnProperty(keys.userRoles)) return false;
			const userRoles = this.state.session[keys.userRoles];
			return userRoles.includes(roleName);
		}

		isAuthenticated() {
			if (!this.state.session.hasOwnProperty(keys.authToken)) return false;
			return this.state.session[keys.authToken] !== undefined
				&& this.state.session[keys.authToken] !== null;
		}

		isAuthorized() {
			if (!this.state.session.hasOwnProperty(keys.userRoles)) return false;
			return this.state.session[keys.userRoles] !== undefined
				&& this.state.session[keys.userRoles] !== null;
		}

		loadFromStorage() {
			return JSON.parse(localStorage.getItem(keys.storage));
		}

		render() {
			const contextProvider = {
				session: {
					authenticate: this.authenticate,
					authorize: this.authorize,
					end: this.end,
					hasRole: this.hasRole,
					isAuthenticated: this.isAuthenticated,
					isAuthorized: this.isAuthorized,
					user: {
						alias: this.get(keys.username),
						authToken: this.get(keys.authToken),
						id: this.get(keys.userId),
					}
				}
			};
			return (
				<Component session={this.state.session} {...this.props}>
					<SessionContext.Provider value={contextProvider}>
						{this.props.children}
					</SessionContext.Provider>
				</Component>
			);
		}

		set(key, value) {
			let sessionData = { ...this.state.session };
			sessionData[key] = value;
			this.setState({ session: sessionData }, this.updateStorage);
		}

		updateStorage() {
			localStorage.setItem(keys.storage, JSON.stringify(this.state.session));
		}
	};

	ComponentWithSession.displayName = `${Component.displayName || Component.name || 'Component'}WithSession`;

	return ComponentWithSession;
}

export default withSession;
