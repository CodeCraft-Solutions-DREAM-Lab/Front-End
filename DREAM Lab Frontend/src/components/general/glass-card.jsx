import './glass-card.css';

function GlassCard(props) {
	return (
		<div className="glass-card" style={{
			width: props.width,
			height: props.height,
			padding: props.padding,
			margin: props.margin,
		}}>
			{props.children}
		</div>
	);
}

export default GlassCard;