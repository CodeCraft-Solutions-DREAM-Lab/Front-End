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
		setTimeout(() => {
			setStudentName("Jaime Eduardo López Castro");
			setStudentMat("A00833173");
			setSalaName("Electric Garage");
			setMesaName("Mesa 2");
			setDateString("Martes - 15 de Diciembre");
			setHoraInicioString("3:00 pm");
			setHoraFinString("5:00 pm");
			setReservItems([
				{
					name: "Lentes Oculus Quest",
					quantity: 2,
				},
				{
					name: "Computadora Windows",
					quantity: 1,
				},
				{
					name: "Extensión 2 metros",
					quantity: 1,
				},
			]);
			setIsLoading(false);
			
		}, 1000);
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

									<CancelarReservaModalButton className="mt-10" />
									<PenalizarModalButton className="mt-4" />
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
