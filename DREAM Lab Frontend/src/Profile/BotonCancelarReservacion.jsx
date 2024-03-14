import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function BotonCancelarReservacion(props) {
	const handleClick = () => {
		alert('Reservación cancelada: ' + props.id);
	}
	return (
		<Button isIconOnly color="error" auto onClick={handleClick}>
			<FontAwesomeIcon icon={faTrashAlt} />
		</Button>
	);
}

export default BotonCancelarReservacion;