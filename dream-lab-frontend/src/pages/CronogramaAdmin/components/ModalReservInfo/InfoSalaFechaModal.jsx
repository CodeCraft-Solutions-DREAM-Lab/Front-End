

import { Skeleton } from "@nextui-org/react";
import propTypes from "prop-types";
import "./InfoSalaFechaModal.css";

const InfoSalaFechaModal = ({salaName, mesaName, dateString, horaInicioString, horaFinString, isLoading}) => {
  
    if (isLoading) {
        return (
            <>
            <Skeleton className="ISFM-sala-mesa-skeleton" />
            <Skeleton className="ISFM-fecha-skeleton" />
            <Skeleton className="ISFM-hora-skeleton" />
            </>
        )
    }

    return (
    <>
        <p className="ReservItemModal-sala-mesa">
            <span className="ReservItemModal-sala-name">{salaName} </span>
            <span className="ReservItemModal-mesa-name">- {mesaName}</span>
        </p>

        <p className="ReservItemModal-date">
            {dateString}
        </p>

        <p className="ReservItemModal-hora">
            {horaInicioString} a {horaFinString}
        </p>
    </>
  )
}

InfoSalaFechaModal.propTypes = {
    salaName: propTypes.string,
    mesaName: propTypes.string,
    dateString: propTypes.string,
    horaInicioString: propTypes.string,
    horaFinString: propTypes.string,
    isLoading: propTypes.bool
}

export default InfoSalaFechaModal