import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    isAuth: false,
    rol: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // State es el estado actual del slice, siendo realmente inmutable, pero
        // usando redux-toolkit, te permite escribir código que "parece" mutar el
        // estado.
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setRol: (state, action) => {
            state.rol = action.payload;
        },
        // Acción para cerrar sesión
        logoutUser: (state) => {
            state.token = "";
            state.isAuth = false;
            state.rol = "";
        },
    },
});

// Los creadores de acciones se generan para cada función reductora
export const { setToken, setAuth, setRol, logoutUser } = userSlice.actions;

export const selectAuth = (state) => state.user.isAuth;
export const selectRol = (state) => state.user.rol;

export default userSlice.reducer;
