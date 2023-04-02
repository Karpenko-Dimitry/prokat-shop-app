import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WCCategoryService from "../../services/woocommerce/WCCategoryService";

const INIT_FILTER = { per_page: 100, page: 1, hide_empty: true, order: 'desc', orderby: 'count' };

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (filter = {}) => {
    const response = await WCCategoryService.list({...INIT_FILTER, ...filter});
    return response.data;
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        next_page: 1,
        loading: true,
        error: false,
    },
    reducers: {
    
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.error = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                let categories = action.payload.filter(category => {
                    return category.name !== "Misc"
                        && !action.payload.filter(i => i.parent).map(i => i.parent).includes(category.id)
                });

                state.categories = [...state.categories, ...categories];

                if (action.payload?.length) {
                    state.next_page = state.next_page + 1;
                }
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const { setCategories, addCategories, resetCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;