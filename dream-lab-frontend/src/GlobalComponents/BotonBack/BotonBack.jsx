import BackButton from "/src/assets/BotonBack/backButton.png";
import { useNavigate } from "react-router-dom";

import propTypes from "prop-types";

function BotonBack({ ruta }) {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(ruta);
    };

    return <img src={BackButton} alt="Regresar" onClick={handleClick} />;
}

BotonBack.propTypes = {
    ruta: propTypes.string,
};

export default BotonBack;
