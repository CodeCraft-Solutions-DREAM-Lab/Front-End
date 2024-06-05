import propTypes from "prop-types"
import { useEffect, useState } from "react";

const CustomItemRenderer = ({ item, itemContext, getItemProps }) => {

    const [colorName, setColorName] = useState("purple");

    useEffect(() => {
        if (!item.estatusMateriales) {
            setColorName("purple");
        } else if (item.estatusMateriales == 1) {
            setColorName("#17c964");
        } else if (item.estatusMateriales == 2) {
            setColorName("#60a1dc");
        } else {
            setColorName("#acacac");
        }
    }, [item.estatusMateriales]);

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
            key={itemContext.id}
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
    itemContext: propTypes.object.isRequired,
    getItemProps: propTypes.func.isRequired
}

export default CustomItemRenderer;