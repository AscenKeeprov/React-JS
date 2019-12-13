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

		authorize(roleNames) {
			let userRoles = [];
			if (Array.isArray(roleNames)) userRoles = [...roleNames];
			if (typeof roleNames === 'string') userRoles.push(roleNames);
			if (userRoles.length > 0) this.set(keys.userRoles, userRoles);
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
			const sessionData = { ...this.state.session };
			return sessionData[key];
		};

		isAuthenticated() {
			if (!this.state.session.hasOwnProperty(keys.authToken)) return false;
			const authToken = this.get(keys.authToken);
			return typeof authToken === 'string' && authToken !== '';
		}

		isAuthorized(roleNames) {
			if (!this.state.session.hasOwnProperty(keys.userRoles)) return false;
			const userRoles = this.get(keys.userRoles) || [];
			if (userRoles.length === 0) return false;
			let requiredRoles = [];
			if (Array.isArray(roleNames)) requiredRoles = [...roleNames];
			if (typeof roleNames === 'string') requiredRoles.push(roleNames);
			if (requiredRoles.length === 0) return true;
			return requiredRoles.some(role => userRoles.includes(role));
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
					isAuthenticated: this.isAuthenticated,
					isAuthorized: this.isAuthorized,
					user: {
						alias: this.get(keys.username),
						authToken: this.get(keys.authToken),
						id: this.get(keys.userId),
						roles: this.get(keys.userRoles) || []
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
