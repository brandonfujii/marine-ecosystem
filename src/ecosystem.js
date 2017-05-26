import React, { Component } from 'react';

class Ecosystem extends Component {
	constructor(props) {
		super(props);

		this.renderFish = this.renderFish.bind(this);
	}

	renderFish(fish) {
		return fish.map((f, i) => {
			return (
				<div className={`fish-${i}`} key={i}
					 style={{ position: 'absolute', top: f.y, left: f.x }}>
					fish	 	
				</div>
			);
		})
	}

	render() {
		return (
			<div id="ecosystem">
				{ this.renderFish(this.props.fish) }
			</div>
		);
	}
}

export default Ecosystem;