import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
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
  },
});

// Los creadores de acciones se generan para cada función reductora
export const { setToken } = userSlice.actions;

export default userSlice.reducer;
