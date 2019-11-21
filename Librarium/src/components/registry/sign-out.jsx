import Kinvey from '../../services/kinvey';
import React from 'react';
import { Redirect } from 'react-router-dom';
import SessionContext from '../../contexts/session-context';

class SignOut extends React.Component {
	render() {
		const authToken = this.context.session.get('aut');
		Kinvey.signOut(authToken).then(res => {
			this.context.session.end();
		}).catch(console.error);
		return <Redirect push to="/" />;
	}
}

SignOut.contextType = SessionContext;

export default SignOut;
