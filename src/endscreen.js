import React, { Component } from 'react';
import Modal from './modal';

class EndScreen extends Component {
	render() {
		let { isOpen, actionText, actionFunction, changeModal, score } = this.props;
		return (
			<Modal
				isOpen={isOpen}
				actionText={actionText}
				actionFunction={actionFunction}
				changeModal={changeModal}>
				<div id="end-screen">
					<div>
						<h1> Game Over</h1>
						<p> Overfishing is when more fish are caught than reproduction can replace. Gathering as many fish as possible may seem like a good idea but overfishing has many serious consequences. It can mean that there will no fish left, which can harm several oceanic ecosystems. The World Wildlife Fund says that there was a dramatic fall of 74% in worldwide stocks of important fish like mackerel, tuna and bonitos between 1970 and 2010.</p>
						<div id="go-score-container">
							Score
							<div id="game-over-your-score">
								{this.props.score}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default EndScreen;
