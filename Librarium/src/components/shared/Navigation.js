import { NavLink } from 'react-router-dom';
import React from 'react';

class Navigation extends React.Component {
	render() {
		return (
			<nav id="app-navigation">
				<ul>
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
					<li>
						<NavLink to="/subscribe">Subscribe</NavLink>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navigation;
