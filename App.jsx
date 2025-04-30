import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
// import ConfettiExplosion from "react-confetti-explosion";

// Components
import Die from "./Die";

export default function App() {
	const [diceNumber, setDiceNumber] = useState(() => generateAllNewDice());

	const gameWon = diceNumber.every((die) => die.isHeld) && diceNumber.every((die) => die.value === diceNumber[0].value);

	const { width, height } = useWindowSize();

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
		if (!gameWon) {
			setDiceNumber((prevDice) => prevDice.map((die) => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) })));
		} else {
			setDiceNumber(generateAllNewDice());
		}
	}

	function holdDice(id) {
		setDiceNumber((prevDice) => prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)));
	}

	const diceElements = diceNumber.map((dieObj) => <Die holdDice={holdDice} id={dieObj.id} key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} />);

	return (
		<main>
			{gameWon && <Confetti />}
			<h1 className="title">Tenzies Roll</h1>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

			<div className="dice-container">{diceElements}</div>

			<button className="roll-dice" onClick={rollDice}>
				{gameWon ? "New Game" : "Roll"}
			</button>
		</main>
	);
}
