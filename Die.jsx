import React from "react";

export default function Die({ value, isHeld, holdDice, id }) {
	const styles = {
		backgroundColor: isHeld ? "#59E391" : "white",
	};

	return (
		<button onClick={() => holdDice(id)} style={styles}>
			{value}
		</button>
	);
}
