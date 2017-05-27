
function choice(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let rand = {
	choice
};

export default rand;