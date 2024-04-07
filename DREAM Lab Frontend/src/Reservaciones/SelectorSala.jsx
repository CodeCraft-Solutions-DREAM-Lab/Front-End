import { Card, Spacer } from "@nextui-org/react";
import { Grid } from "@mui/material";
import FechaFormulario from "./components/FechaFormulario";

function SelectorSala(props) {
    return (
        <div>

            <Grid container justify="center">
                <Grid item xs={12} md={7}>
                    <Card>
                        <h1>Primera parte</h1>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card>
                        <FechaFormulario />
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}

export default SelectorSala;