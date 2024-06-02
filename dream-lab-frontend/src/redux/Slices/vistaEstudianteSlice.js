import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: false,
};

export const vistaEstudianteSlice = createSlice({
    name: "vistaEstudiante",
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.isActive = action.payload;
        },
    },
});

export const { setActive } = vistaEstudianteSlice.actions;

export const selectActive = (state) => state.vistaEstudiante.isActive;

export default vistaEstudianteSlice.reducer;
