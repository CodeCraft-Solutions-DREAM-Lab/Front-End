// Estilos
import "./SelectorFechaDashboard.css";

// Selector de fecha
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// Hooks
import { useState } from "react";

// Iconos
import icono_calendario from "src/assets/Admin/Dashboard/icono_calendario.svg";

// Tipo de datos de las props
import propTypes from "prop-types";

function SelectorFechaDashboard({ fechaSeleccionada, setFechaSeleccionada }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sfd-contenedor">
            <Popover
                isOpen={isOpen}
                placement="bottom"
                showArrow
                offset={10}
                onOpenChange={(open) => setIsOpen(open)}
            >
                <PopoverTrigger>
                    <Button
                        endContent={
                            <img
                                src={icono_calendario}
                                alt="Calendario"
                                className="sfd-boton-calendario-icono"
                            />
                        }
                        className="sfd-boton-calendario"
                        onPress={() => {
                            setIsOpen(true);
                        }}
                        color="white"
                        data-cy="sfd-boton-calendario"
                    >
                        <span className="sfd-boton-calendario-label" data-cy="sfd-boton-calendario-label">
                            {fechaSeleccionada.format("MMMM YY")}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="h-full">
                    <DateCalendar
                        open={isOpen}
                        openTo="month"
                        views={["year", "month"]}
                        onMonthChange={() => {
                            setIsOpen(false);
                        }}
                        sx={{ height: "100%" }}
                        value={fechaSeleccionada}
                        onChange={(date) => {
                            setFechaSeleccionada(date);
                        }}
                        data-cy="sfd-calendario"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

SelectorFechaDashboard.propTypes = {
    fechaSeleccionada: propTypes.object.isRequired,
    setFechaSeleccionada: propTypes.func.isRequired,
};

export default SelectorFechaDashboard;
