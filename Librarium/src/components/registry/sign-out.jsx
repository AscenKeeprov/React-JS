import Kinvey from '../../services/kinvey';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import SessionContext from '../../contexts/session-context';

export default function SignOut() {
	const { session } = useContext(SessionContext);
	const authToken = session.get('aut');
	Kinvey.signOut(authToken)
		.catch(console.error)
		.finally(session.end);
	return <Redirect push to="/" />;
}
