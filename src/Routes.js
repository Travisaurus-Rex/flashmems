import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from './components/App/App';
import { Signup } from './components/Signup/Signup';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Quiz } from './components/Quiz/Quiz';
import { CreateFlashcardForm } from './components/CreateFlashcardForm/CreateFlashcardForm';
import { Menu } from './components/shared/Menu/Menu';

export const Routes = (props) => (
	<Router basename="/">
		<div>
			<Menu />
			<Route exact path="/" component={App} />
			<Route path="/signup" component={Signup} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/quiz" component={Quiz} />
			<Route path="/create/flashcard" component={CreateFlashcardForm} />
		</div>
	</Router>
)