import React, { Component } from 'react';
import { Flashcard } from '../Flashcard/Flashcard';

export class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [
				{front: '你好', back: 'Hello'},
				{front: '我很好', back: 'I\'m very well'},
				{front: '没关系', back: 'No problem'},
				{front: '你呢', back: 'And you?'},
				{front: '再见', back: 'See you later'},
				{front: '笔记本', back: 'notebook'},
			],
			currentCardIndex: 0,
			isTesting: true,
		}
		this.shuffleCards = this.shuffleCards.bind(this);
		this.nextCard = this.nextCard.bind(this);
	}

	componentDidMount() {
		let shuffledCards = this.shuffleCards(this.state.cards);
		this.setState({cards: shuffledCards});
	}

	shuffleCards(array) {
		var m = array.length, t, i;
		while (m) {

		i = Math.floor(Math.random() * m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
		}

		return array;
	}

	nextCard() {

		let { currentCardIndex: i, cards } = this.state;

		if (i === cards.length - 1) {
			this.setState({ isTesting: false })
		} else {
			this.setState({ currentCardIndex: ++i })
		}
	}

	render() {
		let { cards, currentCardIndex, isTesting } = this.state;

		return (
			<div>
				{ isTesting &&
					<span>
						<Flashcard card={cards[currentCardIndex]} />
						<button onClick={this.nextCard}>Next Card</button>
					</span>
				}

				{ !isTesting &&
					<h3>You finished testing!</h3>
				}
			</div>
		);
	}
}