import propTypes from "prop-types"

const CustomItemRenderer = ({ item, itemContext, getItemProps }) => {

    let colorName;

    if (!item.estatusMateriales) {
        colorName = "purple";
    } else if (item.estatusMateriales == 1) {
        colorName = "#17c964";
    } else if (item.estatusMateriales == 2) {
        colorName = "#60a1dc";
    } else {
        colorName = "#acacac";
    }

    const { style, ...otherProps } = getItemProps();
    const { width, top, position, lineHeight, left, cursor, ...otherStyles } = style;

    return (
        <div
            {...otherProps}
            style={{
                width: width,
                top: top,
                position: position,
                lineHeight: lineHeight,
                left: left,
                cursor: cursor,

                borderRadius: "1vh",
                height: "33px",
                background: colorName,
                zIndex: 30
            }}
        >
            <p style={{
                display: "flex",
                justifySelf: "start",
                paddingLeft: "0.8vh",

                color: "white",
                fontSize: "auto",
                textAlign: "center",

                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",

                width: "100%",
            }}>
                {itemContext.title}
            </p>
        </div>
    );
}

CustomItemRenderer.propTypes = {
    item: propTypes.object.isRequired,
    index: propTypes.number.isRequired,
    itemContext: propTypes.object.isRequired,
    getResizeProps: propTypes.func.isRequired,
    getItemProps: propTypes.func.isRequired
}

export default CustomItemRenderer