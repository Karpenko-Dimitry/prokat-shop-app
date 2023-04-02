import { createSlice } from "@reduxjs/toolkit";

const cartSlicer = createSlice({
    name: 'cart',
    initialState: {
        products: []
    },
    reducers: {
        addToCart: (state, action) => {
            let product = action.payload.product;
            let index = state.products.findIndex((item) =>  item.product.id == product.id);

            if (index !== -1) {
                state.products[index].count += 1;
            } else {
                state.products.push({
                    product: product,
                    count: 1
                })
            }

        },
        removeFromCart: (state, action) => {
            let product = action.payload.product;
            let index = state.products.findIndex((item) =>  item.product.id == product.id);

            if (index !== -1) {
                if (state.products[index].count <= 1) {
                    state.products.splice(index, 1)
                } else {
                    state.products[index].count -= 1;
                }
            }
        },
        clearCart: (state, action) => {
            state.products = [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlicer.actions
export default cartSlicer.reducer