import {Button} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import 'regenerator-runtime/runtime';

function MicrophoneButton() {
	return (
		<div className="relative items-center justify-center w-full h-full">
			<Button
				className="bg-transparent text-white h-full"
				isIconOnly={true}
				disableRipple={true}
			>
				<FontAwesomeIcon icon={faMicrophone} size="3x" />
			</Button>
		</div>
	);
}

export default MicrophoneButton;
