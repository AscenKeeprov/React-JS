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
								<li className="subnav">
									<span>Hello, {`${session.get('unm')}`}!</span>
									<ul className="nav-menu">
										<li>
											<NavLink to={{
												pathname: `/profile/${session.get('uid')}`,
												state: { aut: session.get('aut') }
											}}>Profile</NavLink>
										</li>
										<li>
											<NavLink to={`/subscription/${session.get('sid')}`}>Subscription</NavLink>
										</li>
										<li>
											<NavLink to="/signout">Sign Out</NavLink>
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

Navigation.contextType = SessionContext;

export default Navigation;
