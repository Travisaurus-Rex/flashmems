import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			username: '', 
			password: '',  
			loggedIn: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.submitForm   = this.submitForm.bind(this);
		this.cancelLogin = this.cancelLogin.bind(this);
	}

	handleChange(event) {
		let { id, value } = event.target;

		// switch case checks which field was edited
		// and updates the state accordingly
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

	cancelLogin() {
		this.props.toLogin();
	}

	submitForm(event) {
		event.preventDefault();
		
		// store username and password in an object called user
		let user = {
			username: this.state.username, 
			password: this.state.password
		};

		// setup headers because express is
		// a diva that won't work without 'em
		let headers = new Headers();
		headers.set('Content-Type', 'application/json');

		// use fetch to send user to the server
		fetch('/api/login', {
			method: 'post',
			headers: headers,
			body: JSON.stringify(user)
		})  // prepare the response
			.then( res => res.json())
			.then( res => {
				// if status code is valid...
				if (res.status === 'Valid') {
					// change state to logged in
					this.setState({ loggedIn: true })

				} else {
					// or set an error message
					this.setState({ errorMessage: res.message })

				}
			}) // something went wrong on the server, set an error message
			.catch( err => {
					this.setState({ errorMessage: 'There was a server error. Please try again.' });
					console.error(err);
				}
			);
	} 

	render() {
		return (

			<div className='login-container'>
				<form className='login-form' onSubmit={ this.submitForm }>
				<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
					<input 
						className='mdl-textfield__input'
						id='username' 
						type='text' 
						onChange={ this.handleChange } 
						/>
					<label 
						className='mdl-textfield__label'
						htmlFor='username'>Username</label>
				</div>
				<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
					<input 
						className='mdl-textfield__input'
						id='password' 
						type='password' 
						onChange={ this.handleChange } 
						/>
					<label 
						className='mdl-textfield__label'
						htmlFor='password'>Password</label>
				</div>
					<input 
						className='mdl-button mdl-js-button cancel-button'
						type='button'
						onClick={ this.cancelLogin}  
						value='Cancel'  
						/>
					<input 
						className='mdl-button mdl-js-button login-button'
						type='submit' 
						value='Login'  
						/>
					{ this.state.errorMessage &&
						<h3 className="error-message">{ this.state.errorMessage }</h3>
					}
				</form>

				{ this.state.loggedIn &&
					<Redirect to="/dashboard" />
				}
			</div>

		)
	}
}