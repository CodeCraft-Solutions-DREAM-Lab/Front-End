import "./GlassCard.css";

import proptypes from "prop-types";

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

GlassCard.propTypes = {
  width: proptypes.string,
  height: proptypes.string,
  padding: proptypes.string,
  margin: proptypes.string,
  children: proptypes.node,
  classes: proptypes.string,
};

export default GlassCard;
