import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function BotonRegresar() {
	let navigate = useNavigate();
	function handleClick() {
		navigate(`/home/`);
	}

	return (
		<Button isIconOnly variant="faded" aria-label="Take a photo" onClick={handleClick}>
			<FontAwesomeIcon icon={faArrowLeft} />
		</Button>
	);
}

export default BotonRegresar;