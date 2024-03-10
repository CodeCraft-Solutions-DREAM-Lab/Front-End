import React from "react";
import { EvervaultCard, Icon } from "../components/ui/evervault-card.jsx";

function SpeechBotCard(props) {
	return (
		<div
			className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start mx-auto p-4 relative"
			style={{
				width: props.width,
				height: props.height
			}}>
			<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
			<EvervaultCard />
		</div>
	);
}

export default SpeechBotCard;