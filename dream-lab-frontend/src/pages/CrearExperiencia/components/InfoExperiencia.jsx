import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import { useState } from "react";


import "./InfoExperiencia.css";

function InfoExperiencia() {
    const [caracteresRestantesNom, setCaracteresRestantesNom] = useState(30);
	const [nombre, setNombre] = useState("");

    function handleNombreChange() {
		setNombre(event.target.value);
		setCaracteresRestantesNom(30 - event.target.value.length);
	}

    return (
        <GlassCard classes="dropdowns-container-crear-experiencia">
								<p className="text-white">Nombre de la experiencia</p>
								<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
									<Input
										type="text"
										aria-label="Nombre de experiencia"
										placeholder="Nombre de experiencia"
										onChange={handleNombreChange}
										maxLength={30}
										value={nombre}
										data-cy="input-nombre-exp"
									/>
								</div>
								<div className="footer-input-crear-experiencia">
									({caracteresRestantesNom} caracteres restantes)
								</div>
								<p className="text-white">Tipo de experiencia</p>
								<Select
									className="mb-3 "
									aria-label="Tipo de experiencia"
									placeholder="Selecciona un tipo"
									data-cy="selector-tipo-exp"
								>
									<SelectItem>Autodirigida</SelectItem>
									<SelectItem>Unidad de Formación</SelectItem>
								</Select>
                                {/* Subir archivo (autodirigida) o elegir UF (unidad de formación)*/}
                                <p className="text-white">Unidad de Formación</p>
								<Select
									className="mb-3 "
									aria-label="Unidad de Formación"
									placeholder="Selecciona una UF"
									data-cy="selector-uf-exp"
								>
									<SelectItem>UF1</SelectItem>
									<SelectItem>UF2</SelectItem>
								</Select>
							</GlassCard>
    );
}

export default InfoExperiencia;