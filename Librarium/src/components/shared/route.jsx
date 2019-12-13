import ObjectUtilities from '../../utilities/object';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import SessionContext from '../../contexts/session-context';

export default function RouteWithAuth(props) {
	const { authenticate, authorize } = props;
	const { session } = useContext(SessionContext);
	const routeProps = ObjectUtilities.dropKeys(props, ['authenticate', 'authorize']);

	const checkAuthentication = (requiresAuthentication) => {
		if (requiresAuthentication === true && session.isAuthenticated() === false) {
			return <Redirect to="/signin" />
		}
		if (requiresAuthentication === false && session.isAuthenticated() === true) {
			return <Redirect to="/" />
		}
	}

	const checkAuthorization = (requiredRoles) => {
		if (requiredRoles && session.isAuthorized(requiredRoles) === false) {
			return <Redirect to="/forbidden" />;
		}
	}

	return checkAuthentication(authenticate)
		|| checkAuthorization(authorize)
		|| <Route {...routeProps} />;
}
