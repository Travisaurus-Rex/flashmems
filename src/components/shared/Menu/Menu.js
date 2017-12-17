import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

export class Menu extends Component {
	render() {
		return (
			<ul className="nav">
				<li className="nav-item">
					<Link to="/quiz" className="nav-link active">quiz</Link>
				</li>
				<li className="nav-item">
					<Link to="/create/flashcard" className="nav-link">add flashcard</Link>
				</li>
			</ul>
		);
	}
}