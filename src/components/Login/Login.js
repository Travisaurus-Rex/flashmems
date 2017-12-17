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
		this.cancelLogin  = this.cancelLogin.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	handleChange(event) {
		let { id, value } = event.target;

		// switch case checks which field was edited
		// and updates the state accordingly
		if (id === 'login_username'){
			this.setState({ username: value });
		}

		if (id === 'login_password') {
			this.setState({ password: value });
		}
	}

	cancelLogin() {
		this.props.toLogin();
	}

	validateForm(event) {

		event.preventDefault();
	
		let { username, password } = this.state;

		let areStrings = (typeof username === 'string' && typeof password === 'string') ? true : false;

		if (username && password && areStrings) {
			this.submitForm();
		} else {
			this.setState({ errorMessage: 'Please fill out the form.'})
		}

		console.log('IS THIS WORKING?');
	}

	submitForm(event) {
		
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
				<form className='login-form' onSubmit={ this.validateForm }>
					<div className='form-group'>
						<label 
							className=''
							htmlFor='username'>Username</label>
						<input 
							className='form-control'
							id='login_username' 
							type='text' 
							onChange={ this.handleChange } 
							/>
					</div>
					<div className='form-group'>
						<label 
							className=''
							htmlFor='password'>Password</label>
						<input 
							className='form-control'
							id='login_password' 
							type='password' 
							onChange={ this.handleChange } 
							/>
					</div>
					<div className="row">
					<div className="col">
					<input 
						className='login-form-button cancel-button btn btn-outline-dark'
						type='button'
						onClick={ this.cancelLogin}  
						value='Cancel'  
						/>
					</div>
					<div className="col text-right">
					<input 
						className='login-form-button login-button btn btn-primary'
						type='submit' 
						value='Login'  
						/>
						</div>
					</div>
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