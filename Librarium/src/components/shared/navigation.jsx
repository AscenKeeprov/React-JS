import { NavLink } from 'react-router-dom';
import React from 'react';
import SessionContext from '../../contexts/session-context';

class Navigation extends React.Component {
	render() {
		return (
			<nav id="app-navigation">
				<ul>
					<SessionContext.Consumer>
						{session => (
							session.get('aut') ? (
								<ul className="nav-menu">
									<li>{`${session.get('unm')}`}</li>
									<li>
										<NavLink to={`/profile/${session.get('uid')}`}>Profile</NavLink>
									</li>
									<li>
										<NavLink to={`/subscription/${session.get('sid')}`}>Subscription</NavLink>
									</li>
									<li>
										<NavLink to="/signout">Sign Out</NavLink>
									</li>
								</ul>
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

Navigation.contextType = SessionContext;

export default Navigation;
