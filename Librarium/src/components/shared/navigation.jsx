import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import SessionContext from '../../contexts/session-context';

export default function Navigation() {
	const { session } = useContext(SessionContext);
	const userId = session.get('uid');
	const alias = session.get('unm');
	return (
		<nav id="app-navigation">
			<ul>
				<li>
					<NavLink to="/catalogue">Catalogue</NavLink>
				</li>
				{session.isAuthenticated() ? (
					<li className="nav-menu">
						<span className="nav-menu-header">{`Greetings, ${alias}!`}</span>
						<ul className="nav-menu-content">
							<li>
								<NavLink to={{
									pathname: `/profile/${userId}`,
									state: { aut: session.get('aut') }
								}}>Profile</NavLink>
							</li>
							{session.hasRole('Staff Members') ? (
								<li>
									<NavLink to={"/addbook"}>Add a book</NavLink>
								</li>
							) : (
									<li>
										<NavLink to={`/subscriptions/${userId}`}>Subscriptions</NavLink>
									</li>
								)}
							<li>
								<NavLink to="/signout">Sign out</NavLink>
							</li>
						</ul>
					</li>
				) : (
						<React.Fragment>
							<li>
								<NavLink to="/signin">Sign In</NavLink>
							</li>
							<li>
								<NavLink to="/signup">Sign Up</NavLink>
							</li>
						</React.Fragment>
					)
				}
			</ul>
		</nav>
	);
}