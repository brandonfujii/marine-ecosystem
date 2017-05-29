import React, { Component } from 'react';
import Modal from './modal';

class InstructScreen extends Component {
	render() {
		let { isOpen, actionText, actionFunction, changeModal } = this.props;
		return (
			<Modal
				isOpen={isOpen}
				actionText={actionText}
				actionFunction={actionFunction}
				changeModal={changeModal}>
				<div id="instruct-screen">
					<div>
						<h1> Instructions</h1>
						<div className="instructions">
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

export default InstructScreen;
