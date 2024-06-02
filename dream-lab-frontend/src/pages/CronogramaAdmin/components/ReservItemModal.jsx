import { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalBody,
	CheckboxGroup,
	Checkbox,
	Progress,
	Button,
} from "@nextui-org/react";
import propTypes from "prop-types";
import SolicitedMatsListModal from "./SolicitedMatsListModal";
import CancelarReservaModalButton from "./CancelarReservaModalButton";
import PenalizarModalButton from "./PenalizarModalButton";
import "./ReservItemModal.css";
import copyIcon from "src/assets/Icons/copy-icon.svg";

function ReservItemModal(props) {

	const [studentName, setStudentName] = useState("Jaime Eduardo López Castro");
	const [stundentMat, setStudentMat] = useState("A00833173");
	const [salaName, setSalaName] = useState("Electric Garage");
	const [mesaName, setMesaName] = useState("Mesa 2");
	const [dateString, setDateString] = useState("Martes - 15 de Diciembre");
	const [horaInicioString, setHoraInicioString] = useState("3:00 pm");
	const [horaFinString, setHoraFinString] = useState("5:00 pm");
	const [reservItems, setReservItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);

	useEffect(() => {
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
	}, [])

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

									<div className="ReservItemModal-student-name-mat">
										<span className="ReservItemModal-student-name">{studentName}</span>
										<br />
										<div
											className="ReservItemModal-student-mat"
											onClick={() => navigator.clipboard.writeText(stundentMat).then(() => alert("Matrícula copiada"))}
										>
											<span className="ReservItemModal-student-mat-text">{stundentMat}</span>
											<img src={copyIcon} alt="copy-icon" className="ReservItemModal-copy-icon-img" />
										</div>

									</div>

									<SolicitedMatsListModal 
										reservItems={reservItems} 
										setReservItems={setReservItems} 
										selectedItems={selectedItems} 
										setSelectedItems={setSelectedItems}
									/>
								</div> 

								<div className="ReservItemModal-grid-item-2">
									<p className="ReservItemModal-sala-mesa">
										<span className="ReservItemModal-sala-name">{salaName} </span>
										<span className="ReservItemModal-mesa-name">- {mesaName}</span>
									</p>

									<p className="ReservItemModal-date">
										{dateString}
									</p>

									<p className="ReservItemModal-hora">
										{horaInicioString} a {horaFinString}
									</p>

									<CancelarReservaModalButton className="mt-10"/>
									<PenalizarModalButton className="mt-4"/>
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
