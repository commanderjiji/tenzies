import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
// import ConfettiExplosion from "react-confetti-explosion";

// Components
import Die from "./Die";

export default function App() {
	const [diceNumber, setDiceNumber] = useState(() => generateAllNewDice()); //() => generateAllNewDice()

	const [count, setCount] = useState(0);

	const [highscore, setHighscore] = useState(0);

	const newGameRef = React.useRef(null);

	const gameWon = diceNumber.every((die) => die.isHeld) && diceNumber.every((die) => die.value === diceNumber[0].value);

	React.useEffect(() => {
		if (gameWon) {
			newGameRef.current.focus();
		}
	}, [gameWon]);

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
			setCount((prevCount) => prevCount + 1);
		} else {
			setDiceNumber(generateAllNewDice());
			setHighscore((prevHighscore) => (prevHighscore === 0 ? count : Math.min(prevHighscore, count)));
			setCount(0);
		}
	}

	function holdDice(id) {
		setDiceNumber((prevDice) => prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)));

		setCount((prevCount) => prevCount + 1);
	}

	const diceElements = diceNumber.map((dieObj) => <Die holdDice={holdDice} id={dieObj.id} key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} />);

	return (
		<main>
			{gameWon && <Confetti />}
			<div aria-live="polite" className="sr-only">
				{gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
			</div>
			<h1 className="title">Tenzies Roll</h1>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

			<p className="highscore">Highscore: {highscore}</p>
			<p className="clicks">Clicks: {count}</p>

			<div className="dice-container">{diceElements}</div>

			<button ref={newGameRef} className="roll-dice" onClick={rollDice}>
				{gameWon ? "New Game" : "Roll"}
			</button>
		</main>
	);
}
