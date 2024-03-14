import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import GlassCard from '../components/general/glass-card';
import { useNavigate } from 'react-router-dom';

function ReservacionCuarto(props) {
	let { sala } = useParams();
	let salaString = String(sala);

	let navigate = useNavigate();
	function handleClick(imageId) {
		navigate(`/confirmacion/`);
	}

	return (
		<GlassCard padding='2rem'>
			<h1 style={{ color: 'white' }}>
				{sala ? `Reservación de ${salaString} - Mesa 1` : 'No se proporcionó un ID de sala'}
			</h1>
			<br />
			<br />
			<DatePicker />
			<br />
			<br />
			<Autocomplete
				label="Hora de inicio"
				className="max-w-xs"
			>
				{['9am', '10am', '11am'].map((hora) => (
					<AutocompleteItem key={hora} value={hora}>
						{hora}
					</AutocompleteItem>
				))}
			</Autocomplete>
			<br />
			<br />
			<Autocomplete
				label="Duración de la reservación (horas)"
				className="max-w-xs"
			>
				{['2 horas', '4 horas'].map((hora) => (
					<AutocompleteItem key={hora} value={hora}>
						{hora}
					</AutocompleteItem>
				))}
			</Autocomplete>
			<br />
			<br />
			<Button color="primary" variant="solid" onClick={handleClick}>
				Aceptar
			</Button>
		</GlassCard>
	);
}

export default ReservacionCuarto;