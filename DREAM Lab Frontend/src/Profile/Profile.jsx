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

	return (
		<div>
			<BotonRegresar />
			<h1>Profile</h1>
			<ListaReservaciones reservations={reservaciones} setReservations={setReservaciones}/>
		</div>
	);
}

export default Profile;