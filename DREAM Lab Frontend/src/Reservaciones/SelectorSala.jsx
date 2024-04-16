import { Card, Button } from "@nextui-org/react";
import { Grid } from "@mui/material";
import FechaFormulario from "./components/FechaFormulario";
import PrimerRecordatorio from "./components/PrimerRecordatorio";
import TextoFecha from "./components/TextoFecha";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getFromSessionStorage,
} from "../Global/Storage";

function SelectorSala(props) {
    let navigate = useNavigate();

    const [isFirstReminderOpen, setIsFirstReminderOpen] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (!getFromSessionStorage("fecha") ||
            !getFromSessionStorage("horaInicio") || 
            !getFromSessionStorage("duration")) {
            setIsNextButtonDisabled(true);
        } else {
            setIsNextButtonDisabled(false);
        }
    }, [update]);

    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={12} md={7}>
                    <Card>
                        <h1>Primera parte</h1>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <PrimerRecordatorio 
                        isOpen={isFirstReminderOpen}
                        size="lg"
                        onClose={() => {
                            setIsFirstReminderOpen(false)
                        }}
                        onOk={() => {
                            setIsFirstReminderOpen(false)
                            navigate("/reservacion/resumen")
                        }}
                    />
                    <FechaFormulario 
                        update={update}
                        setUpdate={setUpdate}
                    />
                    <TextoFecha update={update}/>
                    <div className="flex w-fit p-3">
                    <Button 
                        className="mt-4 px-2 justify-self-center"
                        onClick={() => {
                            setIsFirstReminderOpen(true)
                        }}
                        disabled={isNextButtonDisabled}
                    >
                        Aceptar
                    </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
}

export default SelectorSala;