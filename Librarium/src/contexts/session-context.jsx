import React from 'react';

const defaultSessionState = {
	aut: undefined,
	uid: -1,
	unm: 'Guest'
}

const SessionContext = React.createContext(defaultSessionState);
SessionContext.displayName = 'Session';

const storageKey = `Librarium.${SessionContext.displayName}`;

export class Session extends React.Component {
	constructor(props) {
		super(props);
		this.del = this.del.bind(this);
		this.end = this.end.bind(this);
		this.get = this.get.bind(this);
		this.set = this.set.bind(this);
		this.state = this.loadFromStorage() || defaultSessionState;
	}

	del(key) {
		this.setState({ [key]: undefined }, this.updateStorage);
	}

	end() {
		localStorage.removeItem(storageKey);
		this.setState(defaultSessionState);
	};

	get(key) {
		return this.state[key];
	};

	loadFromStorage() {
		return JSON.parse(localStorage.getItem(storageKey));
	}

	render() {
		const provider = {
			del: this.del,
			end: this.end,
			get: this.get,
			set: this.set
		};
		return (
			<SessionContext.Provider value={provider}>
				{this.props.children}
			</SessionContext.Provider>
		);
	}

	set(key, value) {
		this.setState({ [key]: value }, this.updateStorage);
	};

	updateStorage() {
		localStorage.setItem(storageKey, JSON.stringify(this.state));
	}
}

export default SessionContext;
