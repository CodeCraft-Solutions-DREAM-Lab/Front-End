import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es"; // Import Spanish locale
import Timeline, {
	TimelineMarkers,
	CursorMarker,
	TimelineHeaders,
	SidebarHeader,
	DateHeader,
	CustomMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./CronogramaAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Checkbox,
	ListItemText,
} from "@mui/material";
import { get } from "../../utils/ApiRequests";
import NavBarAdmin from "../../GlobalComponents/NavBarAdmin/NavBarAdmin";
import menuIcon from "../../assets/Admin/menu-admin.svg";
import ReservItemModal from "./components/ReservItemModal";


const monthTranslations = {
	January: "Enero",
	February: "Febrero",
	March: "Marzo",
	April: "Abril",
	May: "Mayo",
	June: "Junio",
	July: "Julio",
	August: "Agosto",
	September: "Septiembre",
	October: "Octubre",
	November: "Noviembre",
	December: "Diciembre",
};

const weekdayTranslations = {
	Sunday: "Domingo",
	Monday: "Lunes",
	Tuesday: "Martes",
	Wednesday: "Miércoles",
	Thursday: "Jueves",
	Friday: "Viernes",
	Saturday: "Sábado",
};
function translateDateToSpanish(date) {
	const month = monthTranslations[date.format("MMMM")];
	const weekday = weekdayTranslations[date.format("dddd")];
	//return `${weekday} ${date.date()} ${month} ${date.year()}`;
	return `${date.date()} ${month} ${date.year()}`;
}

const CustomLabel = ({ interval }) => {
	const translatedLabel = translateDateToSpanish(
		moment(interval).add(3, "hour")
	);
	return (
		<div className="header-interval">
			{translatedLabel}
			<FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
		</div>
	);
};

const handleToggleClick = (groupId) => {
	console.log(`Toggle button clicked for group ${groupId}`);

	// Add your toggle logic here
};
const customGroupRenderer = ({ group }) => {
	const groupClass = group.sala ? "sala" : "";
	return (
		<div className={`rct-sidebar-row ${groupClass}`} data-cy="group-row">
			{group.title}
			{!group.sala && (
				<Switch
					onChange={() => handleToggleClick(group.id)}
					defaultChecked
					color="white" // Customize the color of the switch
					sx={{
						width: 42,
						height: 26,
						padding: 0,
						margin: 0,
						marginLeft: 2,
						"& .css-1mpet1h-MuiSwitch-root .MuiSwitch-switchBase": {
							margin: "1px",
						},
						"& .MuiSwitch-switchBase": {
							padding: 0,
							margin: 0.3,
							transitionDuration: "300ms",
							"&.Mui-checked": {
								transform: "translateX(16px)",
								color: "#fff",
								"& + .MuiSwitch-track": {
									backgroundColor: "#fff", // Change to white
									opacity: 1,
									border: 0,
								},
								"&.Mui-disabled + .MuiSwitch-track": {
									opacity: 0.5,
								},
							},
							"&.Mui-focusVisible .MuiSwitch-thumb": {
								backgroundColor: "#042E55",
								border: "6px solid #fff",
							},
							"&.Mui-disabled .MuiSwitch-thumb": {
								backgroundColor: "#042E55", // Thumb color
								transform: "translateY(-50%)",
							},
							"&.Mui-disabled + .MuiSwitch-track": {
								opacity: 0.7,
							},
						},
						"& .MuiSwitch-thumb": {
							boxSizing: "border-box",
							width: 22,
							height: 22,
							backgroundColor: "#042E55", // Thumb color
						},
						"& .MuiSwitch-track": {
							borderRadius: 13, // Adjust the borderRadius as needed
							backgroundColor: "#fff", // Track color
							opacity: 1,
							transition: "background-color 500ms",
						},
					}}
				/>
			)}
		</div>
	);
};

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250,
// 		},
// 	},
// };

const areas = ["Sala VR", "Electric Garage", "New Horizons"];
const estados = ["Preparado", "En proceso", "Sin preparar"];

function convertToMomentObjects(jsonData) {
	return jsonData.map((event) => {
		return {
			id: event.id,
			group: event.group,
			title: event.title,
			canMove: false,
			start_time: moment(event.start_time).add(6, "hours"),
			end_time: moment(event.end_time).add(6, "hours"),
		};
	});
}

function CronogramaAdmin() {
	// Set the locale to Spanish
	moment.locale("es");

	const [items, setItems] = useState([]);
	const [isLoadingItems, setIsLoadingItems] = useState(true);
	const [groups, setGroups] = useState([]);
	const [isLoadingGroups, setIsLoadingGroups] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [reservIdInModal, setReservIdInModal] = useState("");

	const [selectedOptions1, setSelectedOptions1] = useState([]);
	const [selectedOptions2, setSelectedOptions2] = useState([]);

	useEffect(() => {
		get("reservaciones/cronograma")
			.then((result) => {
				setItems(convertToMomentObjects(result));
				setIsLoadingItems(false);
				console.log(items);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
				setIsLoadingItems(false);
			});
	}, []);

	useEffect(() => {
		get("salas/cronograma")
			.then((result) => {
				setGroups(result);
				setIsLoadingGroups(false);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
				setIsLoadingGroups(false);
			});
	}, []);

	const [visibleTimeStart, setVisibleTimeStart] = useState(
		moment().add(-8, "hour").valueOf()
	);
	const [visibleTimeEnd, setVisibleTimeEnd] = useState(
		moment().add(8, "hour").valueOf()
	);

	const handleTimeChange = (
		visibleTimeStart,
		visibleTimeEnd,
		updateScrollCanvas
	) => {
		setVisibleTimeStart(visibleTimeStart);
		setVisibleTimeEnd(visibleTimeEnd);
		updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
	};

	const handleChange1 = (event) => {
		setSelectedOptions1(event.target.value);
	};

	const handleChange2 = (event) => {
		setSelectedOptions2(event.target.value);
	};

	return (
		<>
			<div className="menu-icon-admin">
				<img src={menuIcon} />
			</div>
			<ReservItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reservId={reservIdInModal}/>
			<NavBarAdmin />
			<div
				className="timeline-container-cronograma-admin"
				data-cy="timeline-container-cronograma-admin"
			>
				<Timeline
					groups={groups}
					items={items}
					visibleTimeStart={visibleTimeStart}
					visibleTimeEnd={visibleTimeEnd}
					defaultTimeStart={moment().add(-12, "hour")}
					defaultTimeEnd={moment().add(12, "hour")}
					lineHeight={50}
					sidebarWidth={230}
					onTimeChange={handleTimeChange}
					minZoom={14 * 60 * 60 * 1000} // 14 horas en milisegundos
					maxZoom={14 * 60 * 60 * 1000} // 14 horas en milisegundos
					groupRenderer={customGroupRenderer}
					onItemClick={(itemId) => {
						setReservIdInModal(itemId);
						setIsModalOpen(true);
					}}
					onItemSelect={(itemId) => {
						setReservIdInModal(itemId);
						setIsModalOpen(true);
					}}
				>
					<TimelineMarkers>
						<CustomMarker date={moment().valueOf()}>
							{({ styles, date }) => {
								const customStyles = {
									...styles,
									backgroundColor: "white",
									width: "4px",
								};
								return <div style={customStyles} />;
							}}
						</CustomMarker>

						<CursorMarker>
							{({ styles, date }) => {
								const customStyles = {
									...styles,
									backgroundColor: "white",
									width: "2px",
								};
								return <div style={customStyles} />;
							}}
						</CursorMarker>
					</TimelineMarkers>
					<TimelineHeaders>
						<SidebarHeader>
							{({ getRootProps }) => {
								return (
									<div
										{...getRootProps()}
										style={{
											width: "230px",
											height: "100px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										{/* Dropdown 1 */}
										<FormControl sx={{ width: "105px", margin: 0.45 }}>
											<InputLabel
												sx={{
													color: "white",
													"&.Mui-focused": {
														color: "white",
													},
												}}
											>
												Áreas
											</InputLabel>
											<Select
												data-cy="Áreas"
												multiple
												value={selectedOptions1}
												onChange={handleChange1}
												label="Dropdown 1"
												variant="outlined"
												sx={{
													color: "white",
													height: "50px",
													"& .MuiOutlinedInput-notchedOutline": {
														borderColor: "white",
														borderWidth: 2,
													},
													"&:hover .MuiOutlinedInput-notchedOutline": {
														borderColor: "white",
														borderWidth: 2,
													},
													"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
														color: "white",
														borderColor: "white",
														borderWidth: 2,
													},
													"& .MuiSvgIcon-root": {
														color: "white",
													},
													"&.Mui-focused": {
														color: "white", // Asegurar que el texto siga siendo blanco cuando esté enfocado
													},
													borderRadius: 4,
												}}
												renderValue={(selected) => selected.join(", ")}
											>
												{areas.map((area) => (
													<MenuItem key={area} value={area}>
														<Checkbox
															checked={selectedOptions1.indexOf(area) > -1}
														/>
														<ListItemText primary={area} />
													</MenuItem>
												))}
											</Select>
										</FormControl>

										{/* Dropdown 2 */}
										<FormControl sx={{ width: "105px", margin: 0.45 }}>
											<InputLabel
												sx={{
													color: "white",
													"&.Mui-focused": {
														color: "white",
													},
												}}
											>
												Estado
											</InputLabel>
											<Select
												data-cy="Estado"
												multiple
												value={selectedOptions2}
												onChange={handleChange2}
												label="Dropdown 2"
												variant="outlined"
												sx={{
													color: "white",
													height: "50px",
													"& .MuiOutlinedInput-notchedOutline": {
														borderColor: "white",
														borderWidth: 2,
													},
													"&:hover .MuiOutlinedInput-notchedOutline": {
														borderColor: "white",
														borderWidth: 2,
													},
													"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
														borderColor: "white",
														borderWidth: 2,
													},
													"& .MuiSvgIcon-root": {
														color: "white",
													},
													borderRadius: 4,
												}}
												renderValue={(selected) => selected.join(", ")}
											>
												{estados.map((estado) => (
													<MenuItem key={estado} value={estado}>
														<Checkbox
															checked={selectedOptions2.indexOf(estado) > -1}
														/>
														<ListItemText primary={estado} />
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								);
							}}
						</SidebarHeader>
						<DateHeader
							unit="primaryHeader"
							labelFormat={(interval) => (
								<CustomLabel interval={visibleTimeStart} />
							)}
						/>
						<DateHeader />
					</TimelineHeaders>
				</Timeline>
			</div>
		</>
	);
}

export default CronogramaAdmin;
