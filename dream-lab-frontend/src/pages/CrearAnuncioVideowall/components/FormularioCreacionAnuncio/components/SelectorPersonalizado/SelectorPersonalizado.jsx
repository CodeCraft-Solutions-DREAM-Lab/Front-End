import React from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import TextField from "@mui/material/TextField";

function SelectorPersonalizado() {
    return (
        <Autocomplete
            className="mb-3"
            aria-label="Hora de inicio"
            renderInput={(params) => (
                <TextField
                    {...params}
                    className="input-formulario-anuncio"
                    placeholder="Fecha del evento"
                />
            )}
            sx={{
                "& .MuiAutocomplete-input": {
                    // Target specific MUI class for background
                    height: "2vh",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    
                },
            }}
        />
    )    
}

export default SelectorPersonalizado;
