import React, { Component } from 'react';

export class CreateFlashcardForm extends Component {
	constructor() {
		super();
		this.state = {
			front: '',
			back: '',
			error: ''
		};
		this.validateForm     = this.validateForm.bind(this);
		this.handleChange     = this.handleChange.bind(this);
		this.handleSubmit     = this.handleSubmit.bind(this);
		this.clearInputValues = this.clearInputValues.bind(this);
	}

	validateForm(event) {
		event.preventDefault();

		let { front, back } = this.state;

		if (front && back) {
			this.handleSubmit();
		}  else {
			console.log("Fill out the form, jackass!");
		}
	} 

	handleChange(event) {
		let { id, value } = event.target;
		if (id === 'front') {
			this.setState({front: value});
		} else if (id === 'back') {
			this.setState({back: value});
		}
	}

	handleSubmit() {

		let flashcard = {
			front: this.state.front,
			back: this.state.back
		}

		let headers = new Headers();
		headers.set('Content-Type', 'application/json')

		fetch('/api/flashcard', {
			method: 'POST',
			mode: 'CORS',
			headers: headers,
			body: JSON.stringify(flashcard)
		})
		.then(res => res.json())
		.then(res => {
			if (res.status !== 200) {
				this.setState({ error: res.message, message: ''})
			} else if (res.status === 200) {
				this.setState({ message: res.message , error: ''})
				this.clearInputValues();
			}
		})
		.catch(err => {
			if (!err.message) {
				err.message = "Something went wrong.";
			}
			console.error(err.message)
		})
	}

	clearInputValues() {
		let front = document.querySelector('#front');
		let back  = document.querySelector('#back');

		front.value = '';
		back.value = '';
	}

	render() {
		return (
			<div>
				<form onSubmit={this.validateForm}>
					<input type="text" id="front" onChange={this.handleChange} />
					<input type="text" id="back" onChange={this.handleChange} />
					<input type="submit" value="Add Card" />
				</form>
				{ this.state.error && 
					<h3 style={{color: 'red'}}>{this.state.error}</h3>
				}
				{ this.state.message && 
					<h3 style={{color: 'blue'}}>{this.state.message}</h3>
				}
			</div>
		);
	}
}