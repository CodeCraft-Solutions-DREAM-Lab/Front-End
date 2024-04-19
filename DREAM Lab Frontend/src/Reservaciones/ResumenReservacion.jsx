import { Button } from "@nextui-org/react";
import { post } from "../Global/Database";
import { useState } from "react";
import {
    getFromLocalStorage,
    getFromSessionStorage,
    removeFromLocalStorage,
    removeFromSessionStorage,
} from "../Global/Storage";
import { useNavigate } from "react-router-dom";
import AvisoFinal from "./components/AvisoFinal";

function ResumenReservacion(props) {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async () => {
        const data = {
            idUsuario: getFromLocalStorage("user") || "A0XXXXXX1",
            idSala: getFromSessionStorage("idSala") || null,
            idExperiencia: getFromSessionStorage("idExperiencia") || null,
            horaInicio: getFromSessionStorage("horaInicioIsoString"),
            duracion: getFromSessionStorage("duration"),
            fecha: getFromSessionStorage("fechaIsoString"),
            idMesa: null,
            estatus: 5,
        };

        setIsLoading(true);
        await post(
            "reservaciones",
            data,
            () => {},
            () => {
                setIsLoading(false);
            }
        ).then((response) => {
            removeFromSessionStorage("horaInicio");
            removeFromSessionStorage("horaInicioIsoString");
            removeFromSessionStorage("duration");
            removeFromSessionStorage("fecha");
            removeFromSessionStorage("fechaIsoString");
            setIsLoading(false);
            setIsModalOpen(true);
        });
    };

    return (
        <div>
            <h1>Resumen de Reservación</h1>
            <p>Este es el resumen de la reservación.</p>
            <AvisoFinal
                isOpen={isModalOpen}
                size="xl"
                onOk={() => {
                    setIsModalOpen(false);
                    navigate("/home");
                }}
                onClose={() => {
                    setIsModalOpen(false);
                    navigate("/home");
                }}
            />
            <Button isLoading={isLoading} onClick={handleSubmit}>
                Confirmar
            </Button>
        </div>
    );
}

export default ResumenReservacion;
