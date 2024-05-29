import React from "react";
import { useState } from "react";
import { TimeInput } from "@nextui-org/react";

export default function HoraSelector(props) {
    const [bloqueado, setBloquado] = useState(props.bloqueado);

    return bloqueado === false ? (
        <TimeInput label={null} />
    ) : (
        <TimeInput label={null} isDisabled />
    );
}
