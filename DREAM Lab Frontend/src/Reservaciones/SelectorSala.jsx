import { Card, Spacer } from "@nextui-org/react";
import { Grid } from "@mui/material";

function SelectorSala(props) {
    return (
        <div>

            <Grid container justify="center">
                <Grid item xs={12} md={7} className="height">
                    <Card>
                        <h1>Primera parte</h1>
                    </Card>
                    <Spacer y={2} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card>
                        <h1>Selector de info </h1>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
}

export default SelectorSala;