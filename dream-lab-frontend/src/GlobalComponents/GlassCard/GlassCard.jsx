import "./GlassCard.css";

import proptypes from "prop-types";

function GlassCard({
    width,
    height,
    padding,
    margin,
    borderRadius,
    children,
    classes,
}) {
    return (
        <div
            className={`glass-card ${classes}`}
            style={{
                width: width,
                height: height,
                padding: padding,
                margin: margin,
                "--border-radius": borderRadius,
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
    borderRadius: proptypes.string,
    children: proptypes.node,
    classes: proptypes.string,
};

GlassCard.defaultProps = {
    borderRadius: "4vh",
};

export default GlassCard;
