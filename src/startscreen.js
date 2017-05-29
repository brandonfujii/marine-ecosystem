import React, { Component } from 'react';
import Modal from './modal';

class StartScreen extends Component {
	render() {
		let { isOpen, actionText, actionFunction, changeModal } = this.props;
		return (
			<Modal 
				isOpen={isOpen}
				actionText={actionText}
				actionFunction={actionFunction}
				changeModal={changeModal}>
				<div id="start-screen">
					<div>
						<h1>Overfishing Simulation</h1>
						<p>The Overfishing Simulation shows the impact of overfishing on the marine ecosystem. Factors such as overfishing and throwing plastic waste into the ocean devastate aquatic species and create environmental imbalance. The goal of this game is to figure out how to maintain sustainability by striking a balance between overfishing and under-fishing.</p>
						<div className="instructions">
							<p>Instructions:</p>
							<ol>
								<li>Throw the nets onto the surface in order to catch fish.</li>
								<li>The more nets you throw the more fish you catch.</li>
								<li>Fish reproduce every second, so remember to fish often!</li>
								<li>But be careful not to fish too much, you always want enough fish in the water!</li>
								<li>The game concludes when you run out of time.</li>
							</ol>
						</div>
					</div> 
				</div>
			</Modal>
		);
	}
}

export default StartScreen;