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

export function formatTime(timeString) {
    const time = new Date(`1970-01-01T${timeString}`);
    
    // Sumar 6 horas
    time.setHours(time.getHours() + 6);

    // Formatear la hora y los minutos
    const hour = time.getHours().toString().padStart(2, '0');
    const minute = time.getMinutes().toString().padStart(2, '0');
    
    return `${hour}:${minute}`;
}

export function calculateEndTime(startTime, duration) {
    const start = new Date(`1970-01-01T${startTime}`);
    
    // Sumar la duración en milisegundos al tiempo de inicio
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    // Sumar 6 horas adicionales
    end.setHours(end.getHours() + 6);

    // Formatear la hora y los minutos
    const hour = end.getHours().toString().padStart(2, '0');
    const minute = end.getMinutes().toString().padStart(2, '0');
    
    return `${hour}:${minute}`;
}


// Función para generar las tarjetas de reservación utilizando el componente TarjetaReservacion
export function generateReservationCards(reservacionesData, handleClickModal) {
    const reservationCards = reservacionesData.map((reservation, index) => {
        // Formatear la fecha y hora
        const startDate = new Date(reservation.fecha).toISOString().split('T')[0];
        const startTime = new Date(reservation.horaInicio).toISOString().split('T')[1];
        const endTime = new Date(reservation.horaInicio);
        endTime.setHours(endTime.getHours() + reservation.duracion);
    
        // Obtener las fechas y horas formateadas utilizando las funciones proporcionadas
        const formattedDate = formatDate(startDate);
        const formattedTime = formatTime(startTime);
        const formattedEndTime = calculateEndTime(startTime, reservation.duracion);
    
        // Crear instancia del componente TarjetaReservacion con las propiedades adecuadas y devolverla
        return (
            <TarjetaReservacion
                key={index}
                sala={reservation.sala}
                experiencia={reservation.experiencia}
                hora={`${formattedTime} - ${formattedEndTime}`}
                dia={formattedDate}
                funcion={() => handleClickModal(1)} // Aquí se llama a la función handleClickModal
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