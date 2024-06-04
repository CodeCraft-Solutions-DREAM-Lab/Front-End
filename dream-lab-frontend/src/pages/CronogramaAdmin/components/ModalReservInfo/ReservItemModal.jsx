import { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalBody
} from "@nextui-org/react";
import propTypes from "prop-types";
import StudentNameMatModal from "./StudentNameMatModal";
import SolicitedMatsListModal from "./SolicitedMatsListModal";
import InfoSalaFechaModal from "./InfoSalaFechaModal";
import CancelarReservaModalButton from "./CancelarReservaModalButton";
import PenalizarModalButton from "./PenalizarModalButton";
import "./ReservItemModal.css";
import { get } from "../../../../utils/ApiRequests";

const horaFormatter = new Intl.DateTimeFormat("es-MX", {
	hour: "numeric",
	minute: "numeric",
	hour12: false,
});

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
	weekday: "long",
	month: "long",
	day: "numeric",
});

function ReservItemModal(props) {

	const [studentName, setStudentName] = useState("");
	const [studentMat, setStudentMat] = useState("");
	const [salaName, setSalaName] = useState("");
	const [mesaName, setMesaName] = useState("");
	const [dateString, setDateString] = useState("");
	const [horaInicioString, setHoraInicioString] = useState("");
	const [horaFinString, setHoraFinString] = useState("");
	const [reservItems, setReservItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {

		if (!props.isOpen) return;

		setIsLoading(true);
		// console.log("ReservItemModal useEffect");

		get("reservaciones/cronograma/" + props.reservId)
			.then((response) => {

				console.log("Reservacion data: ", response);

				const horaInicio = new Date(response.horaInicio);
				horaInicio.setHours(horaInicio.getHours() + 6);
				const horaFin = new Date(horaInicio);
				horaFin.setHours(horaFin.getHours() + response.duracion);
				horaFin.setMinutes(horaFin.getMinutes() + (response.duracion % 1) * 60);

				const formattedInicio = horaFormatter.format(horaInicio);
				const formattedFin = horaFormatter.format(horaFin);

				let reservDate = new Date(response.reservDate);
				reservDate.setHours(reservDate.getHours() + 6);
				let formattedDate = dateFormatter.format(reservDate);
				// Convert the first letter of each word to uppercase except for words with 2 or less characters
				formattedDate = formattedDate.replace(
					/\b\w{3,}/g,
					char => char.charAt(0).toUpperCase() + char.slice(1)
				);

				setStudentName(response.studentName);
				setStudentMat(response.studentMat);
				setSalaName(response.salaName);
				setMesaName("Mesa 2");
				setDateString(formattedDate);
				setHoraInicioString(formattedInicio);
				setHoraFinString(formattedFin);
				setReservItems(response.reservItems);

				const selectedItems = response.selectedItems.map((item) => { return item.name });
				console.log("Selected items: ", selectedItems);
				setSelectedItems(selectedItems);

				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching reservacion data: ", error);
				setIsLoading(false);
			});

		// setTimeout(() => {
		// 	setStudentName("Jaime Eduardo López Castro");
		// 	setStudentMat("A00833173");
		// 	setSalaName("Electric Garage");
		// 	setMesaName("Mesa 2");
		// 	setDateString("Martes, 15 de Diciembre");
		// 	setHoraInicioString("15:00");
		// 	setHoraFinString("17:00");
		// 	setReservItems([
		// 		{
		// 			name: "Lentes Oculus Quest",
		// 			quantity: 2,
		// 		},
		// 		{
		// 			name: "Computadora Windows",
		// 			quantity: 1,
		// 		},
		// 		{
		// 			name: "Extensión 2 metros",
		// 			quantity: 1,
		// 		},
		// 	]);
		// 	setIsLoading(false);

		// }, 1000);
	}, [props.isOpen])

	return (
		<Modal
			size="4xl"
			isOpen={props.isOpen}
			onClose={props.onClose}
			hideCloseButton={false}
			backdrop="blur"
		>
			<ModalContent className="p-3">
				{() => (
					<>
						<ModalBody>

							<div className="ReservItemModal-grid-container">

								<div className="ReservItemModal-grid-item-1">

									<StudentNameMatModal
										studentName={studentName}
										studentMat={studentMat}
										isLoading={isLoading}
									/>

									<SolicitedMatsListModal
										reservItems={reservItems}
										setReservItems={setReservItems}
										selectedItems={selectedItems}
										setSelectedItems={setSelectedItems}
										isLoading={isLoading}
									/>
								</div>

								<div className="ReservItemModal-grid-item-2">

									<InfoSalaFechaModal
										salaName={salaName}
										mesaName={mesaName}
										dateString={dateString}
										horaInicioString={horaInicioString}
										horaFinString={horaFinString}
										isLoading={isLoading}
									/>

									<CancelarReservaModalButton
										className="mt-10"
										isLoading={isLoading}
									/>

									<PenalizarModalButton
										className="mt-4"
										isLoading={isLoading}
									/>
								</div>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}

ReservItemModal.propTypes = {
	isOpen: propTypes.bool,
	onClose: propTypes.func,
	reservId: propTypes.number.isRequired, // Se requiere el ID de la reservación
};

export default ReservItemModal;
