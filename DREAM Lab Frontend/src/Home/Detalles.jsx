import { useState } from "react";
import Etiqueta from "./Etiqueta.jsx";
import './Detalles.css'
import BotonSolicitar from "./BotonSolicitar.jsx";
import CloseButton from "./CloseButton.jsx";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/general/NavBar.jsx";


function ExperienceDetails(props){

	const [exitAnimation, setExitAnimation] = useState(false);
	let navigate = useNavigate();


	const handleClose = () => {
		setExitAnimation(true);
	
		// Esperar 500 milisegundos (por ejemplo)
		setTimeout(() => {
			props.handleClose();
		}, 500); // ajusta el tiempo según tus necesidades
	};

	const handleSolicitarClick = () => {
        // Llama a la función de navegación pasada como prop
		navigate(`/reservacion/sala?idSala=${props.idSalaProp}&nombreSala=${props.nombre}`);
    };

	const animationClass = exitAnimation ? 'slide-out' :  'slide-in';

    return(
		<div className={`main-details-div ${animationClass}`}>
		
			<div className="boton-cerrar-detalles">
				<CloseButton onClick={handleClose}/>
			</div>
			
			<div className="details">

				<div className="experience-details">
					<h1 className="experience-name">{props.nombre}</h1>
					<p className="experience-description">{props.descripcion}</p>
					<div className="tags-details">
					<div className="tags-details">
						{props.exclusivoUF && <div className="tag"><Etiqueta nombre="Exclusivo UF" tipo="exclusivo-uf" /></div>}
						{props.autodirigido && <div className="tag"><Etiqueta nombre="Autodirigido" tipo="autodirigido" /></div>}
					</div>
					</div>
				</div>

				<div className="image">
					<img className="experience-image" src={props.imagenExp} alt="Fotografía de experiencia"/>
				</div>

				<div className="boton-solicitud">
				<BotonSolicitar 
					nombreBoton = "Solicitar"
					onClick={() => handleSolicitarClick()} // Cambio realizado aquí
					/>
			</div>

			</div>



		</div>
    )
}

export default ExperienceDetails;
