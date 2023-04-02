import { createSlice } from "@reduxjs/toolkit";

const favoritsSlicer = createSlice({
    name: 'favorits',
    initialState: {
        favorits: []
    },
    reducers: {
        toggleFavorit: (state, action) => {
            let product = action.payload.product;
            let index = state.favorits.findIndex((item => item.id == product.id));

            if (index !== -1) {
                state.favorits.splice(index, 1); 
            } else {
                state.favorits.push(product)
            }
        },
        removeFavorit: (state, action) => {
            let product = action.payload.product;
            let index = state.favorits.findIndex((item => item.id == product.id));

            if (index !== -1) {
                state.favorits.splice(index, 1); 
            }
        },
    }
});

export const { toggleFavorit, removeFavorit } = favoritsSlicer.actions;
export default favoritsSlicer.reducer;