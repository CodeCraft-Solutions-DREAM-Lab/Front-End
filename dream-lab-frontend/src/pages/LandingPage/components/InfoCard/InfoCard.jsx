import "./InfoCard.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function InfoCard({ title, description, image }) {
  return (
    <div className="info-card-glass-card">
      <GlassCard>
        <div data-cy="landing-detail-card" className="info-card-container">
          <div className="info-card-title-desc-container">
            <h1 className="info-card-title">{title}</h1>
            <p className="info-card-description">{description}</p>
          </div>
          <div className="info-card-picture-container">
            <img className="info-card-picture" src={image} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default InfoCard;
