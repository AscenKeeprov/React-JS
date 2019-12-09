import NavigationItem from './navigation-item';
import React, { useContext } from 'react';
import SessionContext from '../../contexts/session-context';

export default function Navigation() {
	const { session } = useContext(SessionContext);
	const { alias, authToken, id } = session.user;
	return (
		<nav id="app-navigation">
			<ul className="nav-list">
				<NavigationItem label="Catalogue" to="/catalogue" />
				{session.isAuthenticated() ? (
					<li className="nav-item nav-menu">
						<span className="nav-menu-header">{`Greetings, ${alias}!`}</span>
						<ul className="nav-menu-content">
							<NavigationItem label="Profile" to={{
								pathname: `/profile/${id}`,
								state: { authToken }
							}} />
							{session.hasRole('Staff Members') ? (
								<NavigationItem label="Add a book" to="/catalogue/add" />
							) : (
									<NavigationItem label="Subscriptions" to={`/subscriptions/${id}`} />
								)}
							<NavigationItem label="Sign out" to="/signout" />
						</ul>
					</li>
				) : (
						<React.Fragment>
							<NavigationItem label="Sign In" to="/signin" />
							<NavigationItem label="Sign Up" to="/signup" />
						</React.Fragment>
					)
				}
			</ul>
		</nav>
	);
}