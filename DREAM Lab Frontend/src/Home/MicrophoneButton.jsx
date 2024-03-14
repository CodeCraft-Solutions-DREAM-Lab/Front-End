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
				className="bg-transparent text-white"
				onClick={onClick}
				
				//borderRadius="1.75rem"
				//className="bg-none dark:bg-slate-900 text-white dark:text-black border-neutral-200 dark:border-slate-800"
			>
				<FontAwesomeIcon icon={faMicrophone} size="3x" />
			</Button>
		</div>
	);
}

export default MicrophoneButton;