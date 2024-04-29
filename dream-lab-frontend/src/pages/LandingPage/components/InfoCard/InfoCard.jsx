import "./InfoCard.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function InfoCard( { title, description, image } ) {
    return (
        <GlassCard>
            <div className="info-card-container">
                <h1 className="title">{title}</h1>
                <p className="description">{description}</p>
                <img className="picture" src={image}/>
            </div>
        </GlassCard>
    )
}

export default InfoCard;