// Componentes
import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";

// Estilos
import "./SelectorLogroItem.css";

// Proptypes
import PropTypes from "prop-types";

function SelectorLogroItem({
    logro,
    selected,
    setLogroSeleccionado,
    selectedColor,
}) {
    const className = selected
        ? "sli-logro-item-icon sli-selected"
        : "sli-logro-item-icon";
    return (
        <div
            className={className}
            onClick={() => setLogroSeleccionado(logro)}
            style={{ borderColor: selectedColor }}
        >
            <NuevoIconoLogro icono={logro.iconoURL} />
        </div>
    );
}

SelectorLogroItem.propTypes = {
    logro: PropTypes.object,
    selected: PropTypes.bool,
    setLogroSeleccionado: PropTypes.func,
    selectedColor: PropTypes.string,
};

export default SelectorLogroItem;
