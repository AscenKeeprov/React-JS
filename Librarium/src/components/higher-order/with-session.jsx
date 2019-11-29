import React from 'react';
import SessionContext from '../../contexts/session-context';

const authTokenKey = 'aut';
const storageKey = `Librarium.${SessionContext.displayName}`;
const userRolesKey = 'uro';

function withSession(Component) {
	class ComponentWithSession extends React.Component {
		constructor(props) {
			super(props);
			this.del = this.del.bind(this);
			this.end = this.end.bind(this);
			this.get = this.get.bind(this);
			this.hasRole = this.hasRole.bind(this);
			this.isAuthenticated = this.isAuthenticated.bind(this);
			this.set = this.set.bind(this);
			this.state = {
				session: this.loadFromStorage() || SessionContext._defaultValue.session
			};
		}

		del(key) {
			let sessionData = { ...this.state.session };
			delete sessionData[key];
			this.setState({ session: sessionData }, this.updateStorage);
		}

		end() {
			this.setState({ session: SessionContext._defaultValue.session });
			localStorage.removeItem(storageKey);
		};

		get(key) {
			return this.state.session[key];
		};

		hasRole(roleName) {
			if (!this.state.session.hasOwnProperty(userRolesKey)) return false;
			const userRoles = this.state.session[userRolesKey];
			return userRoles.includes(roleName);
		}

		isAuthenticated() {
			if (!this.state.session.hasOwnProperty(authTokenKey)) return false;
			return this.state.session[authTokenKey] !== undefined
				&& this.state.session[authTokenKey] !== null;
		}

		loadFromStorage() {
			return JSON.parse(localStorage.getItem(storageKey));
		}

		render() {
			const contextProvider = {
				session: {
					del: this.del,
					end: this.end,
					get: this.get,
					hasRole: this.hasRole,
					isAuthenticated: this.isAuthenticated,
					set: this.set
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
			localStorage.setItem(storageKey, JSON.stringify(this.state.session));
		}
	};

	ComponentWithSession.displayName = `${Component.displayName || Component.name || 'Component'}WithSession`;

	return ComponentWithSession;
}

export default withSession;
