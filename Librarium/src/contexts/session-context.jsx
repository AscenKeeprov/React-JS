import React from 'react';

const defaultContextValue = {
	session: {
		aut: undefined,
		uid: -1,
		unm: 'Guest'
	}
}

const SessionContext = React.createContext(defaultContextValue);

SessionContext._defaultValue = defaultContextValue;
SessionContext.displayName = 'Session';

export default SessionContext;
