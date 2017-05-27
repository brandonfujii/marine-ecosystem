import React, { Component } from 'react';
import Ecosystem from './ecosystem';
import Time from './time';
import rand from './rand';

const END_TIME_SECONDS = 80;
const DOUBLING_RATE = 40;
const ARENA_OFFSET = 200;

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
		this.renderGameTime = this.renderGameTime.bind(this);
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
		console.log(window.innerWidth);
		return { x: rand.choice(ARENA_OFFSET, window.innerWidth - ARENA_OFFSET), y: rand.choice(150, window.innerHeight - ARENA_OFFSET) };
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

	renderGameTime(num) {
		let minutes = Math.floor(num / 60);
		let seconds = num % 60;
		return `${minutes}:${(seconds <= 9 ? '0' : '') + seconds}`;
	}

	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<div id="game-time-container">
					<img id="shell-icon" src="assets/shell.png" />
					<div id="game-time">{ this.renderGameTime(this.state.time) }</div>
				</div>
				<Ecosystem fish={this.state.fish}
					removeFishInRadius={this.removeFishInRadius} />
			</div>
		);
	}
}

export default Game;