import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import GlassCard from '../components/general/glass-card';
import { useNavigate } from 'react-router-dom';

function ReservacionCuarto(props) {
	let { sala } = useParams();
	let salaString = String(sala);

	let navigate = useNavigate();
	async function handleClick(imageId) {
		// navigate(`/confirmacion/`);
		const data = { 
			idReservacion: 3,
			idUsuario: "A0XXXXXX1",
			idSala: 1,
			idExperiencia: 1,
			horaInicio: new Date().toISOString(),
			duracion: 2,
			fecha: new Date().toISOString(),
			numMesa: 1
		};

		fetch('https://dreamlab-api.azurewebsites.net/reservaciones', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
				'Connection': 'keep-alive',
				'Accept': '*/*'
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
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