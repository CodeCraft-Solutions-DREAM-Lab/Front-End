import BotonRegresar from "../components/general/BotonRegresar";
import ListaReservaciones from "./ListaReservaciones";
import { useEffect, useState } from "react";
import NameCard from "./NameCard";
import TarjetaLogro from "./TarjetaLogro";
import TarjetaReservacion from "./TarjetaReservacion";
import EsferaPuntosPrioridad from "./EsferaPuntosPrioridad";
import BotonCelular from "./BotonCelular";
import './Profile.css'
import BotonBack from "../components/general/BotonBack";
import {generateReservationCards, renderTarjetasLogro} from "./Funciones.jsx";
import CancelarReservacion from "./CancelarReservacion.jsx";

const logrosData = [{
	"nombre": "Big Dreamer",
	"descripcion": "Asiste a más de 35 eventos en el Dream Lab.",
	"progreso": 0.75,
	"color": "#7885F8",
	"logo":"LogoBigDreamer"
	},
	{
	"nombre": "Robot Expert",
	"descripcion": "Asiste a 3 talleres en el Dimesion Forge.",
	"progreso": 1,
	"color": "#7885F8",
	"logo":"LogoRobot"
	},
	{
	"nombre": "Apple Developer",
	"descripcion": "Asiste a 3 talleres de Swift.",
	"progreso": 0.25,
	"color": "#7885F8",
	"logo":"LogoBigDreamer"
	}
];

const reservacionesData = [{
	"sala": "Sala Horizons",
	"experiencia": "VR Experience",
	"horaInicio": "15:00:00",
	"duracion": 2,
	"fecha": "2024-12-15"
	},
	{
	"sala": "Dimension Forge",
	"experiencia": "Make a Computer - Course",
	"horaInicio": "14:30:00",
	"duracion": 1,
	"fecha": "2024-01-24"
	},
	{
	"sala": "Lego Room",
	"experiencia": "Swift Course",
	"horaInicio": "08:00:00",
	"duracion": 3,
	"fecha": "2024-04-26"
	}
]

function Profile() {

	const [reservaciones, setReservaciones] = useState([]);
	const [tipoNodal, setTipoNodal] = useState(1); 

	const handleClickNodal = (tipo) => {
        setTipoNodal(tipo);
    };

	useEffect(() => {
		fetch('https://dreamlab-api.azurewebsites.net/reservaciones/usuario/A0XXXXXX1')
			.then(response => response.json())
			.then(data => {
				setReservaciones(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	}, []);

	return (

		<div>

			{tipoNodal === 1 ? (
				<CancelarReservacion
					titulo1="Estas a punto de cancelar tu reservación en: Sala Horizons"
					titulo2="Martes - 15 de diciembre"
					titulo3="15:00 - 17:00"
					titulo4="¿Deseas continuar?"
					funcionRojo={() => handleClickNodal(2)}
					funcionVerde={() => handleClickNodal(0)}
				/>
			) : tipoNodal === 2 ? (
				<CancelarReservacion
					titulo1="Estas a punto de cancelar tu reservación en: Dimension Forge"
					titulo2="Miércoles - 24 de enero"
					titulo3="14:30 - 15:30"
					titulo4="¿Deseas continuar?"
					funcionRojo={() => handleClickNodal(3)}
					funcionVerde={() => handleClickNodal(0)}
				/>
			) : tipoNodal === 3 ? (
				<CancelarReservacion
					titulo1="Estas a punto de cancelar tu reservación en: Lego Room"
					titulo2="Martes - 26 de abril"
					titulo3="08:00 - 11:00"
					titulo4="¿Deseas continuar?"
					funcionVerde={() => handleClickNodal(0)}
				/>
			) : null}

			<div className="boton-atras">
				<BotonBack className="imagen-boton" ruta="/home/"/>
			</div>
			
			<NameCard/>

			<div className="div-exterior-perfil">

				<div className="esfera-div-celular">
					<EsferaPuntosPrioridad
						puntos="367"
						subtitulo="Puntos de prioridad"
					/>
				</div>

				<div className="logros-div">

					<h2 className="sub">Logros</h2>

					<div className="logros-div-in">

						{renderTarjetasLogro(logrosData)}
						<div className="degradado-down"></div>                 

					</div>

				</div>

				<div className="esfera-div">
					<EsferaPuntosPrioridad
						puntos="367"
						subtitulo="Puntos de prioridad"
					/>
				</div>

				<div className="reservaciones-div">

					<h2 className="sub">Reservaciones activas</h2>

					<div className="reservaciones-div-in">

					{generateReservationCards(reservacionesData, handleClickNodal)}
						<div className="degradado-down"></div>                 

					</div>
				</div>

				<div className="botones-modo-celular">
					<BotonCelular texto="Logros" tipo="logros"/>
					<BotonCelular texto="Reservaciones activas" tipo="calendario"/>
				</div>

			</div>
			
			<ListaReservaciones reservations={reservaciones} setReservations={setReservaciones} />
		</div>
	);
}

export default Profile;