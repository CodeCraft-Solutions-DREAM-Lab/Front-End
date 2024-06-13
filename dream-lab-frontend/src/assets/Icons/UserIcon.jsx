import propTypes from "prop-types";

const UserIcon = ({className, color}) => {
  return (
    <svg 
      fill={color || "#000000"}
      className={className}
      version="1.1" 
      id="Layer_1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 285.5 285.5" 
      xmlSpace="preserve"
    >
      <g id="XMLID_470_">
        <path id="XMLID_472_" d="M79.999,62.75c0,34.601,28.149,62.75,62.751,62.75s62.751-28.149,62.751-62.75S177.352,0,142.75,0
          S79.999,28.149,79.999,62.75z"/>
        <path id="XMLID_473_" d="M42.75,285.5h200c8.284,0,15-6.716,15-15c0-63.411-51.589-115-115-115s-115,51.589-115,115
          C27.75,278.784,34.466,285.5,42.75,285.5z"/>
      </g>  
    </svg>
  )
}

UserIcon.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
}

export default UserIcon