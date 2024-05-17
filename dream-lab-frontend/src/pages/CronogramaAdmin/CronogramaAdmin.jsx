import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es"; // Import Spanish locale
import Timeline, {
	TimelineMarkers,
	TodayMarker,
	CursorMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./CronogramaAdmin.css";

const monthTranslations = {
    "January": "Enero",
    "February": "Febrero",
    "March": "Marzo",
    "April": "Abril",
    "May": "Mayo",
    "June": "Junio",
    "July": "Julio",
    "August": "Agosto",
    "September": "Septiembre",
    "October": "Octubre",
    "November": "Noviembre",
    "December": "Diciembre"
  };
  
  const weekdayTranslations = {
    "Sunday": "Domingo",
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado"
  };
  
  function translateDateToSpanish(dateString) {
    const date = new Date(dateString);
    const month = monthTranslations[date.toLocaleString("en-US", { month: "long" })];
    const weekday = weekdayTranslations[date.toLocaleString("en-US", { weekday: "long" })];
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Format the translated date string
    return `${weekday} ${day} ${month} ${year}`;
  }
  
  
  function CustomHeader({ getHeaderLabel }) {
    const labels = getHeaderLabel();
    console.log("getHeaderLabel prop passed:", getHeaderLabel);
  
    return (
      <div className="custom-header">
        {labels.map((label) => {
          const translatedLabel = translateDateToSpanish(label);
          console.log(translatedLabel); // Log the translated string
          // Or store it in a variable for further processing
          return <span key={label}>{translatedLabel}</span>;
        })}
      </div>
    );
  }
  
  
  

  

const groups = [
	{ id: 3, title: "Sala VR", tag: "sala" },
	{ id: 1, title: "group 1" },
	{ id: 2, title: "group 2" },
];

const items = [
	{
		id: 1,
		group: 1,
		title: "item 1",
		start_time: moment(),
		end_time: moment().add(1, "hour"),
		sala: 1,
	},
	{
		id: 2,
		group: 2,
		title: "item 2",
		start_time: moment().add(-0.5, "hour"),
		end_time: moment().add(0.5, "hour"),
	},
	{
		id: 3,
		group: 1,
		title: "item 3",
		start_time: moment().add(2, "hour"),
		end_time: moment().add(3, "hour"),
	},
];

function CronogramaAdmin() {
	// Set the initial state for formatted items
	const [formattedItems, setFormattedItems] = useState(
		items.map((item) => ({
			...item,
			start_time: moment(item.start_time).locale("es"),
			end_time: moment(item.end_time).locale("es"),
		}))
	);

	// Set the locale to Spanish
	moment.locale("es");

	return (
		<>
			<Timeline
				groups={groups}
				items={formattedItems}
				defaultTimeStart={moment().add(-12, "hour")}
				defaultTimeEnd={moment().add(12, "hour")}
                
                header={<CustomHeader getHeaderLabel={() => Timeline.getHeaderLabel()} />}

				
			>
				<TimelineMarkers>
					<TodayMarker />
					<CursorMarker />
				</TimelineMarkers>
                
			</Timeline>
		</>
	);
}

export default CronogramaAdmin;
