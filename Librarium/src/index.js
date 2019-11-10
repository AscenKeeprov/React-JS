import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Contacts from './components/shared/Contacts';
import Navigation from './components/shared/Navigation';
import NotFound from './components/shared/NotFound';
import React from 'react';
import ReactDOM from 'react-dom';
import Registry from './components/Registry';
import SubscriptionForm from './components/user/Subscription-Form';

import './index.scss';

ReactDOM.render(
	<BrowserRouter>
		<React.Fragment>
			<header id="app-header">
				<Navigation />
			</header>
			<main id="app-content">
				<Switch>
					<Route exact path="/" component={ Registry } />
					<Route exact path="/subscribe" component={ SubscriptionForm } />
					<Route component={ NotFound } />
				</Switch>
			</main>
			<footer id="app-footer">
				<Contacts />
				<div id="copyright">Copyright &copy; 2019 <Link to="/">Librarium</Link></div>
			</footer>
		</React.Fragment>
	</BrowserRouter>,
	document.getElementById('app-root')
);
