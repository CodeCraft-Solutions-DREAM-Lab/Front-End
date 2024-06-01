import { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalBody,
	CheckboxGroup,
	Checkbox,
	Progress,
} from "@nextui-org/react";
import propTypes from "prop-types";
import CancelarReservaModalButton from "./CancelarReservaModalButton";
import PenalizarModalButton from "./PenalizarModalButton";
import "./ReservItemModal.css";

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
									<p className="ReservItemModal-student-name-mat">
										<span className="ReservItemModal-student-name">{studentName}</span> -
										<span className="ReservItemModal-student-mat">{stundentMat}</span>
									</p>

									<p>
										Material solicitado
									</p>

									<Progress
										aria-label="ItemsPreparedProgress"
										size="md"
										color="success"
										value={(selectedItems.length / reservItems.length) * 100}
									/>

									<CheckboxGroup
										color="success"
										value={selectedItems}
										onValueChange={setSelectedItems}
									>
										{reservItems.map((item, index) => {
											return (
												<Checkbox key={index} value={item.name}>{item.quantity} - {item.name}</Checkbox>
											);
										})}
									</CheckboxGroup>
								</div>

								<div className="ReservItemModal-grid-item-2">
									<p className="ReservItemModal-sala-mesa">
										<span className="ReservItemModal-sala-name">{salaName}</span> -
										<span className="ReservItemModal-mesa-name">{mesaName}</span>
									</p>

									<p className="ReservItemModal-date">
										{dateString}
									</p>

									<p className="ReservItemModal-hora">
										{horaInicioString} a {horaFinString}
									</p>

									{/* <CancelarReservaModalButton size="md" /> */}
									{/* <PenalizarModalButton size="md" /> */}
								</div>
							</div>

							{/* <p className="text-[#14247b] px-4 pt-0 pb-2 justify-center text-2xl text-center font-semibold">
								{props.reservId}
							</p> */}
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
