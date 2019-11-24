import { Link } from 'react-router-dom';
import logo from '../../images/logo-lambda.png';
import React from 'react';

class Logo extends React.Component {
	render() {
		return (
			<Link aria-label="Home Page Link" to="/">
				<img aria-label="Librarium Logo" id="app-logo" alt="Librarium Logo" src={logo} />
			</Link>
		);
	}
}

export default Logo;
