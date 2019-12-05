import React from 'react';

const SessionContext = React.createContext();

SessionContext._keys = {
	authToken: 'aut',
	userId: 'uid',
	username: 'unm',
	userRoles: 'uro'
}

SessionContext._defaultValue = {
	session: {
		[SessionContext._keys.authToken]: undefined,
		[SessionContext._keys.userId]: -1,
		[SessionContext._keys.username]: 'Guest'
	}
}

SessionContext.displayName = 'Session';

export default SessionContext;
