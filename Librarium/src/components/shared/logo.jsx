import { Link } from 'react-router-dom';
import logo from '../../images/logo-lambda.png';
import React from 'react';

export default function Logo() {
	return (
		<Link aria-label="Home Page Link" to="/">
			<img alt="Librarium Logo" aria-label="Librarium Logo" id="app-logo" src={logo} />
		</Link>
	);
}
