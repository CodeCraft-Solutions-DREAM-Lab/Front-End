import BotonRegresar from "../components/general/BotonRegresar";
import ListaReservaciones from "./ListaReservaciones";
import { useEffect, useState } from "react";
function Profile() {

	const [reservaciones, setReservaciones] = useState([]);

	useEffect(() => {
		fetch('https://dreamlab-api.azurewebsites.net/reservaciones/usuario/A0XXXXXX1')
			.then(response => response.json())
			.then(data => {
				setReservaciones(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	}, []);

	// const reservaciones = [{
	// 	"idReservacion": 1,
	// 	"idUsuario": "A0XXXXXX1",
	// 	"idSala": 1,
	// 	"idExperiencia": 1,
	// 	"horaInicio": "1970-01-01T10:00:00.000Z",
	// 	"duracion": 2.5,
	// 	"fecha": "2024-01-01T00:00:00.000Z",
	// 	"numMesa": 2
	// },
	// {
	// 	"idReservacion": 1,
	// 	"idUsuario": "A0XXXXXX1",
	// 	"idSala": 1,
	// 	"idExperiencia": 1,
	// 	"horaInicio": "1970-01-01T10:00:00.000Z",
	// 	"duracion": 2.5,
	// 	"fecha": "2024-01-01T00:00:00.000Z",
	// 	"numMesa": 2
	// },
	// {
	// 	"idReservacion": 1,
	// 	"idUsuario": "A0XXXXXX1",
	// 	"idSala": 1,
	// 	"idExperiencia": 1,
	// 	"horaInicio": "1970-01-01T10:00:00.000Z",
	// 	"duracion": 2.5,
	// 	"fecha": "2024-01-01T00:00:00.000Z",
	// 	"numMesa": 2
	// },];

	return (
		<div>
			<BotonRegresar />
			<h1>Profile</h1>
			<ListaReservaciones reservations={reservaciones} />
		</div>
	);
}

export default Profile;