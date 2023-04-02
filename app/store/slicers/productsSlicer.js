import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WCProductService from "../../services/woocommerce/WCProductService";
import { stripHtml } from "../../services/HelperService";

const INIT_FILTER = { per_page: 100, page: 1, status: 'publish', stock_status: 'instock' };
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
        loading: true,
        error: false
    },
    reducers: {
        getById(state, action) {
            let id = action.payload.id;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.error = false;
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            let products = action.payload.map((product) => {
                product.description = stripHtml(product.description || '')
                product.short_description = stripHtml(product.short_description || '')
                product.permalink = product.permalink.replace('xn--80atldfp.xn--j1amh', 'прокат.укр')
                return product;
            }).filter(product => product.catalog_visibility == 'visible');

            state.products = [...state.products, ...products];

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
