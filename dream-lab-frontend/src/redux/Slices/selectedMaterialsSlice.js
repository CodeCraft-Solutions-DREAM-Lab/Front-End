import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMaterials: [],
};

export const selectedMaterialsSlice = createSlice({
  name: "selectedMaterials",
  initialState,
  reducers: {
    addMaterial: (state, action) => {
      const { materialId, newQuantity } = action.payload;
      // Check if material already exists
      const existingMaterial = state.selectedMaterials.find(
        (item) => item.materialId === materialId
      );

      const quantity = newQuantity;

      if (existingMaterial) {
        existingMaterial.quantity = quantity;
      } else {
        state.selectedMaterials.push({ materialId, quantity });
      }
      // Log the full array of materials and their quantities
      console.log("Selected Materials:", JSON.parse(JSON.stringify(state.selectedMaterials)));


    },
    updateMaterialQuantity: (state, action) => {
      const { materialId, newQuantity } = action.payload;
      const materialIndex = state.selectedMaterials.findIndex(
        (item) => item.materialId === materialId
      );

      if (materialIndex !== -1) {
        state.selectedMaterials[materialIndex].quantity = newQuantity;
      }
      console.log(state.selectedMaterials);
    },
    removeMaterial: (state, action) => {
      const materialId = action.payload;
      state.selectedMaterials = state.selectedMaterials.filter(
        (item) => item.materialId !== materialId
      );
    },
    resetMaterials: (state) => {
      // Reset the selectedMaterials state to its initial value
      state.selectedMaterials = initialState.selectedMaterials;
      console.log("reset materials!");
    },
  },
});

// Action creators
export const { addMaterial, updateMaterialQuantity, removeMaterial, resetMaterials } =
  selectedMaterialsSlice.actions;

export default selectedMaterialsSlice.reducer;
