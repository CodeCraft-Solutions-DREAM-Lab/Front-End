import React from "react";
import { EvervaultCard, Icon } from "../components/aceternity/evervault-card.jsx";

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

// import React from "react";
// import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation.jsx";

// export function SpeechBotCard() {
// 	return (
// 		<BackgroundGradientAnimation>
// 			<div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
// 				<p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
// 					Gradients X Animations
// 				</p>
// 			</div>
// 		</BackgroundGradientAnimation>
// 	);
// }

// export default SpeechBotCard;
