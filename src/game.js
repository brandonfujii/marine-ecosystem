import React, { Component } from 'react';
import Ecosystem from './ecosystem';
import Time from './time';
import rand from './rand';
import gaussian from 'gaussian';

const END_TIME_SECONDS = 80;
const DOUBLING_RATE = 15;
const ARENA_OFFSET = 200;
const BASE_MULTIPLIER = 100; 
const GAUSS_MEAN = 66;
const GAUSS_VAR = (12)**2;
const INIT_FISH = 45;

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gameTime: null,
			time: null,
			score: null,
			fish: [], 
			gDist: null,
			delta: 0.0
		};

		this.initializeGame = this.initializeGame.bind(this);
		this.onGameTick = this.onGameTick.bind(this);
		this.onGameOver = this.onGameOver.bind(this);
		this.reproduce = this.reproduce.bind(this);
		this.generateFish = this.generateFish.bind(this);
		this.removeFishInRadius = this.removeFishInRadius.bind(this);
		this.renderGameTime = this.renderGameTime.bind(this);
		this.gameScore = this.gameScore.bind(this);
		this.calcPercentage = this.calcPercentage.bind(this);
		this.fishHeight = this.fishHeight.bind(this);
	}

	componentDidMount() {
		this.initializeGame();
	}

	initializeGame() {
		this.setState({
			gameTime: new Time(END_TIME_SECONDS, this.onGameTick, this.onGameOver),
			time: 0,
			score: 0,
			gDist: gaussian(GAUSS_MEAN, GAUSS_VAR)
		}, function() {
			this.state.gameTime.start();
			this.reproduce(INIT_FISH);
		});
	}

	onGameTick(tick) {
		this.setState({
			time: tick,
		}, function()  {
			this.reproduce(Math.round(this.state.fish.length / DOUBLING_RATE));
			this.gameScore();
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

	gameScore(){
		let percentage = this.calcPercentage();
		let deltaScore = Math.round((1.0 - (Math.abs(0.5 - percentage) * 2)) * BASE_MULTIPLIER);
		let newScore = this.state.score + deltaScore;

		this.setState({
			score: newScore,
			delta: deltaScore
		})
	}

	calcPercentage(){
		return this.state.gDist ? this.state.gDist.cdf(this.state.fish.length) : 0.5
	}

	fishHeight(){
		let perc = 1.0 - this.calcPercentage();
		console.log("perc:", perc)
		let heightPerc = Math.round(perc * 95);

		return heightPerc + "%"
	}

	render() {
		console.log("num fish:", this.state.fish.length)
		console.log("score:", this.state.score)
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<div id="top-bar">
					<div id="game-time-container">
						<img id="shell-icon" src="assets/shell.png" />
						<div id="game-time">{ this.renderGameTime(this.state.time) }</div>
					</div>
					<div id="game-score">{ this.state.score }</div>
				</div>
				<div id="sidebar" className="clearfix">
					<div id="sustainability-meter">
						<div id="meter-color"></div>
					</div>
					<div id="indicator" style={{ top: this.fishHeight() }}>
						<img src="assets/fish_indicator.png" />
						<div id="points">+{ this.state.delta }</div>
					</div>
				</div>
				<Ecosystem fish={this.state.fish}
					removeFishInRadius={this.removeFishInRadius} />
			</div>
		);
	}
}

export default Game;