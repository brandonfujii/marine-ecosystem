import React, { Component } from 'react';
import Ecosystem from './ecosystem';
import Time from './time';

const END_TIME_SECONDS = 300;
const DOUBLING_RATE = 30;

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gameTime: null,
			time: null,
			score: null,
			fish: [
				{ x:  100, y: 100 },
				{ x:  150, y: 207 },
				{ x:  75, y: 39 },
				{ x:  54, y: 100 },
				{ x:  110, y: 1500 }
			]
		};

		this.initializeGame = this.initializeGame.bind(this);
		this.onGameTick = this.onGameTick.bind(this);
		this.onGameOver = this.onGameOver.bind(this);
		this.reproduce = this.reproduce.bind(this);
		this.generateFish = this.generateFish.bind(this);
	}

	componentDidMount() {
		this.initializeGame();
	}

	initializeGame() {
		this.setState({
			gameTime: new Time(END_TIME_SECONDS, this.onGameTick, this.onGameOver),
			time: 0,
			score: 0,
		}, function() {
			this.state.gameTime.start();
		});
	}

	onGameTick(tick) {
		this.setState({
			time: tick,
		}, function()  {
			if (this.state.time % DOUBLING_RATE === 0) {
				this.reproduce();
			}
		});
	}

	onGameOver() {
		console.log("Finished game");
		this.state.gameTime.stop();
		this.setState({
			gameTime: null
		});
	}

	reproduce() {
		let numFish = this.state.fish.length;
		let updatedFish = [];

		for (let i = 0; i < numFish; i++) {
			let f = this.generateFish();
			updatedFish.push(f);
		}

		this.setState({
			fish: this.state.fish.slice().concat(updatedFish)
		});
	}

	generateFish() {
		return { x: Math.floor(Math.random() * window.innerWidth + 1), y: Math.floor(Math.random() * window.innerHeight + 1) };
	}

	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<div className="game-time">{ this.state.time }</div>
				<Ecosystem fish={this.state.fish} />
			</div>
		);
	}
}

export default Game;