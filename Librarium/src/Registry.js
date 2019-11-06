import Catalogue from './Catalogue';
import React from 'react';
import logo from './logo.svg';
import './Registry.css';

function Registry() {
	return (
		<section className="Registry">
			<Catalogue />
			<header className="Registry-header">
				<img src={ logo } className="Registry-logo" alt="logo" />
				<p>Edit <code>src/Registry.js</code> and save to reload.</p>
				<a className="Registry-link" href="https://reactjs.org/docs/hello-world.html" rel="noopener noreferrer" target="_blank">Learn React</a>
			</header>
		</section>
	);
}

export default Registry;
