import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./NCarruselRecomendaciones.css";
import { useNavigate } from 'react-router-dom';

function NCarruselRecomendaciones(props) {
	const [activeSlide, setActiveSlide] = useState(props.activeSlide);

	const next = () => {
		setActiveSlide((activeSlide + 1) % props.data.length);
	};

	const prev = () => {
		setActiveSlide(activeSlide === 0 ? props.data.length - 1 : activeSlide - 1);
	};

	const getStyles = (index) => {
		if (activeSlide === index)
			return {
				opacity: 1,
				transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
				zIndex: 10,
			};
		else if (activeSlide - 1 === index)
			return {
				opacity: 1,
				transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
				zIndex: 9,
			};
		else if (activeSlide + 1 === index)
			return {
				opacity: 1,
				transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
				zIndex: 9,
			};
		else if (activeSlide - 2 === index)
			return {
				opacity: 1,
				transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
				zIndex: 8,
			};
		else if (activeSlide + 2 === index)
			return {
				opacity: 1,
				transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
				zIndex: 8,
			};
		else if (index < activeSlide - 2)
			return {
				opacity: 0,
				transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
				zIndex: 7,
			};
		else if (index > activeSlide + 2)
			return {
				opacity: 0,
				transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
				zIndex: 7,
			};
	};

	return (
		<>
			{/* carousel */}
			<div className="slideC">
				{props.data.map((item, i) => (
					<React.Fragment key={i}>
						<div
							className="slide"
							style={{
								background: item.bgColor,
								// backgroundImage: `url(${item.img})`,
								boxShadow: `0 5px 20px ${item.bgColor}30`,
								...getStyles(i),
							}}
						>
							<SliderContent {...item} index={i} onClick={setActiveSlide} activeSlide={activeSlide} />
						</div>
						<div
							className="reflection"
							style={{
								background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
								...getStyles(i),
							}}
						/>
					</React.Fragment>
				))}
			</div>
			{/* carousel */}

			<div className="btns">
				<FontAwesomeIcon
					className="btn"
					onClick={prev}
					icon={faChevronLeft}
					color="#fff"
					size="2x"
				/>
				<FontAwesomeIcon
					className="btn"
					onClick={next}
					icon={faChevronRight}
					color="#fff"
					size="2x"
				/>
			</div>
		</>
	);
};

const SliderContent = (props) => {
	let navigate = useNavigate();

	function handleClick() {
		if (props.index === props.activeSlide) {
			navigate(`/reservacion/${props.title}`);
		} else {
			props.onClick(props.index);
		}
	}

	return (
		<div className="sliderContent" onClick={handleClick}>
			{props.icon}
			<h2>{props.title}</h2>
			<p>{props.desc}</p>
		</div>
	);
};

export default NCarruselRecomendaciones;
