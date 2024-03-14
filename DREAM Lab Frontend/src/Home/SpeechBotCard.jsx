import React from "react";
import { EvervaultCard, Icon } from "../components/aceternity/evervault-card.jsx";

function SpeechBotCard(props) {
	return (
		<div
			className="flex flex-col items-start mx-auto p-4 relative"
			style={{
				width: props.width,
				height: props.height
			}}>
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
