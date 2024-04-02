import { TypewriterEffectSmooth } from "../components/aceternity/typewriter-effect";
import { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/react";

function Typewriter(props) {
	const [currentWordsArrayIndex, setCurrentWordsArrayIndex] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	// TODO: Pasar como prop este wordArray
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

	useEffect(() => {
		if (completed) {
			setTimeout(() => {
				setCurrentWordsArrayIndex((prevIndex) => (prevIndex + 1) % wordsArrays.length);
				setCompleted(false);
			}, 2000);
		}
	}, [completed]);

	return (
		<div
			className="flex flex-col items-center justify-center h-[40rem]"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{isHovering ?
				<Textarea /> :
				<TypewriterEffectSmooth
					key={`${currentWordsArrayIndex}`}
					words={wordsArrays[currentWordsArrayIndex]}
					setCurrentWordIndex={setCurrentWordsArrayIndex}
					setCompleted={setCompleted}
				/>}
		</div >
	);
}

export default Typewriter;