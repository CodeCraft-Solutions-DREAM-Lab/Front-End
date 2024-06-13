import propTypes from "prop-types";

const CheckIcon = ({ className, color }) => {
    return (

    <svg 
        width="800px" 
        height="800px" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g id="Interface / Check">
            <path 
                id="Vector" 
                d="M6 12L10.2426 16.2426L18.727 7.75732" 
                stroke={color || "#000000"}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </g>
    </svg>

    )
}

CheckIcon.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
}

export default CheckIcon