import React, { Component } from 'react';

class Fish extends Component {
	constructor(props) {
		super(props); 
	}

	render() {
		let { x, y, index } = this.props;

		return (
			<div className={`fish-${index}`}
				style={{ position: 'absolute', top: y, left: x }}>
				fish	 	
			</div>
		);
	}
}

export default Fish;