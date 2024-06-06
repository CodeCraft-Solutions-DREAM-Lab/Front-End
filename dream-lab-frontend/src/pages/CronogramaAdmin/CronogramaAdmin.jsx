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
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    Divider,
} from "@mui/material";
import SpeedDial from '@mui/material/SpeedDial';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GestionSalas from "./components/GestionSalas/GestionSalas";
import { get } from "src/utils/ApiRequests";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";
import menuIcon from "src/assets/Admin/menu-admin.svg";
import ReservItemModal from "./components/ModalReservInfo/ReservItemModal";
import CustomGroupRenderer from "./components/Cronograma/CustomGroupRenderer";
import CustomItemRenderer from "./components/Cronograma/CustomItemRenderer";

import {
    saveToLocalStorage,
    getFromLocalStorage,
    existsInLocalStorage,
} from "src/utils/Storage";
import propTypes from "prop-types";

const actions = [
	{ icon: <AddCircleIcon />, name: 'Agregar reservación'},
	{ icon: <SettingsIcon />, name: 'Configurar Salas'},
];

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

CustomLabel.propTypes = {
    group: propTypes.object,
    handleToggleClick: propTypes.func,
    selectedMesasIds: propTypes.array,
};

const estados = ["Preparado", "En proceso", "Sin preparar"];

function convertToMomentObjects(jsonData) {
    return jsonData.map((event) => {
        return {
            id: event.id,
            group: event.group,
            title: event.title,
            estatusMateriales: event.estatusMateriales,
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
	const [isGestionSalasOpen, setIsGestionSalasOpen] = useState(false);
	const [salasEstados, setSalasEstados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservIdInModal, setReservIdInModal] = useState(0);

    const [selectedSalasIds, setSelectedSalasIds] = useState([]);
    const [selectedSalasTitles, setSelectedSalasTitles] = useState([]);
    const [selectedMesasIds, setSelectedMesasIds] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);

    const [filteredGroups, setFilteredGroups] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [salas, setSalas] = useState([]);
    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        get("reservaciones/cronograma")
            .then((result) => {
                console.log(result);
                setItems(convertToMomentObjects(result));
                setIsLoadingItems(false);
                // console.log(items);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                setIsLoadingItems(false);
            });
    }, []);

    useEffect(() => {
		get("salas")
			.then((result) => {
				setSalasEstados(result.map((sala) => ({
                    ...sala,
                    clicked: false,
                })));
			})
			.catch((error) => {
				console.error("An error occurred:", error);
			});
	}, []);

    useEffect(() => {
        get("salas/cronograma")
            .then((result) => {
                setGroups(result);
                setIsLoadingGroups(false);
                // console.log("salas/cronograma: ", result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                setIsLoadingGroups(false);
            });
    }, []);

    // Obtener los datos de las salas para poder agregar los nombres al filtro
    // de salas
    useEffect(() => {
        get("salas")
            .then((result) => {
                setSalas(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    // Obtener los datos de las mesas para poder agregar los nombres al filtro
    // de mesas
    useEffect(() => {
        get("mesas")
            .then((result) => {
                setMesas(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

    // Filtrar las salas que se muestran en el cronograma según las salas que se
    // hayan seleccionado en el filtro de salas
    useEffect(() => {
        setFilteredGroups(
            groups.filter((group) => selectedSalasIds.includes(group.idSala))
        );
    }, [selectedSalasIds, groups]);

    const handleOpenGestionSalas = () => {
        setIsGestionSalasOpen(true);
    };

    // Filtrar las reservaciones que se muestran en el cronograma según las
    // mesas que se hayan seleccionado en el filtro de mesas (switches)
    useEffect(() => {
        setFilteredItems(
            items.filter((item) => selectedMesasIds.includes(item.group))
        );
    }, [selectedMesasIds, items]);

    // En caso de que se haya guardado en el localStorage la selección de salas
    // previamente se cargan los datos guardados, en caso contrario se cargan
    // todas las salas
    useEffect(() => {
        if (
            existsInLocalStorage("selectedSalasIds") &&
            salas &&
            salas.length > 0
        ) {
            const selectedSalasIdsSessionStorage = JSON.parse(
                getFromLocalStorage("selectedSalasIds")
            );

            setSelectedSalasIds(selectedSalasIdsSessionStorage);

            setSelectedSalasTitles(
                selectedSalasIdsSessionStorage.map(
                    (id) => salas.find((sala) => sala.idSala === id).nombre
                )
            );
        } else if (salas && salas.length > 0) {
            setSelectedSalasIds(salas.map((sala) => sala.idSala));
            setSelectedSalasTitles(salas.map((sala) => sala.nombre));
        } else {
            setSelectedSalasIds([]);
            setSelectedSalasTitles([]);
        }
    }, [salas]);

    // En caso de que se haya guardado en el localStorage la selección de mesas
    // previamente se cargan los datos guardados, en caso contrario se cargan
    // todas las mesas
    useEffect(() => {
        if (
            existsInLocalStorage("selectedMesasIds") &&
            mesas &&
            mesas.length > 0
        ) {
            const selectedMesasIdsSessionStorage = JSON.parse(
                getFromLocalStorage("selectedMesasIds")
            );

            setSelectedMesasIds(selectedMesasIdsSessionStorage);
        } else if (mesas && mesas.length > 0) {
            setSelectedMesasIds(mesas.map((mesa) => mesa.idMesa));
        } else {
            setSelectedMesasIds([]);
        }
    }, [mesas]);

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

    // Función que se ejecuta cuando se selecciona una sala en el filtro de
    // salas para actualizar las salas seleccionadas y guardarlas en el
    // localStorage para que persistan entre sesiones del usuario
    const handleChangeSelectSalas = (event) => {
        const { value } = event.target;
        let newSelectedSalasIds, newSelectedSalasTitles;

        // Si se selecciona "Todas" se seleccionan todas las salas
        if (value.includes("Todas")) {
            newSelectedSalasTitles = salas.map((sala) => sala.nombre);
            newSelectedSalasIds = salas.map((sala) => sala.idSala);
        }
        // Si se selecciona alguna sala en específico se seleccionan solo esas salas
        else {
            newSelectedSalasTitles = value;
            newSelectedSalasIds = value.map(
                (title) => salas.find((sala) => sala.nombre === title).idSala
            );
        }

        // Guardamos en el estado y en el localStorage las salas seleccionadas
        setSelectedSalasTitles(newSelectedSalasTitles);
        setSelectedSalasIds(newSelectedSalasIds);
        saveToLocalStorage(
            "selectedSalasIds",
            JSON.stringify(newSelectedSalasIds)
        );
    };

    const handleChange2 = (event) => {
        setSelectedOptions2(event.target.value);
    };  

    const updateSalasState = (newSalas) => {
        setSalasEstados(newSalas);
    };

    const updateSalaState = (id, clicked) => {
        setSalasEstados((prevSalas) =>
            prevSalas.map((sala) =>
                sala.idSala === id ? { ...sala, clicked } : sala
            )
        );
    };

    return (
        <>
            <GestionSalas
				data-cy="gestion-salas"
				salas={salasEstados}
                setSalas={setSalasEstados}
				isOpen={isGestionSalasOpen}
				onClose={() => {
					setIsGestionSalasOpen(false);
				}}
                updateSalaState={updateSalaState}
			/>
			<SpeedDial
				ariaLabel="SpeedDial Menu"
				sx={{ position: 'fixed', bottom: 30, right: 50 }}
				icon={
					<img className="iconoMenu" src={menuIcon} />
				}
			>
				{actions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={React.cloneElement(action.icon, { style: { fontSize: 45, color: 'white' } })}
					tooltipTitle={action.name}
					onClick={action.name === 'Configurar Salas' ? handleOpenGestionSalas : undefined}
				/>
				))}
			</SpeedDial>
            <ReservItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reservId={reservIdInModal} />
            <NavBarAdmin />
            <div
                className="timeline-container-cronograma-admin"
                data-cy="timeline-container-cronograma-admin"
            >
                <Timeline
                    groups={filteredGroups}
                    items={filteredItems}
                    visibleTimeStart={visibleTimeStart}
                    visibleTimeEnd={visibleTimeEnd}
                    defaultTimeStart={moment().add(-12, "hour")}
                    defaultTimeEnd={moment().add(12, "hour")}
                    lineHeight={50}
                    sidebarWidth={230}
                    onTimeChange={handleTimeChange}
                    minZoom={12 * 60 * 60 * 1000} // half a day in milliseconds
                    maxZoom={24 * 60 * 60 * 1000} // 1 day in milliseconds
                    itemRenderer={({ item, itemContext, getItemProps }) => {
                        return (<CustomItemRenderer
                            item={item}
                            itemContext={itemContext}
                            getItemProps={getItemProps}
                        />)
                    }}
                    groupRenderer={(group) => (
                        <CustomGroupRenderer
                            group={group}
                            // handleToggleClick={handleToggleClick}
                            selectedMesasIds={selectedMesasIds}
                            setSelectedMesasIds={setSelectedMesasIds}
                        />
                    )}
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
                                        <FormControl
                                            sx={{
                                                width: "105px",
                                                margin: 0.45,
                                            }}
                                        >
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
                                                value={selectedSalasTitles}
                                                onChange={
                                                    handleChangeSelectSalas
                                                }
                                                label="Dropdown 1"
                                                variant="outlined"
                                                sx={{
                                                    color: "white",
                                                    height: "50px",
                                                    "& .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            "white",
                                                        borderWidth: 2,
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            "white",
                                                        borderWidth: 2,
                                                    },
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        color: "white",
                                                        borderColor:
                                                            "white",
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
                                                renderValue={(selected) =>
                                                    selected.join(", ")
                                                }
                                            >
                                                <MenuItem value="Todas">
                                                    <Checkbox
                                                        checked={
                                                            selectedSalasTitles.length ===
                                                            salas.length
                                                        }
                                                    />
                                                    <ListItemText primary="Seleccionar todas" />
                                                </MenuItem>
                                                <Divider />
                                                {salas.map((area, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={area.nombre}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                selectedSalasIds.indexOf(
                                                                    area.idSala
                                                                ) > -1
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={
                                                                area.nombre
                                                            }
                                                        />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* Dropdown 2 */}
                                        <FormControl
                                            sx={{
                                                width: "105px",
                                                margin: 0.45,
                                            }}
                                        >
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
                                                    "& .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            "white",
                                                        borderWidth: 2,
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            "white",
                                                        borderWidth: 2,
                                                    },
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            "white",
                                                        borderWidth: 2,
                                                    },
                                                    "& .MuiSvgIcon-root": {
                                                        color: "white",
                                                    },
                                                    borderRadius: 4,
                                                }}
                                                renderValue={(selected) =>
                                                    selected.join(", ")
                                                }
                                            >
                                                {estados.map((estado) => (
                                                    <MenuItem
                                                        key={estado}
                                                        value={estado}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                selectedOptions2.indexOf(
                                                                    estado
                                                                ) > -1
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={estado}
                                                        />
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
