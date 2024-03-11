import { useParams } from 'react-router-dom';

function ReservacionCuarto(props) {
	let { sala } = useParams();
	let salaString = String(sala);

	return (
		<div>
			<h1 style={{ color: 'white' }}>
				{sala ? `Reservacion de cuarto ${salaString}` : 'No se proporcionó un ID de sala'}
			</h1>
		</div>
	);
}

export default ReservacionCuarto;