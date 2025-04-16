import React, { useState } from "react";
import { nanoid } from "nanoid";

// Components
import Die from "./Die";

export default function App() {
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

	/**
	 * Challenge: Update the `rollDice` function to not just roll
	 * all new dice, but instead to look through the existing dice
	 * to NOT role any that are being `held`.
	 *
	 * Hint: this will look relatively similiar to the `hold`
	 * function below. When we're "rolling" a die, we're really
	 * just updating the `value` property of the die object.
	 */

	function rollDice() {
		setDiceNumber((prevDice) => prevDice.map((die) => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) })));
	}

	function holdDice(id) {
		setDiceNumber((prevDice) => prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)));
	}

	const diceElements = diceNumber.map((dieObj) => <Die holdDice={holdDice} id={dieObj.id} key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} />);

	return (
		<main>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className="dice-container">{diceElements}</div>
			<button className="roll-dice" onClick={rollDice}>
				Roll
			</button>
		</main>
	);
}
