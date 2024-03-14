import { TypewriterEffectSmooth } from "../components/aceternity/typewriter-effect";

function TypeText(props) {
    return (
        <div className="flex flex-col items-left h-[1px]"> {/* Ajusta el tamaño del contenedor */}
            <TypewriterEffectSmooth words={props.words} />
        </div>
    );
}

export default TypeText;