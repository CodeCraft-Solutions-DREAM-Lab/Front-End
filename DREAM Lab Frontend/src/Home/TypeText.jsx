import { TypewriterEffectSmooth } from "../components/aceternity/typewriter-effect";

function TypeText(props) {
	return (
		<div className="flex flex-col items-center justify-center h-[40rem]  " >
			{/* <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
				{props.title}
			</p> */}
			< TypewriterEffectSmooth words={props.words} />
			{/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
				<button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
					Join now
				</button>
				<button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
					Signup
				</button>
			</div> */}
		</div >
	);
}

export default TypeText;