import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experiencia: "",
};

export const experienciaSlice = createSlice({
  name: "experiencia",
  initialState,
  reducers: {
    setExperiencia: (state, action) => {
      state.experiencia = action.payload;
    },
  },
});

export const { setExperiencia } = experienciaSlice.actions;

export const selectExperiencia = (state) => state.experiencia.experiencia;

export default experienciaSlice.reducer;
