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
import { Select, MenuItem } from "@mui/material";

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

const groups = [
	{ id: 3, title: "Sala VR", sala: true },
	{ id: 1, title: "group 1", sala: false },
	{ id: 2, title: "group 2", sala: false },
];

const items = [
	{
		id: 1,
		group: 1,
		title: "item 1",
		start_time: moment(),
		end_time: moment().add(2, "hour"),
		sala: 1,
	},
	{
		id: 2,
		group: 2,
		title: "item 2",
		start_time: moment().add(-1, "hour"),
		end_time: moment().add(1, "hour"),
	},
	{
		id: 3,
		group: 1,
		title: "item 3",
		start_time: moment().add(3, "hour"),
		end_time: moment().add(6, "hour"),
	},
];

const handleToggleClick = (groupId) => {
	console.log(`Toggle button clicked for group ${groupId}`);
	// Add your toggle logic here
};
const customGroupRenderer = ({ group }) => {
	const groupClass = group.sala ? "sala" : "";
	return (
		<div className={`rct-sidebar-row ${groupClass}`}>
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
						" & .css-1mpet1h-MuiSwitch-root .MuiSwitch-switchBase": {
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
									backgroundColor: "#65C466", // Adjust the color as needed
									opacity: 1,
									border: 0,
								},
								"&.Mui-disabled + .MuiSwitch-track": {
									opacity: 0.5,
								},
							},
							"&.Mui-focusVisible .MuiSwitch-thumb": {
								color: "#33cf4d",
								border: "6px solid #fff",
							},
							"&.Mui-disabled .MuiSwitch-thumb": {
								color: "#E9E9EA", // Adjust the color as needed
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
						},
						"& .MuiSwitch-track": {
							borderRadius: 13, // Adjust the borderRadius as needed
							backgroundColor: "#E9E9EA", // Adjust the color as needed
							opacity: 1,
							transition: "background-color 500ms",
						},
					}}
				/>
			)}
		</div>
	);
};

function CronogramaAdmin() {
	// Set the locale to Spanish
	moment.locale("es");

	const [visibleTimeStart, setVisibleTimeStart] = useState(
		moment().add(-8, "hour")
	);
	const [visibleTimeEnd, setVisibleTimeEnd] = useState(moment().add(8, "hour"));
	useEffect(() => {
		console.log(
			"visibleTimeStart changed:",
			moment(visibleTimeStart).format("LL")
		);
		console.log("visibleTimeEnd changed:", moment(visibleTimeEnd).format("LL"));
	}, [visibleTimeStart, visibleTimeEnd]);

	const handleTimeChange = (
		visibleTimeStart,
		visibleTimeEnd,
		updateScrollCanvas
	) => {
		setVisibleTimeStart(visibleTimeStart);
		setVisibleTimeEnd(visibleTimeEnd);
		updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
	};

	return (
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
			minZoom={12 * 60 * 60 * 1000} // 1 day in milliseconds
			maxZoom={7 * 24 * 60 * 60 * 1000} // 7 days in milliseconds
			groupRenderer={customGroupRenderer}
		>
			<TimelineMarkers>
				<CustomMarker date={moment()}>
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
								style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}
							>
								{/* Dropdown 1 */}
								<Select
									defaultValue="Option 1"
									variant="outlined"
									sx={{
										width: "40%",
										margin: 0.45,
						
										color: "white",
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "white",
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "white",
										},
										"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
											borderColor: "white",
										},
										borderRadius: 4,

									}}
								>
									<MenuItem value="Option 1">Option 1</MenuItem>
									<MenuItem value="Option 2">Option 2</MenuItem>
									<MenuItem value="Option 3">Option 3</MenuItem>
								</Select>
								{/* Dropdown 2 */}
								<Select
									defaultValue="Option 1"
									variant="outlined"
									sx={{
										width: "40%",
										margin: 0.45,
										color: "white",
										color: "white",
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "white",
										},
										"&:hover .MuiOutlinedInput-notchedOutline": {
											borderColor: "white",
										},
										"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
											borderColor: "white",
										},
										borderRadius: 4,
										
									}}
								>
									<MenuItem value="Option 1">Option 1</MenuItem>
									<MenuItem value="Option 2">Option 2</MenuItem>
									<MenuItem value="Option 3">Option 3</MenuItem>
								</Select>
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
	);
}

export default CronogramaAdmin;
