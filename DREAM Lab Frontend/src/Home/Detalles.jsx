import React, { useState } from "react";
import GlassCard from '../components/general/glass-card';
import UserAvatar from '../components/general/UserAvatar';
import Etiqueta from "./Etiqueta.jsx";
import './Detalles.css'
import BotonSolicitar from "./BotonSolicitar.jsx";
import CloseButton from "./CloseButton.jsx";
import { useNavigate } from 'react-router-dom';


function ExperienceDetails(props){

	const [exitAnimation, setExitAnimation] = useState(false);
	let navigate = useNavigate();


	const handleClose = () => {
		setExitAnimation(true);
    };

	const handleSolicitarClick = (imageID) => {
        // Llama a la función de navegación pasada como prop
        navigate(`/reservacion/${imageID}`);
    };

	const animationClass = exitAnimation ? 'slide-out' :  'slide-in';

    return(
        	<div className={`main-details-div ${animationClass}`}>
				
				<div className="boton-cerrar-detalles">
                	<CloseButton onClick={handleClose}/>
				</div>

				<GlassCard className="navbar-details" height='4.5rem' padding='0.5rem'>
					<div className="flex items-center justify-between w-full">
						<div className="logo-container">
							<img src="/LogoDreamLab.png" alt="Logo" className="logo" />
							<h1 className="dreamlab">D.R.E.A.M. LAB</h1>
						</div>
						<div className="user-avatar-container">
							<UserAvatar />
						</div>
					</div>
				</GlassCard >
				
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

				</div>

				<div className="boton-solicitud">
					<BotonSolicitar 
						nombreBoton = "Solicitar"
						onClick={() => handleSolicitarClick(props.imageID)} // Cambio realizado aquí
						/>
				</div>

			</div>
    )
}

export default ExperienceDetails;
