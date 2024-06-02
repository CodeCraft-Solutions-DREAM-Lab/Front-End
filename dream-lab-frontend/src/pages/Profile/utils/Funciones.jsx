import TarjetaLogro from "../components/TarjetasLogro/TarjetaLogro";
import TarjetaReservacion from "../components/TarjetaReservacion/TarjetaReservacion";
import AnuncioSinReservas from "../components/TarjetaReservacion/components/AnuncioSinReservas/AnuncioSinReservas";

// Función para formatear la fecha en el formato deseado
export function formatDate(dateString) {
    // Crear una nueva fecha en la zona horaria local a partir de la cadena de fecha
    const date = new Date(dateString + "T00:00:00");
    // Obtener la fecha en formato de cadena con el mes completo y el día numérico
    const options = { timeZone: "UTC", month: "long", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
}

export function formatTime(timeString) {
    const time = new Date(`1970-01-01T${timeString}`);

    // Sumar 6 horas
    time.setHours(time.getHours() + 6);

    // Formatear la hora y los minutos
    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minute}`;
}

export function calculateEndTime(startTime, duration) {
    const start = new Date(`1970-01-01T${startTime}`);

    // Sumar la duración en milisegundos al tiempo de inicio
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    // Sumar 6 horas adicionales
    end.setHours(end.getHours() + 6);

    // Formatear la hora y los minutos
    const hour = end.getHours().toString().padStart(2, "0");
    const minute = end.getMinutes().toString().padStart(2, "0");

    return `${hour}:${minute}`;
}

// Función para generar las tarjetas de reservación utilizando el componente TarjetaReservacion
export function generateReservationCards(reservacionesData, handleClickModal) {

    // Filtrar solo las reservaciones confirmadas y pendientes
    const reservacionesConfirmadas = reservacionesData.filter(
        (reservation) => reservation.estatus === 3 || reservation.estatus === 5
    );

    // Filtrar solo las reservaciones del día actual o futuras
    const reservacionesFuturas = reservacionesConfirmadas.filter(reservation => {
        const reservationDate = new Date(reservation.fecha);
        const today = new Date();
        return reservationDate >= today;
    });

    // Ordenar las reservaciones por fecha
    reservacionesFuturas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Despleigue de mensaje: "No hay reservaciones activas"
    if (reservacionesFuturas.length === 0) {
        return <AnuncioSinReservas />;
    }

    const reservationCards = reservacionesFuturas.map((reservation, index) => {
        // Formateo de día de la semana
        const now = new Date(reservation.fecha);
        now.setDate(now.getDate() + 1);
        const options = { weekday: "long" };
        const dayOfWeek = now.toLocaleDateString("es-ES", options);
        const dayOfWeekFinal =
            dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

        // Formatear la fecha y hora
        const startDate = new Date(reservation.fecha)
            .toISOString()
            .split("T")[0];
        const startTime = new Date(reservation.horaInicio)
            .toISOString()
            .split("T")[1];
        const endTime = new Date(reservation.horaInicio);
        endTime.setHours(endTime.getHours() + reservation.duracion);

        // Obtener las fechas y horas formateadas utilizando las funciones proporcionadas
        const formattedDate = formatDate(startDate);
        const formattedTime = formatTime(startTime);
        const formattedEndTime = calculateEndTime(
            startTime,
            reservation.duracion
        );

        if (reservation.estatus !== 3 && reservation.estatus !== 5) {
            // Si el estatus no es igual a "Confirmada", no generamos la tarjeta de reservación
            return null;
        }

        // Crear instancia del componente TarjetaReservacion con las propiedades adecuadas y devolverla
        return (
            <TarjetaReservacion
                key={index}
                sala={
                    reservation.nombre_sala 
                    ? reservation.nombre_sala  
                    : "D.R.E.A.M. Lab (Pendiente)"
                }

                pendiente = {reservation.estatus === 5 ? true : false}

                experiencia={
                    reservation.nombre_experiencia
                        ? reservation.nombre_experiencia
                        : "Visita de Exploración"
                }
                hora={
                    reservation.horaInicio && reservation.duracion
                        ? `${formattedTime} - ${formattedEndTime}`
                        : "Pendiente"
                }
                dia={reservation.fecha ? formattedDate : "Pendiente"}
                funcion={() =>
                    handleClickModal(
                        1,
                        reservation.nombre_sala
                            ? reservation.nombre_sala
                            : "D.R.E.A.M. Lab",
                        reservation.nombre_experiencia
                            ? reservation.nombre_experiencia
                            : "Visita de Exploración",
                        reservation.horaInicio && reservation.duracion
                            ? `${formattedTime} - ${formattedEndTime}`
                            : "Pendiente",
                        reservation.fecha
                            ? dayOfWeekFinal + " - " + formattedDate
                            : "Pendiente",
                        reservation.idReservacion
                    )
                }
            />
        );
    });

    return reservationCards;
}

// Función para generar las tarjetas de logros
export const renderTarjetasLogro = (logrosData, estadoData) => {
    return logrosData.map((logro) => (
        <TarjetaLogro
            key={logro.idLogro} // Asegúrate de tener una clave única para cada elemento en el mapa
            progresoLogro={
                estadoData[logro.idLogro - 1].valorActual
                    ? estadoData[logro.idLogro - 1].valorActual / logro.valorMax
                    : 0
            } // Accede al estado del logro desde estadoData y calcula el progreso
            nombreLogro={logro.nombre ? logro.nombre : "Logro"}
            descripcion={
                logro.descripcion ? logro.descripcion : "Descripción pendiente."
            }
            colorFondo={logro.color ? logro.color : "#6F75E1"}
            iconoUtilizado={
                logro.iconoURL
                    ? logro.iconoURL
                    : "https://dreamlabstorage.blob.core.windows.net/logros/Star.webp"
            } // Puedes dejar esta línea si quieres usar un icono específico o eliminarla si los iconos están incluidos en los datos del logro
        />
    ));
};
