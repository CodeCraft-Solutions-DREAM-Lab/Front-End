import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMaterials: [],
};

export const selectedMaterialsSlice = createSlice({
  name: "selectedMaterials",
  initialState,
  reducers: {
    addMaterial: (state, action) => {
      const { materialId, quantity } = action.payload;
      // Check if material already exists
      const existingMaterial = state.selectedMaterials.find(
        (item) => item.materialId === materialId
      );

      if (existingMaterial) {
        existingMaterial.quantity += quantity;
      } else {
        state.selectedMaterials.push({ materialId, quantity });
      }
    },
    updateMaterialQuantity: (state, action) => {
      const { materialId, newQuantity } = action.payload;
      const materialIndex = state.selectedMaterials.findIndex(
        (item) => item.materialId === materialId
      );

      if (materialIndex !== -1) {
        state.selectedMaterials[materialIndex].quantity = newQuantity;
      }
    },
    removeMaterial: (state, action) => {
      const materialId = action.payload;
      state.selectedMaterials = state.selectedMaterials.filter(
        (item) => item.materialId !== materialId
      );
    },
  },
});

// Action creators
export const { addMaterial, updateMaterialQuantity, removeMaterial } =
  selectedMaterialsSlice.actions;

export default selectedMaterialsSlice.reducer;
