import { NavLink } from 'react-router-dom';
import React from 'react';
import SessionContext from '../../contexts/session-context';

class Navigation extends React.Component {
	render() {
		return (
			<nav id="app-navigation">
				<ul>
					<SessionContext.Consumer>
						{context => (
							context.session.get('aut') ? (
								<li className="nav-menu">
									<span className="nav-menu-header">{`Greetings, ${context.session.get('unm')}!`}</span>
									<ul className="nav-menu-content">
										<li>
											<NavLink to={{
												pathname: `/profile/${context.session.get('uid')}`,
												state: { aut: context.session.get('aut') }
											}}>Profile</NavLink>
										</li>
										<li>
											<NavLink to={`/subscription/${context.session.get('sid')}`}>Subscription</NavLink>
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

export default Navigation;
