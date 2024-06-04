import Switch from "@mui/material/Switch";
import {
    saveToLocalStorage,
    getFromLocalStorage,
    existsInLocalStorage,
} from "src/utils/Storage";
import { useState, useEffect } from "react";
import propTypes from "prop-types";

const CustomGroupRenderer = ({
    group,
    // handleToggleClick,
    selectedMesasIds,
	setSelectedMesasIds,
}) => {

    group = group.group;
    const groupClass = group.sala ? "sala" : "";
    const [selected, setSelected] = useState(false);

	const handleToggleClick = (event, groupId, setSelected) => {
		setSelected(event.target.checked);
		setSelectedMesasIds((prevSelectedMesasIds) => {
			let newSelectedSalasIds = [...prevSelectedMesasIds];
			// Si el switch se activa se agrega la mesa a las mesas
			// seleccionadas
			if (event.target.checked) {
				if (!newSelectedSalasIds.includes(groupId)) {
					newSelectedSalasIds.push(groupId);
				}
			}
			// Si el switch se desactiva se quita la mesa de las mesas
			// seleccionadas
			else {
				newSelectedSalasIds = newSelectedSalasIds.filter(
					(id) => id !== groupId
				);
			}
			// console.log("newSelectedSalasIds: ", newSelectedSalasIds);
			saveToLocalStorage(
				"selectedMesasIds",
				JSON.stringify(newSelectedSalasIds)
			);
	
			return newSelectedSalasIds;
		});
	};


    useEffect(() => {
        setSelected(selectedMesasIds.includes(group.id));
    }, [selectedMesasIds, group.id]);

    return (
        <div
            className={`rct-sidebar-row ${groupClass}`}
            data-cy="group-row"
            key={group.id}
        >
            {group.title}
            {!group.sala && (
                <Switch
                    onChange={(event) =>
                        handleToggleClick(event, group.id, setSelected)
                    }
                    checked={selected}
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

CustomGroupRenderer.propTypes = {
	group: propTypes.object,
	// handleToggleClick: propTypes.func,
	selectedMesasIds: propTypes.array,
	setSelectedMesasIds: propTypes.func,
};

export default CustomGroupRenderer;
