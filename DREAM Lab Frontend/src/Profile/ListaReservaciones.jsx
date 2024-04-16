import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import BotonCancelarReservacion from "./BotonCancelarReservacion";

function ListaReservaciones(props) {

	const { reservations, setReservations } = props;

	return (
		<Table aria-label="Example static collection table">
			<TableHeader>
				<TableColumn>Sala</TableColumn>
				<TableColumn>Hora inicio</TableColumn>
				<TableColumn>Duracion</TableColumn>
				<TableColumn>Fecha</TableColumn>
				<TableColumn>Mesa</TableColumn>
				<TableColumn>Cancelar reservación</TableColumn>
			</TableHeader>
			<TableBody>
				{reservations.map((reservation, index) => (
					<TableRow key={index}>
						<TableCell>{reservation.idSala}</TableCell>
						<TableCell>{reservation.horaInicio}</TableCell>
						<TableCell>{reservation.duracion}</TableCell>
						<TableCell>{reservation.fecha}</TableCell>
						<TableCell>{reservation.numMesa}</TableCell>
						<TableCell><BotonCancelarReservacion 
							id={reservation.idReservacion}  
							reservaciones={reservations}
							setReservaciones={setReservations}
						/></TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default ListaReservaciones;