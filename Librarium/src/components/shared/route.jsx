import { filterByKeys } from '../../utilities/object';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import SessionContext from '../../contexts/session-context';

export default function RouteWithAuth(props) {
	const { authenticate, authorize } = props;
	const { session } = useContext(SessionContext);
	if (authenticate === true && session.isAuthenticated() === false) {
		return <Redirect push to="/signin" />
	}
	if (authenticate === false && session.isAuthenticated() === true) {
		return <Redirect push to="/" />
	}
	if (typeof authorize === 'string' && session.hasRole(authorize) === false) {
		return <Redirect push to="/forbidden" />
	}
	if (Array.isArray(authorize) && authorize.every(role => session.hasRole(role) === false)) {
		return <Redirect push to="/forbidden" />
	}
	const routeProps = filterByKeys(props, ['authenticate', 'authorize']);
	return <Route {...routeProps} />
}
