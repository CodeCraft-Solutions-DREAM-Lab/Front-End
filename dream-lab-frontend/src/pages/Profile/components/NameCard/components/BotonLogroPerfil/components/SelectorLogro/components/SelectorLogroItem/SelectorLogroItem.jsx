// Componentes
import NuevoIconoLogro from "src/GlobalComponents/NuevoIconoLogro/NuevoIconoLogro";

// Estilos
import "./SelectorLogroItem.css";

// Proptypes
import PropTypes from "prop-types";

function SelectorLogroItem({ logro, selected, onClick }) {
    return (
        <div className="sl-logro-item-icon">
            <NuevoIconoLogro icono={logro.iconoURL} />
        </div>
    );
}

SelectorLogroItem.propTypes = {
    logro: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
};

export default SelectorLogroItem;
