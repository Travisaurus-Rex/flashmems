import React from 'react';
import './App.css';

import { CSSTransitionGroup } from 'react-transition-group';

import { Login } from '../Login/Login';
import { Signup } from '../Signup/Signup';

export class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { toLogin: false, toSignUp: false};

		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);

		this.cancelLogin = this.cancelLogin.bind(this);
		this.cancelSignup = this.cancelSignup.bind(this);
	}


	login() {

		if (this.state.toSignUp) {
			this.setState({toSignUp: false})
		}
		this.setState({ toLogin: true });
	}

	cancelLogin() {
		this.setState({ toLogin: false });
	}

	signup() {
		if (this.state.toLogin) {
			this.setState({toLogin: false})
		}
		this.setState({ toSignUp: true });
	}

	cancelSignup() {
		this.setState({ toSignUp: false });
	}

	render() {

	    return (
	  		<div id="main">
	  			<h1>Here's the home page</h1>
	  			<button onClick={ this.login }>Login</button>
	  			<button onClick={ this.signup }>Sign Up</button>
	  			<CSSTransitionGroup
	  				transitionName="example"
	  				transitionEnterTimeout={500}
	  				transitionLeaveTimeout={250}
	  			>
	  			{ this.state.toLogin &&
	  				<Login toLogin={ this.cancelLogin } />
	  			}
	  			</CSSTransitionGroup>
	  			{ this.state.toSignUp &&
	  				<Signup toSignUp={ this.cancelSignup } />
	  			}
	    	</div>
	    );
	 }
}
