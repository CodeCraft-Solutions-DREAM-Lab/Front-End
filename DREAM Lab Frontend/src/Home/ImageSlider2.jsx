import { React, useRef, useEffect } from 'react';
import './ImageSlider2.css';

const ImageSlider = ({ images }) => {
	const trackRef = useRef(null);

	useEffect(() => {
		const track = trackRef.current;

		const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

		const handleOnUp = () => {
			track.dataset.mouseDownAt = "0";
			track.dataset.prevPercentage = track.dataset.percentage;
		};

		const handleOnLeave = () => {
			if (track.dataset.mouseDownAt !== "0") {
				handleOnUp();
			}
		};

		const handleOnMove = (e) => {
			if (track.dataset.mouseDownAt === "0") return;

			// Diferencia de posicion horizontal de cuando se presiono y la posicion actual
			const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
			// Maxima diferencia permitida es la mitad del ancho de la ventana
			const maxDelta = window.innerWidth / 2;

			// Obtener el porcentaje de cambio
			const percentage = (mouseDelta / maxDelta) * -100;
			// Considerar el porcentaje de cambio que se tenia previamente y el porcentaje de cambio actual (para que no se este reseteando
			// el porcentaje de cambio cada vez que se mueve el mouse/touch)
			const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage
			// Limitar el porcentaje de cambio a un rango de -100% a 0%
			const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -25);

			track.dataset.percentage = nextPercentage;

			// Animar el cambio de porcentaje
			const animationDuration = 1200;
			track.animate({
				transform: `translate(${nextPercentage}%, 0%)`
			}, { duration: animationDuration, fill: "forwards" });

			for (const image of track.getElementsByClassName("image")) {
				image.animate({
					objectPosition: `${100 + nextPercentage}% center`
				}, { duration: animationDuration, fill: "forwards" });
			}
		};

		// Agregar los eventos de mouse y touch
		track.onmousedown = e => handleOnDown(e);
		track.ontouchstart = e => handleOnDown(e.touches[0]);
		track.onmouseup = e => handleOnUp(e);
		track.ontouchend = e => handleOnUp(e.touches[0]);
		track.onmousemove = e => handleOnMove(e);
		track.ontouchmove = e => handleOnMove(e.touches[0]);
		track.onmouseleave = e => handleOnLeave(e);

		// Funcion para remover los eventos de mouse y touch en caso de que el componente se desmonte (cambiar a otra pagina, etc.) y que no
		// se queden los eventos de mouse y touch activos
		return () => {
			track.onmousedown = null;
			track.ontouchstart = null;
			track.onmouseup = null;
			track.ontouchend = null;
			track.onmousemove = null;
			track.ontouchmove = null;
			track.onmouseleave = null;
		};
	}, []);

	return (
		<div className='carousel-container'>
			<div ref={trackRef} className="image-track" data-mouse-down-at="0" data-prev-percentage="0">
				{images.map((image, index) =>
					< img key={index} className="image" src={image} draggable="false" />
				)}
			</div>
		</div>
	);
};

export default ImageSlider;
