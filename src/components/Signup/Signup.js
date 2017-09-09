import React from 'react';
import { Redirect } from 'react-router-dom';
import './signup.css';

export class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cancelSignup = this.cancelSignup.bind(this);
	}

	cancelSignup() {
		this.props.toSignUp();
	}

	handleChange(event) {
		let { id, value } = event.target;

		switch(id) {
			case 'username':
				this.setState({ username: value });
				break;
			case 'password':
				this.setState({ password: value });
				break;
			default:
				// Nothin' to do here...
				break;
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		let user = {
			username: this.state.username,
			password: this.state.password
		};

		let headers = new Headers();
		headers.set('Content-Type', 'application/json');

		fetch('/api/signup', {
			method: 'post',
			headers: headers,
			body: JSON.stringify(user)
		})
			.then( res => res.json() )
			.then( res => this.setState({ redirect: true }) )
			.catch( err => this.setState({ errorMessage: err }) );
	}

	render() {
		return (
			<div>
				<h1>Sign up</h1>
				<form onSubmit={ this.handleSubmit }>
					<label htmlFor="username" />
					<input 
						id="username"
						type="text"
						onChange={ this.handleChange }
						/>
					<label htmlFor="password" />
					<input 
						id="password"
						type="password"
						onChange={ this.handleChange }
						/>
					<input
						type="button"
						value="Cancel"
						onClick={this.cancelSignup}
						/>
					<input
						type="submit"
						value="Sign Up"
						/>
				</form>
				{ this.state.errorMessage &&
					<h3 className="error-message">{ this.state.errorMessage }</h3>
				}

				{ this.state.redirect &&
					<Redirect to="/dashboard" />
				}
			</div>
		)
	}
}