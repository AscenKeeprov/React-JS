import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Contacts from './components/shared/contacts';
import Navigation from './components/shared/navigation';
import NotFound from './components/shared/not-found';
import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/registry/profile';
import Registry from './components/registry/registry';
import { Session } from './contexts/session-context';
import SignInForm from './components/registry/signin-form';
import SignOut from './components/shared/sign-out';
import SignUpForm from './components/registry/signup-form';

import './index.scss';

ReactDOM.render(
	<BrowserRouter>
		<Session>
			<header id="app-header">
				<Navigation />
			</header>
			<main id="app-content">
				<Switch>
					<Route exact path="/" component={Registry} />
					<Route exact path="/profile/:id" component={Profile} />
					<Route exact path="/signin" component={SignInForm} />
					<Route exact path="/signout" component={SignOut} />
					<Route exact path="/signup" component={SignUpForm} />
					<Route component={NotFound} />
				</Switch>
			</main>
			<footer id="app-footer">
				<Contacts />
				<div id="copyright">Copyright &copy; 2019 <Link to="/">Librarium</Link></div>
			</footer>
		</Session>
	</BrowserRouter>,
	document.getElementById('app-root')
);
