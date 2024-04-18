import { configureStore } from "@reduxjs/toolkit";

// Funciones reducer de nuestros slices para que la store sepa cómo actualizar
// el estado
import userReducer from "./Slices/userSlice.js";
import experienciaReducer from "./Slices/experienciaSlice.js";
import selectedItemSlice from "./Slices/selectedItemSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        experiencia: experienciaReducer,
        selectedItem: selectedItemSlice,
    },
});
