import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import "./DetalleExperiencia.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { Textarea } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";

function DetalleExperiencia({ onInfoChange }) {
    const [description, setDescription] = useState("");
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [isFechaFinEnabled, setIsFechaFinEnabled] = useState(false);
    const locale = "es-MX";

    const [caracteresRestantesDes, setCaracteresRestantesDes] = useState(300);

    function handleFechaInicioChange(date) {
        setFechaInicio(date);
        if (date) {
            onInfoChange({ fechaInicio: date.toISOString() });
        }
    }

    function handleFechaFinChange(date) {
        setFechaFin(date);
        if (date) {
            onInfoChange({ fechaFin: date.toISOString() });
        }
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        setCaracteresRestantesDes(300 - event.target.value.length);
        onInfoChange({ descripcion: event.target.value });
    }

    function handleCheckboxChange(event) {
        setIsFechaFinEnabled(event.target.checked);
        if (!event.target.checked) {
            setFechaFin(null);
        }
    }


    return (
        <div className="contenedor-detalles-experiencia">
            <GlassCard classes="descripcion-container-crear-experiencia">
                <p className="text-white">Descripción</p>
                <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <Textarea
                        aria-label="Descripción de experiencia"
                        placeholder="Añade una descripción"
                        onChange={handleDescriptionChange}
                        maxLength={300}
                        value={description}
                        className="input-desc-exp"
                        data-cy="input-dexc-exp"
                        minRows={5}
                        maxRows={5}
                    />
                </div>
                <div className="footer-input-crear-experiencia">
                    ({caracteresRestantesDes} caracteres restantes)
                </div>
            </GlassCard>
            <div className="fechas-experiencia-container">
                <GlassCard classes="glasscard-fecha-experiencia">
                    <p className="text-white">Fecha inicio</p>
                    <I18nProvider locale={locale}>
                        <DatePicker
                            value={fechaInicio}
                            onChange={handleFechaInicioChange}
                            aria-label="Selector de fecha"
                        />
                    </I18nProvider>
                </GlassCard>
                <GlassCard classes="glasscard-fecha-experiencia">
                    <div className="fecha-fin-wrapper">
                        <p className="text-white">Fecha fin</p>
                        <input
                            type="checkbox"
                            checked={isFechaFinEnabled}
                            onChange={handleCheckboxChange}
                            className="checkbox-fecha-fin"
                        />
                    </div>
                    <I18nProvider locale={locale}>
                        <DatePicker
                            value={fechaFin}
                            onChange={handleFechaFinChange}
                            aria-label="Selector de fecha"
                            isDisabled={!isFechaFinEnabled}
                        />
                    </I18nProvider>
                </GlassCard>
            </div>
        </div>
    );
}

DetalleExperiencia.propTypes = {
    onInfoChange: PropTypes.func.isRequired,
};

export default DetalleExperiencia;
