import { BrowserRouter, Link, Switch } from 'react-router-dom';
import Catalogue from './components/catalogue/catalogue';
import Contacts from './components/shared/contacts';
import Forbidden from './components/shared/forbidden';
import Logo from './components/shared/logo';
import Moved from './components/shared/moved';
import Navigation from './components/shared/navigation';
import NotFound from './components/shared/not-found';
import PasswordReset from './components/registry/password-reset';
import Profile from './components/registry/profile';
import React from 'react';
import ReactDOM from 'react-dom';
import ReadingAdd from './components/catalogue/reading-add';
import ReadingDetails from './components/catalogue/reading-details';
import ReadingViewer from './components/catalogue/reading-viewer';
import Registry from './components/registry/registry';
import Route from './components/shared/route';
import SignIn from './components/registry/sign-in';
import SignOut from './components/registry/sign-out';
import SignUp from './components/registry/sign-up';
import withSession from './components/higher-order/with-session';

import './index.scss';

const BrowserRouterWithSession = withSession(BrowserRouter);

ReactDOM.render(
	<BrowserRouterWithSession>
		<header className="flex-nowrap" id="app-header" role="banner">
			<Logo />
			<Navigation />
		</header>
		<main id="app-content" role="main">
			<Switch>
				<Route component={Registry} exact path="/" />
				<Route authorize="Staff Members" component={ReadingAdd} exact path="/catalogue/add" />
				<Route component={ReadingDetails} exact path="/catalogue/details/:id" />
				<Route authorize="Subscribers" component={ReadingViewer} exact path="/catalogue/read/:id" />
				<Route component={Catalogue} exact path="/catalogue" />
				<Route authenticate={false} component={PasswordReset} exact path="/resetpassword" />
				<Route authenticate component={Profile} exact path="/profile/:id" />
				<Route authenticate={false} component={SignIn} exact path="/signin" />
				<Route authenticate component={SignOut} exact path="/signout" />
				<Route component={SignUp} exact path="/signup" />
				<Route component={Forbidden} exact path="/forbidden" />
				<Route component={Moved} exact path="/moved" />
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
