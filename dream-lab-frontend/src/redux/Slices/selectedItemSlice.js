import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: {
        type: undefined,
        id: undefined,
    },
};

export const selectedItemSlice = createSlice({
    name: "selectedItem",
    initialState,
    reducers: {
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        deleteSelectedItem: (state) => {
            state.selectedItem = initialState.selectedItem;
        },
    },
});

export const { setSelectedItem, deleteSelectedItem } =
    selectedItemSlice.actions;

export const selectSelectedItem = (state) => state.selectedItem.selectedItem;

export default selectedItemSlice.reducer;
