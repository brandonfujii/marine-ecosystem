import React, { Component } from 'react';

class Fish extends Component {
	constructor(props) {
		super(props); 

		this.state = {
			movement: setInterval(this.randomMovement, 500)
		}

		this.randomMovement = this.randomMovement.bind(this);
	}

	randomMovement() {

	}

	render() {
		let { x, y, index } = this.props;

		return (
			<div className={`fish-${index} clearfix`}
				style={{ position: 'absolute', top: y, left: x }}>
				<img src='assets/clownfish.png' /> 	
			</div>
		);
	}
}

export default Fish;