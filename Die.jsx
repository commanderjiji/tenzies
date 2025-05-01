import React from "react";

export default function Die({ value, isHeld, holdDice, id }) {
	const styles = {
		backgroundColor: isHeld ? "#59E391" : "white",
	};

	return (
		<button onClick={() => holdDice(id)} aria-pressed={isHeld} aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"} `} style={styles}>
			{value}
		</button>
	);
}
