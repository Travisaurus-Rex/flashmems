import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import { App } from './components/App/App';
import { Signup } from './components/Signup/Signup';
import { Dashboard } from './components/Dashboard/Dashboard';

const customHistory = createBrowserHistory();

export const Routes = (props) => (
	<Router history={ customHistory }>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/signup" component={Signup} />
			<Route path="/dashboard" component={Dashboard} />
		</div>
	</Router>
)