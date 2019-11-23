import React from 'react';
import SessionContext from '../../contexts/session-context';

const storageKey = `Librarium.${SessionContext.displayName}`;

function withSession(Component) {
	class ComponentWithSession extends React.Component {
		constructor(props) {
			super(props);
			this.del = this.del.bind(this);
			this.end = this.end.bind(this);
			this.get = this.get.bind(this);
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

		loadFromStorage() {
			return JSON.parse(localStorage.getItem(storageKey));
		}

		render() {
			const contextProvider = {
				session: {
					del: this.del,
					end: this.end,
					get: this.get,
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
