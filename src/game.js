import React, { Component } from 'react';
import Ecosystem from './ecosystem';
import Time from './time';

const END_TIME_SECONDS = 20;
const DOUBLING_RATE = 5;

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gameTime: null,
			time: null,
			score: null,
			fish: []
		};

		this.initializeGame = this.initializeGame.bind(this);
		this.onGameTick = this.onGameTick.bind(this);
		this.onGameOver = this.onGameOver.bind(this);
		this.reproduce = this.reproduce.bind(this);
		this.generateFish = this.generateFish.bind(this);
		this.removeFishInRadius = this.removeFishInRadius.bind(this);
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
			this.reproduce(5);
		});
	}

	onGameTick(tick) {
		console.log(tick);
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

	reproduce(numFish) {
		let updatedFish = [];

		for (let i = 0; i < (numFish || this.state.fish.length); i++) {
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

	removeFishInRadius(netArea) {
		let { x1, x2, y1, y2 } = netArea;
		let fish = this.state.fish.slice();

		for (let i = 0; i < fish.length; i++) {
			let f = fish[i];
			if (f.x >= x1 && f.x <= x2 && f.y >= y1 && f.y <= y2) {
				fish.splice(i, 1);
				i--;
			}
		}

		this.setState({ fish });
	}

	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<div id="game-time">{ this.state.time }</div>
				<Ecosystem fish={this.state.fish}
					removeFishInRadius={this.removeFishInRadius} />
			</div>
		);
	}
}

export default Game;