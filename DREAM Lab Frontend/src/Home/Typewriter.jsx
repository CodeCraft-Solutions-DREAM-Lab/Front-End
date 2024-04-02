import { TypewriterEffectSmooth } from "../components/aceternity/typewriter-effect";
import { useState, useEffect } from "react";

function Typewriter(props) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentWordsArrayIndex, setCurrentWordsArrayIndex] = useState(0);
	const [trigger, setTrigger] = useState(false);

	const wordsArrays = [
		[
			{
				text: "Build",
			},
			{
				text: "awesome",
			},
			{
				text: "apps",
			},
		],
		[
			{
				text: "Explore",
			},
			{
				text: "innovative",
			},
			{
				text: "technologies",
			},
		],
		[
			{
				text: "Transform",
			},
			{
				text: "your",
			},
			{
				text: "business",
			},
		],
	];

	// Function to handle completion of typewriter animation
	const handleTypewriterComplete = () => {
		setTimeout(() => { // Adding a delay before triggering the next animation
			setTrigger(false); // Reset trigger after animation completion
			setCurrentWordsArrayIndex((prevIndex) => (prevIndex + 1) % wordsArrays.length); // Switch to the next array of words
		}, 2000); // 2-second delay before triggering the next animation
	};

	useEffect(() => {
		// Trigger word change only when the animation completes or when the component mounts
		setTrigger(true);
	}, [currentWordsArrayIndex]);

	return (
		<div className="flex flex-col items-center justify-center h-[40rem]  " >
			< TypewriterEffectSmooth
				key={`${currentWordsArrayIndex}-${currentWordIndex}`}
				words={wordsArrays[currentWordsArrayIndex]}
				setCurrentWordIndex={setCurrentWordIndex}
				trigger={trigger}
				onComplete={handleTypewriterComplete}
			/>
		</div >
	);
}

export default Typewriter;