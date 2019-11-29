import { NavLink } from 'react-router-dom';
import React from 'react';
import SessionContext from '../../contexts/session-context';

class Navigation extends React.Component {
	render() {
		return (
			<nav id="app-navigation">
				<ul>
					<li>
						<NavLink to="/catalogue">Catalogue</NavLink>
					</li>
					<SessionContext.Consumer>
						{context => (
							context.session.isAuthenticated() ? (
								<li className="nav-menu">
									<span className="nav-menu-header">{`Greetings, ${context.session.get('unm')}!`}</span>
									<ul className="nav-menu-content">
										<li>
											<NavLink to={{
												pathname: `/profile/${context.session.get('uid')}`,
												state: { aut: context.session.get('aut') }
											}}>Profile</NavLink>
										</li>
										{context.session.hasRole('Staff Members') ? (
											<li>
												<NavLink to={"/addbook"}>Add a book</NavLink>
											</li>
										) : (
												<li>
													<NavLink to={`/subscriptions/${context.session.get('uid')}`}>Subscriptions</NavLink>
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
						)}
					</SessionContext.Consumer>
				</ul>
			</nav>
		);
	}
}

export default Navigation;
