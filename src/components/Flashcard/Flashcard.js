import React, { Component } from 'react';

export class Flashcard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showsFront: true
		}

		this.flip = this.flip.bind(this);
	}

	flip() {
		this.setState({ showsFront: !this.showsFront })
	}

	render() {
		return (
			<div>
				<h1>Flashcard</h1>
				<h3>Front side:</h3>
				<p>{this.props.card.front}</p>
				<h3>Back side:</h3>
				<p>{this.props.card.back}</p>
			</div>
		)
	}
}