import "./GlassCard.css";

function GlassCard({ width, height, padding, margin, children, classes }) {
  return (
    <div
      className={`glass-card ${classes}`}
      style={{
        width: width,
        height: height,
        padding: padding,
        margin: margin,
      }}
    >
      {children}
    </div>
  );
}

export default GlassCard;
