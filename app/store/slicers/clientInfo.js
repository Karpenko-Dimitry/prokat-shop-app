import { createSlice } from "@reduxjs/toolkit";

const clientInfoSlicer = createSlice({
    name: 'clientInfo',
    initialState: {
        info: {}
    },
    reducers: {
        updateClientInfo: (state, action) => {
            state.info = {...state.info, ...action.payload};
        }
    }
});

export const { updateClientInfo } = clientInfoSlicer.actions;
export default clientInfoSlicer.reducer;