import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectorPersonalizado(props) {
    const staticOptions = props.elementos ? props.elementos.map(sala => ({
        label: sala.nombre,
        value: sala.idSala.toString()
    })) : [];

    return (
        <Select
            items={staticOptions}
            placeholder={props.placeholder}
            className="max-w-xs"
            aria-label={props.ariaLabel} // Agrega el atributo aria-label
            aria-labelledby={props.ariaLabel} // Agrega el atributo aria-labelledby
        >
            {(sala) => <SelectItem key={sala.value}>{sala.label}</SelectItem>}
        </Select>
    );
}
