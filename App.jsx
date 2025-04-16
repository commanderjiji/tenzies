import React, { useState } from "react";
import { nanoid } from "nanoid";

// Components
import Die from "./Die";

export default function App() {
	/**
	 * Challenge: Create a function `hold` that takes
	 * `id` as a parameter. For now, just have the function
	 * console.log(id).
	 *
	 * Then, figure out how to pass that function down to each
	 * instance of the Die component so when each one is clicked,
	 * it logs its own unique ID property. (Hint: there's more
	 * than one way to make that work, so just choose whichever
	 * you want)
	 */

	const [diceNumber, setDiceNumber] = useState(generateAllNewDice());

	function generateAllNewDice() {
		// My solution

		// let newDice = [];
		// for (let i = 0; i < 10; i++) {
		// 	const rollDice = Math.ceil(Math.random() * 6);
		// 	newDice.push(rollDice);
		// }
		// return newDice;

		// Scrimba Solution
		return new Array(10).fill(0).map(() => ({
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}));
	}

	function rollDice() {
		setDiceNumber(generateAllNewDice());
	}

	// function holdDice() {
	// 	setDiceNumber();
	// }

	const diceElements = diceNumber.map((dieObj) => <Die id={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} />);

	return (
		<main>
			<div className="dice-container">{diceElements}</div>
			<button className="roll-dice" onClick={rollDice}>
				Roll
			</button>
		</main>
	);
}
