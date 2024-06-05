// Componentes de Nextui
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    Button,
    Input,
} from "@nextui-org/react";

// Estilos
import "./ModalCrearReservacionAdmin.css";

// Router
import { useNavigate } from "react-router-dom";

// import Storage
import { saveToSessionStorage } from "src/utils/Storage.js";

// Hooks
import { useState } from "react";

// Alerts
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import propTypes from "prop-types";

function ModalCrearReservacionAdmin({ isOpen, onOpen, onOpenChange, salas }) {
    const navigate = useNavigate();
    const [selectedSala, setSelectedSala] = useState([]);
    const [nombre, setNombre] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleAceptar = () => {
        if (nombre === "") {
            setOpen(true);
            setMessage("Introduce un nombre");
            return;
        }
        if (selectedSala.length === 0) {
            setOpen(true);
            setMessage("Selecciona una sala");
            return;
        }
        onOpenChange();

        const salaSeleccionada = selectedSala.values().next().value;
        saveToSessionStorage("reservType", "sala");
        saveToSessionStorage("idSala", salaSeleccionada);
        navigate(`/reservacion/sala`);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="opaque"
                size="2xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="mcra-header">
                                <h1 className="mcra-title">
                                    Crear Reservación
                                </h1>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Persona asignada a la reservación"
                                    placeholder="Nombre"
                                    labelPlacement="outside"
                                    className="mcra-input"
                                    classNames={{
                                        inputWrapper: [
                                            "bg-transparent border-2 h-12",
                                        ],
                                        label: ["text-lg"],
                                    }}
                                    value={nombre}
                                    onValueChange={setNombre}
                                />
                                <Select
                                    label="Sala"
                                    labelPlacement="outside"
                                    placeholder="Seleccione una sala"
                                    className="mcra-select"
                                    classNames={{
                                        trigger: [
                                            "bg-transparent border-2  h-12",
                                        ],
                                        label: ["text-lg"],
                                    }}
                                    selectedKeys={selectedSala}
                                    onSelectionChange={setSelectedSala}
                                >
                                    {salas.map((sala) => (
                                        <SelectItem key={sala.idSala}>
                                            {sala.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <div className="mcra-contenedor-botones">
                                    <Button
                                        className="bg-white border-4 border-[#ac3e1b] text-[#ac3e1b] hover:bg-[#ac3e1b] hover:border-[#ac3e1b] hover:text-white mcra-button"
                                        onPress={onClose}
                                        radius="full"
                                    >
                                        <span className="mcra-button-text">
                                            Cancelar
                                        </span>
                                    </Button>
                                    <Button
                                        className="bg-white border-4 border-[#1bac55] text-[#1bac55] hover:bg-[#1bac55] hover:border-[#1bac55]  hover:text-white mcra-button"
                                        onPress={handleAceptar}
                                        radius="full"
                                    >
                                        <span className="mcra-button-text">
                                            Aceptar
                                        </span>
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    data-cy="login-error"
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}

ModalCrearReservacionAdmin.propTypes = {
    isOpen: propTypes.bool,
    onOpen: propTypes.func,
    onOpenChange: propTypes.func,
    salas: propTypes.array,
};

export default ModalCrearReservacionAdmin;
