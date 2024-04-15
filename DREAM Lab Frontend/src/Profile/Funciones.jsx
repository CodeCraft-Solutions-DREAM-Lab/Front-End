import TarjetaLogro from "./TarjetaLogro";
import TarjetaReservacion from "./TarjetaReservacion";

// Función para formatear la fecha en el formato deseado
export function formatDate(dateString) {
    // Crear una nueva fecha en la zona horaria local a partir de la cadena de fecha
    const date = new Date(dateString + 'T00:00:00');
    // Obtener la fecha en formato de cadena con el mes completo y el día numérico
    const options = { timeZone: 'UTC', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('es-ES', options);
}

// Función para formatear la hora en el formato deseado
export function formatTime(timeString) {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Función para calcular la hora de finalización
export function calculateEndTime(startTime, duration) {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
    return end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Función para generar las tarjetas de reservación utilizando el componente TarjetaReservacion
export function generateReservationCards(reservacionesData, handleClickNodal) {

    const reservationCards = reservacionesData.map((reservation, index) => {
        const endTime = calculateEndTime(reservation.horaInicio, reservation.duracion);
        const formattedDate = formatDate(reservation.fecha);
        const formattedTime = formatTime(reservation.horaInicio);
        const formattedEndTime = formatTime(endTime);

        // Crear instancia del componente TarjetaReservacion con las propiedades adecuadas y devolverla
        return(
            <TarjetaReservacion
                key={index} 
                sala={reservation.sala}
                experiencia={reservation.experiencia}
                hora={`${formattedTime} - ${formattedEndTime}`}
                dia={formattedDate}
                funcion={() => handleClickNodal(1)} // Aquí se llama a la función handleClickNodal
            />
        );
    });

return reservationCards;
}

// Función para generar las tarjetas de logros
export const renderTarjetasLogro = (logrosData) => {
    return logrosData.map(logro => (
        <TarjetaLogro 
            key={logro.nombre} // Asegúrate de tener una clave única para cada elemento en el mapa
            progresoLogro={logro.progreso}
            nombreLogro={logro.nombre}
            descripcion={logro.descripcion}
            colorFondo={logro.color}
            iconoUtilizado={logro.logo} // Puedes dejar esta línea si quieres usar un icono específico o eliminarla si los iconos están incluidos en los datos del logro
        />
    ));
};