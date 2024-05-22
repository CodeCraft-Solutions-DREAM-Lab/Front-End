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
import dayjs from "dayjs";
import "dayjs/locale/es";

// Hooks
import { useState } from "react";

// Iconos
import icono_calendario from "src/assets/Admin/Dashboard/icono_calendario.svg";

function SelectorFechaDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs().locale("es"));

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
                            <img src={icono_calendario} alt="Calendario" className="sfd-boton-calendario-icono" />
                        }
                        className="sfd-boton-calendario"
                        onPress={() => {
                            setIsOpen(true);
                        }}
                        color="white"
                    >
                        <span className="sfd-boton-calendario-label">
                            {currentDate.format("MMMM YY")}
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
                        value={currentDate}
                        onChange={(date) => {
                            setCurrentDate(date);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default SelectorFechaDashboard;
