import React from "react";
import dice1 from "./images/1dice.png";
import dice2 from "./images/2dice.png";
import dice3 from "./images/3dice.png";
import dice4 from "./images/4dice.png";
import dice5 from "./images/5dice.png";
import dice6 from "./images/6dice.png";

import dice1Green from "./images/1diceGreen.png";
import dice2Green from "./images/2diceGreen.png";
import dice3Green from "./images/3diceGreen.png";
import dice4Green from "./images/4diceGreen.png";
import dice5Green from "./images/5diceGreen.png";
import dice6Green from "./images/6diceGreen.png";

export default function Die({ value, isHeld, holdDice, id }) {
	const diceImages = {
		1: dice1,
		2: dice2,
		3: dice3,
		4: dice4,
		5: dice5,
		6: dice6,
	};

	const diceImagesGreen = {
		1: dice1Green,
		2: dice2Green,
		3: dice3Green,
		4: dice4Green,
		5: dice5Green,
		6: dice6Green,
	};

	const currentDiceImage = isHeld ? diceImagesGreen[value] : diceImages[value];

	return <img onClick={() => holdDice(id)} className="dice" src={currentDiceImage} alt={`Die with value ${value}${isHeld ? " (held)" : ""}`} aria-pressed={isHeld} aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`} />;
}
