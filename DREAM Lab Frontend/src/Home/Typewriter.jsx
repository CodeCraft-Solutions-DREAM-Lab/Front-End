import { TypewriterEffectSmooth } from "../components/aceternity/typewriter-effect";
import { useState, useEffect } from "react";
import { Textarea } from "@nextui-org/react";

import PropTypes from "prop-types";

/** Example Prop:
 *  words: [
 *             [
 *                 { text: "Hello", className: "text-4xl" },
 *                 { text: "World", className: "text-4xl" },
 *             ],
 *             [
 *                 { text: "This", className: "text-4xl" },
 *                 { text: "is", className: "text-4xl" },
 *                 { text: "a", className: "text-4xl" },
 *                 { text: "test", className: "text-4xl" },
 *             ],
 *        ];
 */

function Typewriter(props) {
	const [currentWordsArrayIndex, setCurrentWordsArrayIndex] = useState(0);
	const [completed, setCompleted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		if (completed) {
			setTimeout(() => {
				setCurrentWordsArrayIndex((prevIndex) => (prevIndex + 1) % props.words.length);
				setCompleted(false);
			}, 2000);
		}
	}, [completed, props.words.length]);

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
					words={props.words[currentWordsArrayIndex]}
					setCurrentWordIndex={setCurrentWordsArrayIndex}
					setCompleted={setCompleted}
				/>}
		</div >
	);
}

Typewriter.propTypes = {
	words: PropTypes.array.isRequired,
};

export default Typewriter;