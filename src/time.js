import React, { Component } from 'react';

class Time {
	constructor(endTime, onTick, onFinish) {
		this.timer = null;
		this.counter = 0;
		this.endTime = endTime;
		this.isPaused = false;

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.tick = this.tick.bind(this);
		this.getTimeInSeconds = this.getTimeInSeconds.bind(this);
		this.pause = this.pause.bind(this);
		this.onTick = onTick;
		this.onFinish = onFinish;
	}

	start() {
		this.timer = setInterval(this.tick, 1000);
	}

	stop() {
		clearInterval(this.timer);
	}

	tick() {
		if (this.counter < this.endTime  && !this.isPaused) {
			let count = ++this.counter;
			if (this.onTick != undefined && this.onTick != null) this.onTick(count);
		} else {
			if (this.onFinish != undefined && this.onFinish != null) this.onFinish(this.counter);
		}
	}

	pause(pausedBool) {
 		this.isPaused = pausedBool;
 	}
 
	
	getTimeInSeconds() {
		return this.counter;
	}
}

export default Time;
