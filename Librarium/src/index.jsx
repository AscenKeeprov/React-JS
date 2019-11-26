import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Contacts from './components/shared/contacts';
import Forbidden from './components/shared/forbidden';
import Logo from './components/shared/logo';
import Navigation from './components/shared/navigation';
import NotFound from './components/shared/not-found';
import PasswordReset from './components/registry/password-reset';
import Profile from './components/registry/profile';
import React from 'react';
import ReactDOM from 'react-dom';
import Registry from './components/registry/registry';
import SignIn from './components/registry/sign-in';
import SignOut from './components/registry/sign-out';
import SignUp from './components/registry/sign-up';
import withSession from './components/higher-order/with-session';

import './index.scss';

const BrowserRouterWithSession = withSession(BrowserRouter);

ReactDOM.render(
	<BrowserRouterWithSession>
		<header id="app-header" role="banner">
			<Logo />
			<Navigation />
		</header>
		<main id="app-content" role="main">
			<Switch>
				<Route exact path="/" component={Registry} />
				<Route exact path="/resetpassword" component={PasswordReset} />
				<Route exact path="/profile/:id" component={Profile} />
				<Route exact path="/signin" component={SignIn} />
				<Route exact path="/signout" component={SignOut} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/forbidden" component={Forbidden} />
				<Route component={NotFound} />
			</Switch>
		</main>
		<footer id="app-footer" role="contentinfo">
			<Contacts />
			<div id="copyright">Copyright &copy; 2019 <Link to="/">Librarium</Link></div>
		</footer>
	</BrowserRouterWithSession>,
	document.getElementById('app-root')
);
