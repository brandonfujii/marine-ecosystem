import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fish from './fish';


const INIT_OPACITY = 0.40;
const OPACITY_DECLINE = 0.10;

class Ecosystem extends Component {
	constructor(props) {
		super(props);

		this.netCircleX = null;
		this.netCircleY = null;
		this.netOpacity = 0.0;

		this.renderFish = this.renderFish.bind(this);
		this.onNet = this.onNet.bind(this);

	}

	renderFish(fish) {
		return fish.map((f, i) => {
			return <Fish key={i} index={i} x={f.x} y={f.y} />
		})
	}

	renderNetCircle(){
		if(this.netOpacity >= OPACITY_DECLINE){
			console.log("here")
			this.netOpacity= this.netOpacity - OPACITY_DECLINE;
		}

		if(this.netCircleX != null && this.netCircleY != null){
			console.log("drawing net at", this.netCircleX, ", ", this.netCircleY)
			let radius = this.props.netRadius;
			return (
				<div id="net-circle" style={{
					width: 2 * radius,
					height: 2 * radius,
					top: this.netCircleY - radius,
					left: this.netCircleX - radius,
					opacity: this.netOpacity,
					borderRadius: radius,
				}}></div>
			);
		}
		else{
			// console.log("no net to draw")
			return null;
		}
	}

	onNet(e) {
		console.log("e:", e)
		let radius = this.props.netRadius;
		let netArea = { x1: e.clientX - radius, x2: e.clientX + radius,
			  y1: e.clientY - radius, y2: e.clientY + radius };

		this.netCircleX = e.clientX;
		this.netCircleY = e.clientY;
		this.netOpacity = INIT_OPACITY;
		this.props.onNet(netArea);
	}

	render() {
		return (
			<div id="ecosystem" className="clearfix" onClick={this.onNet}>
				{ this.renderFish(this.props.fish) }
				{ this.renderNetCircle()}
			</div>
		);
	}
}

Ecosystem.propTypes = {
	fish: PropTypes.array,
	netRadius: PropTypes.number,
	onNet: PropTypes.func
}

export default Ecosystem;
