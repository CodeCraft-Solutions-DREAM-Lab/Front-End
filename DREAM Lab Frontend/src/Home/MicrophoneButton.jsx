import React from "react";
import { Button } from "../components/aceternity/moving-border.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

function MicrophoneButton() {
	const onClick = () => {
		alert("Activar bot de voz");
	}

	return (
		<div>
			<Button
				borderRadius="1.75rem"
				className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
				onClick={onClick}
			>
				<FontAwesomeIcon icon={faMicrophone} size="3x" />
			</Button>
		</div>
	);
}

export default MicrophoneButton;