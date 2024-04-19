import { configureStore } from "@reduxjs/toolkit";

// Funciones reducer de nuestros slices para que la store sepa cómo actualizar
// el estado
import userReducer from "./Slices/userSlice.js";
import selectedItemSlice from "./Slices/selectedItemSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        selectedItem: selectedItemSlice,
    },
});
