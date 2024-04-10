import { useState } from "react";
import SelectorEquipo from "./SelectorEquipo";
import SelectorSala from "./SelectorSala";
import ResumenReservacion from "./ResumenReservacion";

function FlujoReservacion(props) {

    const [reservacion, setReservacion] = useState({});
    const [curStep, setCurStep] = useState(1);


    return (
        <>
        {curStep === 1 && <SelectorSala />}
        {curStep === 2 && <SelectorEquipo />}
        {curStep === 3 && <ResumenReservacion />}

        </>
    );
}

export default FlujoReservacion;