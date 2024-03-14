import { Component } from "react";
import Flicking from "@egjs/react-flicking";
import { Perspective } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "./RecommendationsCarousel.css"

function RecommendationsCarousel(props) {
	// const plugins = [new Perspective({ rotate: 0.5 })];
	const plugins = [new Perspective({ rotate: -1, scale: 2, perspective: 600 })];
	const { images } = props

	return (
		<div style={{ width: props.width }}>
			<Flicking
				circular={true}
				plugins={plugins}
				panelsPerView={3}
				align="center"
				preventClickOnDrag={true}
				preventDefaultOnDrag={true}>
				{images.map((image, index) => (
					<div key={index}
						className="card-panel"
						style={{
							width: props.imageWidth,
							height: props.imageHeight,
							overflow: 'hidden',
						}}>
						<img
							className="imageCarousel"
							src={image.url}
							onContextMenu={(e) => e.preventDefault()}
						/>
					</div>
				))}
			</Flicking>
		</div>
	);
};

export default RecommendationsCarousel;