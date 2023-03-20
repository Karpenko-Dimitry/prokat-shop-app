import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WCProductService from "../../services/woocommerce/WCProductService";

const INIT_FILTER = { per_page: 100, page: 1, status: 'publish' };
export const fetchProducts = createAsyncThunk('products/fetchProducts', async function(filter = {}, {rejectWithValue}) {
    try {
        let response = await WCProductService.list({...INIT_FILTER, ...filter});
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
    
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        next_page: 1,
        loaded: false,
        error: false
    },
    reducers: {
        getById(state, action) {
            let id = action.payload.id;

        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loaded = false;
            state.error = false;
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.loaded = true;
            state.error = false;
            state.products = [...state.products, ...action.payload];

            if (action.payload?.length) {
                state.next_page = state.next_page + 1;
            }
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.loaded = false;
            state.error = true;
        })
    }
});

export const { getById } = productsSlice.actions;
export default productsSlice.reducer;
