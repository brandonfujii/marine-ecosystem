import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TopBar extends Component {
	constructor(props) {
		super(props);

		this.renderGameTime = this.renderGameTime.bind(this);
	}

	renderGameTime(num) {
		let minutes = Math.floor(num / 60);
		let seconds = num % 60;
		return `${minutes}:${(seconds <= 9 ? '0' : '') + seconds}`;
	}

	render() {
		let { time, score } = this.props; 

		return (
			<div id="top-bar">
				<div id="game-time-container">
					<img id="shell-icon" src="assets/shell.png" />
					<div id="game-time">{ this.renderGameTime(time) }</div>
				</div>
				<div id="game-score">{ score }</div>
			</div>
		);
	}
}

TopBar.propTypes = {
	score: PropTypes.number,
	time: PropTypes.number
}

export default TopBar;